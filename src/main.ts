import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'vuefinder/dist/style.css'
import VueFinder from 'vuefinder/dist/vuefinder'
import zhCN from 'vuefinder/dist/locales/zhCN.js'
import './assets/main.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(VueFinder, {
  i18n: { zhCN }
})

app.mount('#app')
