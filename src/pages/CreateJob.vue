<template>
    <div>
        <q-card>
            <div class="row">
                <div class="col-6">
                    <q-card-section>
                        <q-input v-model="job_name" label="job name" placeholder="Please enter the task name" :dense="dense" />
                    </q-card-section>
                </div>
            </div>
        </q-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let job_name = ref('');
let dense = ref(false);
</script>