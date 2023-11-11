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
        <q-route-tab to="/protein_turnover" label="Home" />
        <q-route-tab to="/protein_turnover/about" label="About" />
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

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router' // 导入 useRoute 钩子

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const route = useRoute()
    const title = ref('Home')

    watch(() => route.path, (newPath) => {
      if (newPath === '/protein_turnover') {
        title.value = 'Home'
      } else if (newPath === '/protein_turnover/about') {
        title.value = 'About'
      } else {
        title.value = ''
      }
    })

    return {
      leftDrawerOpen,
      title,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>