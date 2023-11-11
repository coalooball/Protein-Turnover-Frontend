<template>
    <q-expansion-item dense dense-toggle expand-separator label="Host Information">
        <q-card class="bg-grey-5">
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
    </q-expansion-item>
</template>
  
  
<script setup>
import { ref } from 'vue';

const message = ref([]);

const fetchData = async () => {
    try {
        const response = await fetch('/api/host_informations');
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
  