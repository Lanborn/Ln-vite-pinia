import { App } from 'vue'
import registerProperties from './register-properties'
import registerElement from './register-element'
import { socket } from './register-socket'
import VueSocketIoExtended from 'vue-socket.io-extended'

export function globalRegister(app: App): void {
  app.use(registerProperties)
  app.use(registerElement)
  // app.use(VueSocketIoExtended, socket)
}
