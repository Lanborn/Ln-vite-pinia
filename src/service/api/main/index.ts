import http from '@/service/index'
import * as T from './types'

const MainApi: T.IMainApi = {
  uploadImg(params) {
    return http.upload('/uploadImgFile', params)
  },
  faceSpot(params) {
    return http.upload('/face/save', params)
  },
  getTodayInfo() {
    return http.get('/face/list/today')
  },
}

export default MainApi
