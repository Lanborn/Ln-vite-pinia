import http from '@/service/index'
import * as T from './types'

const loginApi: T.ILoginApi = {
  login(params) {
    return http.post('sys/user/login', params)
  },
  register(params) {
    return http.post('sys/user/register', params)
  },
  logout(params) {
    return http.post('sys/user/logout', params)
  },
  faceLogin(params: any) {
    return http.upload('/face/login', params)
  },
  updateUser(params) {
    return http.post('sys/user/update', params)
  },
  changeUserEnable(params) {
    return http.post('sys/user/update', params)
  },
}
export default loginApi
