import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
// https://quasar.dev/start/vite-plugin
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'


createApp(App)
    .use(router)
    .use(Quasar)
    .mount('#app');
