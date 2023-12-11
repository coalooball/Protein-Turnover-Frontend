<template>
  <q-expansion-item v-model="expanded" dense dense-toggle expand-separator label="Host Information">
    <q-card v-if="host_info_loading_error !== ''" class="bg-grey-3">
      <q-card-section>
        <p class="text-red"> {{ host_info_loading_error }} </p>
      </q-card-section>
    </q-card>
    <q-card v-else-if="!host_info_loading" class="bg-grey-3">
      <q-card-section>
        <div class="row" v-for="(info_value, info_key) in message" :key="info_key">
          <div class="col-3">
            {{ info_value.key }}
          </div>
          <div class="col-9">
            {{ info_value.value }}
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card v-else class="bg-grey-3">
      <q-card-section>
        <q-circular-progress indeterminate rounded size="50px" color="blue-grey-14" class="q-ma-md" />
      </q-card-section>
    </q-card>
  </q-expansion-item>
  <q-expansion-item v-model="expandedClickhouseExpansion" dense dense-toggle expand-separator
    label="Clickhouse Information">
    <q-card v-if="ClickhouseExpansionLoadingError !== ''" class="bg-grey-3">
      <q-card-section>
        <p class="text-red"> {{ ClickhouseExpansionLoadingError }} </p>
      </q-card-section>
    </q-card>
    <q-card v-else-if="!ClickhouseExpansionLoading" class="bg-grey-3">
      <q-card-section v-if="ClickhouseExpansionData.length === 0">
        <q-chip dense square label="Information without ClickHouse" />
        <q-btn outline color="dark" label="Add" @click="addClickhouseInformationModel = true"></q-btn>
      </q-card-section>
      <q-card-section v-else>
        <div class="row">
          <div class="col-2">
            <q-btn outline color="dark" label="Add" @click="addClickhouseInformationModel = true"></q-btn>
          </div>
          <div class="col-2">
            <q-btn outline color="dark" label="Delete" @click="deleteClickhouseInformationModel = true"></q-btn>
          </div>
        </div>
        <div class="q-pa-md">
          <q-table title="Database" :rows="ClickhouseExpansionData" :columns="clickhouseColumns" row-key="name" />
        </div>
      </q-card-section>
    </q-card>
    <q-card v-else class="bg-grey-3">
      <q-card-section>
        <q-circular-progress indeterminate rounded size="50px" color="blue-grey-14" class="q-ma-md" />
      </q-card-section>
    </q-card>
  </q-expansion-item>

  <q-dialog v-model="addClickhouseInformationModel" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New Clickhouse Information</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense label="Name" stack-label v-model="clickhouseName" autofocus />
        <q-input dense label="Host" stack-label v-model="clickhouseHost" autofocus />
        <q-input dense label="Port" stack-label v-model="clickhousePort" autofocus />
        <q-input dense label="Username" stack-label v-model="clickhouseUsername" autofocus />
        <q-input dense label="Password" stack-label v-model="clickhousepassword" autofocus
          @keyup.enter="createClickhouseInformation" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add" v-close-popup @click="createClickhouseInformation" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="deleteClickhouseInformationModel" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Delete Clickhouse Information</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense label="ID" stack-label v-model="clickhouseDeleteID" autofocus
          @keyup.enter="deleteClickhouseInformation" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Delete" v-close-popup @click="deleteClickhouseInformation" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
  
  
<script setup>
import API from "@/API/Home.js"
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import { showNotify } from "@/utils/statice";

const $q = useQuasar();
const message = ref([]);
const expanded = ref(true);
const host_info_loading = ref(true);
const host_info_loading_error = ref("");

let addClickhouseInformationModel = ref(false);
let expandedClickhouseExpansion = ref(true);
let ClickhouseExpansionLoadingError = ref("");
let ClickhouseExpansionLoading = ref(true);
let ClickhouseExpansionData = ref([]);
let clickhouseName = ref("");
let clickhouseHost = ref("127.0.0.1");
let clickhousePort = ref(8123);
let clickhouseUsername = ref("");
let clickhousepassword = ref("");
let clickhouseColumns = ref(
  ["ID", "Name", "Host", "Port", "Username", "Password"].map(
    (element, index) => ({
      name: index.toString(),
      required: true,
      label: element,
      align: "left",
      field: index.toString(),
      sortable: true,
    })
  )
);
let deleteClickhouseInformationModel = ref(false);
let clickhouseDeleteID = ref("");

const fetchData = async () => {
  host_info_loading.value = true;
  try {
    const data = await API.hostInformations();
    message.value = data;
    host_info_loading_error.value = "";
  } catch (error) {
    console.error("Fetch error:", error);
    host_info_loading_error.value = String(error);
  }
  host_info_loading.value = false;
  console.log(host_info_loading_error.value);
};

function createClickhouseInformation() {
  if (addClickhouseInformationModel.value) {
    addClickhouseInformationModel.value = false;
  }
  const params = {
    data: [
      clickhouseName.value,
      clickhouseHost.value,
      clickhousePort.value,
      clickhouseUsername.value,
      clickhousepassword.value,
    ],
  }
  API.createClickhouseInformation(params).then(
    data => {
      if (data.success) {
        showNotify("Success!", "positive");
        readAllClickhouseInformation();
      } else {
        showNotify(data.msg, "negative");
      }
    },
    error => {
      console.error(error);
      ClickhouseExpansionLoadingError.value = error;
    }
  )
}

function readAllClickhouseInformation() {
  ClickhouseExpansionLoading.value = true;
  API.readAllClickhouseInformation().then(
    data => {
      ClickhouseExpansionLoading.value = false;
      if (data.success) {
        ClickhouseExpansionData.value = data.data;
      } else {
        ClickhouseExpansionLoadingError.value = data.msg;
      }
    },
    error => {
      console.error(error);
      ClickhouseExpansionLoading.value = false;
      ClickhouseExpansionLoadingError.value = error;
    }
  )
}

function deleteClickhouseInformation() {
  if (deleteClickhouseInformationModel) {
    deleteClickhouseInformationModel.value = false;
  }
  const params = {
    data: clickhouseDeleteID.value
  }
  API.deleteClickhouseInformation(params).then(
    data => {
      if (data.success) {
        showNotify("Success!", "positive");
        readAllClickhouseInformation();
      } else {
        showNotify(data.msg, "negative");
      }
    },
    error => {
      console.error(error);
    }
  )
}

onMounted(() => {
  fetchData();
  readAllClickhouseInformation();
})
</script>
  