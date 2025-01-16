import { createApp } from 'vue'
import { createExtension } from '@own3d/sdk/vue'
import './style.css'
import App from './App.vue'

const extension = createExtension()
const app = createApp(App)

app.use(extension)
app.mount('#app')
