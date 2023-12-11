<template>
  <div class="row justify-center">
    <q-chip dense square label="Preparation Configuration" />
    <q-card flat bordered class="bg-grey-10">
      <q-select label="Choose One" dark transition-show="jump-up" label-color="white" color="teal"
        transition-hide="jump-up" filled v-model="clickhouseOptionModel" :options="clickhouseOptions"
        style="width: 250px" />
      <q-input v-model="host" label="Host" :dense="true" label-color="white" color="teal" input-class="text-white" dark />
      <q-input v-model="port" label="Port" :dense="true" label-color="white" color="teal" input-class="text-white" dark />
      <q-input v-model="username" label="Username" :dense="true" label-color="white" color="teal" dark
        input-class="text-white" />
      <q-input v-model="password" label="Password" :dense="true" label-color="white" color="teal" dark
        input-class="text-white" :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-space />
      <div v-if="!is_connected">
        <q-btn color="primary" @click="sendData">
          Connect
          <q-tooltip anchor="bottom middle" self="top middle">
            Click to connect clickhouse server
          </q-tooltip>
        </q-btn>
      </div>
      <div v-else>
        <q-btn color="positive" @click="sendData">
          Ping
          <q-tooltip anchor="bottom middle" self="top middle">
            Click to ping clickhouse server
          </q-tooltip>
        </q-btn>
      </div>
    </q-card>
  </div>
</template>
  
<script setup>
import { EventBus } from "../event-bus.js";
import { ref, onMounted, watch } from "vue";
import { showNotify } from "@/utils/statice";
import API from "@/API/Sidebar.js"

let host = ref("127.0.0.1");
let port = ref("8123");
let username = ref("");
let password = ref("");
let is_connected = ref(false);
let isPwd = ref(true);
let clickhouseOptions = ref([]);
let clickhouseOptionModel = ref("");

const getClickhouseInfo = () => {
  API.getClickhouseConnectionInfo().then(
    data => {
      if (data !== null) {
        host.value = data.host;
        port.value = data.port;
        username.value = data.username;
        password.value = data.password;
        is_connected.value = true;
      }
    },
    error => { }
  )
};

function getClickhouseInfoOptions() {
  API.getALlNamesOfClickHouseInformation().then(
    data => {
      if (data.success) {
        clickhouseOptions.value = data.data;
      } else {
        showNotify(data.msg, "negative");
      }
    },
    error => { }
  )
}

function getClickhouseInfoByNmae(newName) {
  let params = {
    data: newName,
  }
  API.getClickhouseInfoByName(params).then(
    data => {
      if (data.success) {
        host.value = data.data[0];
        port.value = data.data[1];
        username.value = data.data[2];
        password.value = data.data[3];
      } else {
        showNotify(data.msg, 'negative')
      }
    },
    error => { }
  )
}

const sendData = () => {
  const data = {
    host: host.value,
    port: port.value,
    username: username.value,
    password: password.value,
  };
  API.testClickHouseConnection(data).then(
    data => {
      is_connected.value = data;
      if (data) {
        showNotify("Connected")
        EventBus.$emit("clickhouse-connected", data);
      } else {
        showNotify("Failed to connect clickhouse!", "negative")
      }
    },
    error => { }
  )
};


onMounted(() => {
  getClickhouseInfo();
  getClickhouseInfoOptions();
});

watch(clickhouseOptionModel, (newValue) => {
  getClickhouseInfoByNmae(newValue);
});
</script>
  