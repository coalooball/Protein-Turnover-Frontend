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

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="text-white"
      :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-10'">
      <div v-if="sidebarFlag === 0">
        <home-sidebar />
      </div>
      <div v-else-if="sidebarFlag === 1">
        <preparation-sidebar />
      </div>
      <div v-else>
        No content
      </div>
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
import HomeSidebar from './sidebar/HomeSidebar.vue';
import PreparationSidebar from './sidebar/PreparationSidebar.vue';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const leftDrawerOpen = ref(false)
const route = useRoute()
const title = ref('Home')
let sidebarFlag = ref(0);

watch(() => route.path, (newPath) => {
  if (newPath === '/protein_turnover') {
    title.value = 'View the basic status and operating environment of the host.'
    sidebarFlag.value = 0;
  } else if (newPath === '/protein_turnover/preparation') {
    title.value = 'Preparation.'
    sidebarFlag.value = 1;
  } else if (newPath === '/protein_turnover/manage_job') {
    title.value = 'View the status of all jobs.'
    sidebarFlag.value = 2;
  } else if (newPath === '/protein_turnover/create_job') {
    title.value = 'Create jobs.'
    sidebarFlag.value = 3;
  } else if (newPath === '/protein_turnover/inspect_envelope_fit') {
    title.value = 'Inspect Envelope Fit.'
    sidebarFlag.value = 4;
  } else if (newPath === '/protein_turnover/compare_envelope_fit') {
    title.value = 'Compare Envelope Fit.'
    sidebarFlag.value = 5;
  } else if (newPath === '/protein_turnover/batch_export') {
    title.value = 'Batch Export.'
    sidebarFlag.value = 6;
  } else {
    title.value = ''
  }
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>