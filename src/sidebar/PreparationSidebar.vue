<template>
    <div class="row justify-center">
        Preparation Configuration
        <q-card flat bordered class="bg-grey-10">
            <q-input v-model="host" label="Host" :dense="true" label-color="white" color="teal" input-class="text-white" />
            <q-input v-model="port" label="Port" :dense="true" label-color="white" color="teal" input-class="text-white" />
            <q-input v-model="username" label="Username" :dense="true" label-color="white" color="teal"
                input-class="text-white" />
            <q-input v-model="password" label="Password" :dense="true" label-color="white" color="teal"
                input-class="text-white" />
            <q-btn color="primary" @click="sendData">Ping</q-btn>
        </q-card>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

let host = ref('');
let port = ref('');
let username = ref('');
let password = ref('');

const sendData = () => {
    const data = {
        host: host.value,
        port: port.value,
        username: username.value,
        password: password.value
    };

    fetch('/api/test_clickhouse_connection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};
</script>
  