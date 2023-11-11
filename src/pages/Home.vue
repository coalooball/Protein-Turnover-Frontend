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
</template>
  
  
<script setup>
import { ref } from 'vue';

const message = ref([]);
const expanded = ref(true);
const host_info_loading = ref(true);
const host_info_loading_error = ref('');

const fetchData = async () => {
    host_info_loading.value = true;
    try {
        const response = await fetch('/api/host_informations');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        message.value = data;
    } catch (error) {
        console.error('Fetch error:', error);
        host_info_loading_error.value = String(error);
    }
    host_info_loading.value = false
    console.log(host_info_loading_error.value)
};

fetchData();
</script>
  