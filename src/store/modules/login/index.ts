import { defineStore } from 'pinia'
import { useMainStore } from '@/store/modules/main'
import loginApi from '@/service/api/login/login'
import router from '@/router'
import localCache from '@/utils/cache'
import { ILoginParams, IRegisterParams, IExitUserParams } from '@/service/api/login/types'
import { ElMessage } from 'element-plus'

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    token: '',
    userInfo: {
      username: '',
      password: '',
      age: 0,
      realname: '',
      sex: 0,
      email: '',
      enable: 1,
    },
  }),
  getters: {},
  actions: {
    async accountLoginAction(payload: ILoginParams) {
      const loginResult = await loginApi.login(payload)
      console.log(loginResult)

      if (loginResult.code != 200) {
        ElMessage.error({
          type: 'error',
          center: true,
          showClose: true,
          message: loginResult.data,
        })
      } else {
        const { token, userInfo } = loginResult.data
        this.userInfo = userInfo
        this.token = token
        localCache.setCache('token', token, false)
        localCache.setCache('userInfo', userInfo, false)
        this.initUserDataAction(userInfo)
        ElMessage.success({
          type: 'success',
          center: true,
          showClose: true,
          message: loginResult.message,
        })
        router.push('/main')
      }
    },
    async faceLoginAction(payload: ILoginParams) {
      const faceLoginResult = await loginApi.faceLogin(payload)
      console.log(faceLoginResult)
      if (
        parseFloat(faceLoginResult.data.infoResult.score) < 80.0 ||
        faceLoginResult === undefined
      ) {
        ElMessage.error({
          type: 'error',
          center: true,
          showClose: true,
          message: '人脸不匹配',
        })
      } else {
        if (faceLoginResult.code !== 200) {
          ElMessage.error({
            type: 'error',
            center: true,
            showClose: true,
            message: faceLoginResult.message,
          })
        } else {
          const token = faceLoginResult.data.token
          const userInfo = faceLoginResult.data.user_info
          console.log(token, userInfo)
          this.userInfo = userInfo
          this.token = token
          localCache.setCache('token', token, false)
          localCache.setCache('userInfo', userInfo, false)
          this.initUserDataAction(userInfo)
          ElMessage.success({
            type: 'success',
            center: true,
            showClose: true,
            message: faceLoginResult.message,
          })
          router.push('/main')
        }
      }
    },
    async registerUserAction(payload: IRegisterParams) {
      const registerResult = await loginApi.register(payload)
      if (registerResult.code == 400) {
        ElMessage.error({
          type: 'error',
          center: true,
          showClose: true,
          message: registerResult.message,
        })
      } else {
        const { token, userInfo } = registerResult.data
        this.userInfo = userInfo
        this.token = token
        localCache.setCache('token', token, false)
        localCache.setCache('userInfo', userInfo, false)
        this.initUserDataAction(userInfo)
        ElMessage.success({
          type: 'success',
          center: true,
          showClose: true,
          message: registerResult.message,
        })
        router.push('/main')
      }
    },
    async updateUserAction(payload: any) {
      const res = await loginApi.updateUser(payload)
      const userInfo = res.data.userInfo
      if (res.code === 200) {
        ElMessage.success({
          center: true,
          message: '更新成功',
          showClose: true,
        })
        localCache.setCache('userInfo', res.data.userInfo, false)
        this.initUserDataAction(userInfo)
      } else {
        ElMessage.error({
          center: true,
          message: res.message,
        })
      }
    },
    initUserDataAction(userInfo: any) {
      this.userInfo = userInfo
      const main = useMainStore()
      main.getValueInfoNow()

      // main.getCurImgUrl(userInfo.avatarUrl)
    },
  },
})
