import http from '@/service/index'
import * as T from './types'

const testDemoAPI: T.ITestApi = {
  testNewsApi() {
    return http.get('sys/user/list')
  },
}

export default testDemoAPI
