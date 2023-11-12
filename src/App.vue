<template>
  <q-layout view="lHh lpR fFf">

    <q-header elevated class="bg-dark text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="/atom.white.svg">
          </q-avatar>
          Protein Turnover
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/protein_turnover" label="Home" no-caps />
        <q-route-tab to="/protein_turnover/preparation" label="Preparation" no-caps />
        <q-route-tab to="/protein_turnover/manage_job" label="Manage Job" no-caps />
        <q-route-tab to="/protein_turnover/create_job" label="Create Job" no-caps />
        <q-route-tab to="/protein_turnover/inspect_envelope_fit" label="Inspect Envelope Fit" no-caps />
        <q-route-tab to="/protein_turnover/compare_envelope_fit" label="Compare Envelope Fit" no-caps />
        <q-route-tab to="/protein_turnover/batch_export" label="Batch Export" no-caps />
        <!-- <q-route-tab to="/page3" label="Page Three" /> -->
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered
      :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-10'">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="bg-grey-6" style="width: 100vw; height: 100vh;">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>{{ title }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const leftDrawerOpen = ref(false)
const route = useRoute()
const title = ref('Home')

watch(() => route.path, (newPath) => {
  if (newPath === '/protein_turnover') {
    title.value = 'View the basic status and operating environment of the host.'
  } else if (newPath === '/protein_turnover/manage_job') {
    title.value = 'View the status of all jobs.'
  } else if (newPath === '/protein_turnover/create_job') {
    title.value = 'Create jobs.'
  } else if (newPath === '/protein_turnover/inspect_envelope_fit') {
    title.value = 'Inspect Envelope Fit.'
  } else if (newPath === '/protein_turnover/compare_envelope_fit') {
    title.value = 'Compare Envelope Fit.'
  } else if (newPath === '/protein_turnover/batch_export') {
    title.value = 'Batch Export.'
  } else if (newPath === '/protein_turnover/preview') {
    title.value = 'Preview.'
  } else {
    title.value = ''
  }
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>