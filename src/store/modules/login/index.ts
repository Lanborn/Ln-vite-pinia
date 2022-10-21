import { defineStore } from 'pinia'
import loginApi from '@/service/api/login/login'
import { ILoginParams, IRegisterParams } from '@/service/api/login/types'

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    token: '',
    userInfo: {},
  }),
  getters: {},
  actions: {
    accountLoginAction(payload: ILoginParams) {
      console.log(payload)
      console.log(loginApi)
    },
    registerUserAction(payload: IRegisterParams) {
      console.log(payload)
    },
  },
})
