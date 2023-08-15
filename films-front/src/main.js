// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router'

import image from "./assets/loading.gif";
import notfound from "./assets/notfound.png"


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueLazyload, {
  preLoad: 1.3,
  error: notfound,
  loading: image,
  attempt: 1
})

app.mount('#app')
