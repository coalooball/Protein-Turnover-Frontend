<template>
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
                <div class="row">
                    <div class="col-6">
                        <q-input v-model="fileDir" label="File Directory" placeholder="Please enter the dir"
                            :dense="true" />
                    </div>
                    <div class="col-6">
                        <q-btn outline color="dark" label="Select" no-caps @click="selectDir" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div v-if="boolGetDataFiles">
                            <q-expansion-item v-model="boolGetDataFilesExpansion" dense dense-toggle expand-separator
                                label="Select File">
                                <q-option-group :options="dataFilesOptions" type="checkbox" v-model="dataFilesGroup" />
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
                            <q-btn outline color="dark" label="Load" no-caps @click="loadDataFilesInClickhouse">
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
</template>

<script setup>
import { useQuasar } from "quasar";
import { EventBus } from '../event-bus.js';
import { ref, onMounted, onUnmounted } from "vue";

const $q = useQuasar();
let boolCheckClickhouseConnection = ref(false)
let fileDir = ref('');
let dataFiles = ref([]);
let boolGetDataFiles = ref(false)
let boolGetDataFilesExpansion = ref(true)
let dataFilesOptions = ref(dataFiles.value.map((x) => ({ label: x, value: x })));
let dataFilesGroup = ref([]);

// let boolOppositeGetDataFiles = ref(!boolGetDataFiles.value);

function loadDataFilesInClickhouse() {
    console.log("Load...");
}

function selectDir() {
    console.log("Clicked select");
    if (fileDir.value === '') {
        showNotify("Please enter the directory of the data file in `File directory`.", "negative")
        return
    }
    let data = {
        dir: fileDir.value
    }
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
                showNotify("success", 'positive');
                dataFiles.value = data.files;
                dataFilesOptions.value = dataFiles.value.map((x) => ({ label: x, value: x }));
                boolGetDataFiles.value = true;
            } else {
                showNotify(data.msg, 'negative');
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
    console.log(`Received data from EventBus: ${boolCheckClickhouseConnection.value}`);
}

onMounted(() => {
    EventBus.$on('clickhouse-connected', handleCCEvent);
    fnBoolCheckClickhouseConnection();
});

onUnmounted(() => {
    EventBus.$off('clickhouse-connected', handleCCEvent);
});

function fnBoolCheckClickhouseConnection() {
    fetch("/api/bool_check_clickhouse_connection")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }).then((data) => {
            boolCheckClickhouseConnection.value = data;
            console.log(`get_clickhouse_connection_info: ${boolCheckClickhouseConnection.value}`);
        }).catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}
</script>
