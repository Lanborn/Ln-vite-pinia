import { createApp } from 'vue'
import router from '@/router/index'
import 'normalize.css'
import './assets/css/index.less'
import { globalRegister } from './global'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import { setupStore } from '@/store/index'
import SocketIo from './plugins/Socket.io'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
globalRegister(app)
app.use(SocketIo, {
  connection: 'http://localhost:8080/ws',
  options: {
    autoConnect: false,
  },
})
app.config.globalProperties.$ELEMENT = {}
app.use(createPinia())
setupStore()
app.use(router)

app.mount('#app')
