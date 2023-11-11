<template>
    <q-expansion-item v-model="expanded" dense dense-toggle expand-separator label="Host Information">
        <q-card v-if="!host_info_loading" class="bg-grey-5">
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
        <q-card v-else class="bg-grey-5">
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

const fetchData = async () => {
    try {
        host_info_loading.value = true;
        const response = await fetch('/api/host_informations');
        host_info_loading.value = false
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        message.value = data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

fetchData();
</script>
  