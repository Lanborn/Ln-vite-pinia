import { App } from 'vue'
// import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const components = [ElMessage]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, components)
  }
}
