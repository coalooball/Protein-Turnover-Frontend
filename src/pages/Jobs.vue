<template>
    <q-tabs v-model="jobsTab" dense align="justify" class="bg-blue-grey-10 text-white shadow-2" narrow-indicator>
        <q-tab name="manage_job" label="Manage" no-caps />
        <q-tab name="create_job" label="Create" no-caps />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="jobsTab" animated>
        <q-tab-panel name="manage_job">
            <manage-job />
        </q-tab-panel>
        <q-tab-panel name="create_job">
            <create-job />
        </q-tab-panel>
    </q-tab-panels>
</template>

<script setup>
import { ref } from "vue";
import CreateJob from "./jobs/CreateJob.vue";
import ManageJob from "./jobs/ManageJob.vue";
let jobsTab = ref("manage_job");
</script>