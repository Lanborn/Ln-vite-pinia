import { defineStore } from 'pinia'
import { useMainStore } from '@/store/modules/main'
import loginApi from '@/service/api/login/login'
import router from '@/router'
import localCache from '@/utils/cache'
import { ILoginParams, IRegisterParams } from '@/service/api/login/types'

import { ElMessage } from 'element-plus'

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    token: '',
    userInfo: {
      username: '',
    },
  }),
  getters: {},
  actions: {
    async accountLoginAction(payload: ILoginParams) {
      console.log(payload)
      const loginResult = await loginApi.login(payload)
      console.log('result  ', loginResult)
      if (loginResult.code == 400) {
        ElMessage.error({
          type: 'error',
          center: true,
          showClose: true,
          message: loginResult.message,
        })
      } else {
        const { token, userInfo } = loginResult.data
        console.log(token, userInfo)
        this.userInfo = userInfo
        this.token = token
        localCache.setCache('token', token, true)
        localCache.setCache('userInfo', userInfo, true)
        this.initUserDataAction(userInfo)
        ElMessage.success({
          type: 'success',
          center: true,
          showClose: true,
          message: loginResult.message,
        })
      }
      router.push('/main')
    },
    registerUserAction(payload: IRegisterParams) {
      console.log(payload)
    },
    initUserDataAction(userInfo: any) {
      this.userInfo = userInfo
      // const main = useMainStore()
      // main.getCurImgUrl(userInfo.avatarUrl)
    },
  },
})
