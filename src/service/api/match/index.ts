import http from '@/service/index'
import * as T from './types'

const MatchApi: T.IMatchApi = {
  getRoomList(params) {
    return http.get('/sys/room/list', params)
  },
  joinRoom(params) {
    return http.post('/sys/room/join', params)
  },
  exitRoom(params) {
    return http.post('/sys/room/exit', params)
  },
}

export default MatchApi
