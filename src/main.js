import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import config from '../formkit.config'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'
const app = createApp(App)
app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
app.use(createPinia())
app.use(plugin, defaultConfig(config))
app.use(router)

app.mount('#app')
