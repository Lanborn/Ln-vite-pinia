import http from '@/service/index'
import * as T from './types'

const MainApi: T.IMainApi = {
  uploadImg(params) {
    return http.upload('/uploadImgFile', params)
  },
  faceSpot(params) {
    return http.upload('/face/save', params)
  },
  getTodayInfo(params) {
    return http.get('/face/list/today', params)
  },
  regFaceInfo(params) {
    return http.upload('/face/register/info', params)
  },
  getSevenInfo(params) {
    return http.get('/face/list/seven', params)
  },
}

export default MainApi
