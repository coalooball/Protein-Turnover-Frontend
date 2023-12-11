import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./router/guarder"
// https://quasar.dev/start/vite-plugin
import { Quasar } from "quasar"
import { Notify } from "quasar"
import "@quasar/extras/material-icons/material-icons.css"
import "quasar/src/css/index.sass"
import { createPinia } from "pinia"

createApp(App)
  .use(router)
  .use(createPinia())
  // https://stackoverflow.com/questions/67861771/notifications-failing-at-notify
  .use(Quasar, {
    plugins: {
      Notify,
    },
  })
  .mount("#app")
