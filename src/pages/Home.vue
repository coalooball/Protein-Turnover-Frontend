<template>
    <q-expansion-item dense dense-toggle expand-separator label="Host Information">
        <q-card class="bg-grey-5">
            <q-card-section>
                <div>
                    <p>{{ message }}</p>
                </div>
            </q-card-section>
        </q-card>
    </q-expansion-item>
</template>
  
<script setup>
import { ref } from 'vue';

const message = ref('');

const fetchData = async () => {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        message.value = data.message;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

fetchData();
</script>
  