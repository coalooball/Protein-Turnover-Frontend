<template>
    <q-tabs v-model="preparation_tab" dense align="justify" class="bg-blue-grey-10 text-white shadow-2" narrow-indicator>
        <q-tab name="Load_file_data" label="Load File Data" no-caps />
        <q-tab name="Preview" label="Preview" no-caps />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="preparation_tab" animated>
        <q-tab-panel name="Load_file_data">
            <q-card flat>
                <div v-if="!boolCheckClickhouseConnection">
                    <q-card-section>
                        <div class="row">
                            <div class="col-2">
                                <q-spinner-audio color="primary" size="2em" />
                                <q-tooltip :offset="[0, 8]">Clickhouse Connecting</q-tooltip>
                            </div>
                        </div>
                    </q-card-section>
                </div>
                <div v-else>
                    <q-card-section>
                        <div class="row">
                            <div class="col-6">
                                <q-input v-model="fileDir" label="File Directory" placeholder="Please enter the dir"
                                    :dense="true" @focus="fnShowHistory">
                                    <q-menu v-model="showHistoryFileDir" fit :offset="[0, 20]">
                                        <q-list>
                                            <q-item v-for="(item, index) in historyFileDirs" :key="index" clickable
                                                v-close-popup @click="selectHistoryItem(item)">
                                                <q-item-section>
                                                    {{ item }}
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </q-input>
                            </div>
                            <div class="col-6">
                                <q-btn outline color="dark" label="Select" no-caps @click="selectDir" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div v-if="boolGetDataFiles">
                                    <q-expansion-item v-model="boolGetDataFilesExpansion" dense dense-toggle
                                        expand-separator label="Select File">
                                        <q-option-group :options="dataFilesOptions" type="checkbox"
                                            v-model="dataFilesGroup" />
                                    </q-expansion-item>
                                </div>
                            </div>
                            <div class="col-6">
                                <q-list dense bordered separator>
                                    <q-item v-for="x in dataFilesGroup" :key="x" v-ripple>
                                        <q-item-section>{{ x }}</q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-if="dataFilesGroup.length > 0">
                                    <q-btn :loading="boolLoadingDataFiles" outline color="dark" label="Load" no-caps
                                        @click="loadDataFilesInClickhouse">
                                        <q-tooltip anchor="bottom middle" self="top middle">
                                            Import file data into ClickHouse.
                                        </q-tooltip>
                                    </q-btn>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </div>
            </q-card>
        </q-tab-panel>

        <q-tab-panel name="Preview">
            <div class="row">
                <div class="col-5">
                    <q-card>
                        <div v-if="!boolCheckClickhouseConnection">
                            <q-card-section>
                                <div class="row">
                                    <div class="col-2">
                                        <q-spinner-audio color="primary" size="2em" />
                                        <q-tooltip :offset="[0, 8]">Clickhouse Connecting</q-tooltip>
                                    </div>
                                </div>
                            </q-card-section>
                        </div>
                        <div v-else>
                            <q-card-section>
                                <div class="text-h6">pepxml Data</div>
                                <q-separator />
                                <q-list dense bordered separator>
                                    <q-item v-for="x in pepxmlTableNames" :key="x" v-ripple clickable
                                        @click="fnClickDataItem(x, 'pepxml')">
                                        <q-item-section>{{ x }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </div>
                    </q-card>
                </div>
                <q-space />
                <div class="col-6">
                    <q-card>
                        <div v-if="!boolCheckClickhouseConnection">
                            <q-card-section>
                                <div class="row">
                                    <div class="col-2">
                                        <q-spinner-audio color="primary" size="2em" />
                                        <q-tooltip :offset="[0, 8]">Clickhouse Connecting</q-tooltip>
                                    </div>
                                </div>
                            </q-card-section>
                        </div>
                        <div v-else>
                            <q-card-section>
                                <div class="text-h6">mzML Data</div>
                                <q-separator />
                                <q-list dense bordered separator>
                                    <q-item v-for="x in mzMLTableNames" :key="x" v-ripple clickable
                                        @click="fnClickDataItem(x, 'mzml')">
                                        <q-item-section>{{ x }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </div>
                    </q-card>
                </div>
            </div>
        </q-tab-panel>
    </q-tab-panels>
    <pepxml-preview ref="PepxmlPreviewProperty" :pepxmlName="pepxmlName" />
    <mzml-preview ref="MzmlPreviewProperty" :mzmlName="mzmlName" />
</template>

<script setup>
import { useQuasar } from "quasar";
import { EventBus } from "../event-bus.js";
import { ref, onMounted, onUnmounted, watch } from "vue";
import PepxmlPreview from "./preview/pepxml.vue";
import MzmlPreview from "./preview/mzml.vue";

const $q = useQuasar();
let boolCheckClickhouseConnection = ref(false);
let fileDir = ref("");
let dataFiles = ref([]);
let boolGetDataFiles = ref(false);
let boolGetDataFilesExpansion = ref(true);
let dataFilesOptions = ref(
    dataFiles.value.map((x) => ({ label: x, value: x }))
);
let dataFilesGroup = ref([]);
let boolLoadingDataFiles = ref(false);
let osPathSep = ref("/");
let preparation_tab = ref("Load_file_data");
let pepxmlTableNames = ref([]);
let mzMLTableNames = ref([]);
const PepxmlPreviewProperty = ref(null);
const MzmlPreviewProperty = ref(null);
let mzmlName = ref("");
let pepxmlName = ref("");
let showHistoryFileDir = ref(false);
let historyFileDirs = ref([]);

// let boolOppositeGetDataFiles = ref(!boolGetDataFiles.value);

function loadDataFilesInClickhouse() {
    console.log("Load...");
    try {
        const filePaths = dataFilesGroup.value.map(
            (x) => fileDir.value + osPathSep.value + x
        );
        const queryString = filePaths
            .map((filePath) => `filePath=${encodeURIComponent(filePath)}`)
            .join("&");
        const eventSource = new EventSource(
            `/api/load_files_sse?${queryString}`
        );
        boolLoadingDataFiles.value = true;

        eventSource.onmessage = (event) => {
            // console.log(event.data)
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.status === "FIN") {
                boolLoadingDataFiles.value = false;
                eventSource.close();
            } else if (data.status === "process") {
                showNotify(data.message, "info");
            } else if (data.status === "error") {
                showNotify(data.message, "negative");
            } else if (data.status === "success") {
                showNotify(data.message, "positive");
            }
        };

        eventSource.onerror = (error) => {
            console.error("EventSource failed:", error);
            boolLoadingDataFiles.value = false;
            eventSource.close();
        };

        eventSource.onopen = (event) => {
            console.log("Connection was opened");
        };

        eventSource.onclose = () => {
            console.log("Connection was closed");
            boolLoadingDataFiles.value = false;
            eventSource.close();
        };
    } catch (error) {
        console.error("Loading failed", error);
    }
}

function selectDir() {
    console.log("Clicked select");
    if (fileDir.value === "") {
        showNotify(
            "Please enter the directory of the data file in `File directory`.",
            "negative"
        );
        return;
    }
    let data = {
        dir: fileDir.value,
    };
    boolGetDataFiles.value = false;
    dataFilesGroup.value = [];
    dataFilesOptions.value = [];
    dataFiles.value = [];
    fetch("/api/find_all_mzML_pepxml_files_in_dir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.status) {
                showNotify("success", "positive");
                dataFiles.value = data.files;
                dataFilesOptions.value = dataFiles.value.map((x) => ({
                    label: x,
                    value: x,
                }));
                boolGetDataFiles.value = true;
                osPathSep.value = data.sep;
            } else {
                showNotify(data.msg, "negative");
            }
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

function showNotify(msg, color) {
    $q.notify({
        message: msg,
        color: color,
        position: "top",
    });
}

function handleCCEvent(data) {
    boolCheckClickhouseConnection.value = data;
    console.log(
        `Received data from EventBus: ${boolCheckClickhouseConnection.value}`
    );
}

onMounted(() => {
    EventBus.$on("clickhouse-connected", handleCCEvent);
    fnBoolCheckClickhouseConnection();
});

onUnmounted(() => {
    EventBus.$off("clickhouse-connected", handleCCEvent);
});

function fnBoolCheckClickhouseConnection() {
    fetch("/api/bool_check_clickhouse_connection")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            boolCheckClickhouseConnection.value = data;
            console.log(
                `get_clickhouse_connection_info: ${boolCheckClickhouseConnection.value}`
            );
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

function fnGetAllPepxmlTableNames() {
    fetch("/api/get_all_pepxml_table_names")
        .then((response) => response.json())
        .then((data) => {
            pepxmlTableNames.value = data;
        })
        .catch((error) => console.error("Error: ", error));
}

function fnGetAllmzMLTableNames() {
    fetch("/api/get_all_mzml_table_names")
        .then((response) => response.json())
        .then((data) => {
            mzMLTableNames.value = data;
        })
        .catch((error) => console.error("Error: ", error));
}

watch(preparation_tab, (newVal) => {
    if (newVal === "Preview") {
        fnGetAllPepxmlTableNames();
        fnGetAllmzMLTableNames();
    }
});

function fnClickDataItem(name, type) {
    console.log(name, type);
    if (type === "pepxml") {
        pepxmlName.value = name;
        PepxmlPreviewProperty.value.boolPepxmlModel = true;
    } else if (type === "mzml") {
        mzmlName.value = name;
        MzmlPreviewProperty.value.boolMzmlModel = true;
    }
}

function selectHistoryItem(item) {
    fileDir.value = item;
    showHistoryFileDir.value = false;
}

function getHistoryDirs() {
    fetch("/api/get_history_dirs")
        .then((response) => response.json())
        .then((data) => {
            historyFileDirs.value = data;
        })
        .catch((error) => console.error("Error: ", error));
}

function fnShowHistory() {
    if (fileDir.value === "") {
        getHistoryDirs();
        if (historyFileDirs.value.length !== 0) {
            showHistoryFileDir.value = true;
        }
    }
}

</script>
