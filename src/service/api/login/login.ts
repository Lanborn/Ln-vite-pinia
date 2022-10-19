import http from '@/service/index'
import * as T from './types'

const loginApi: T.ILoginApi = {
  login(params) {
    return http.post('/login', params)
  },
  register(params) {
    return http.post('/register', params)
  },
  logout(params) {
    return http.post('/logout', params)
  },
}
export default loginApi
