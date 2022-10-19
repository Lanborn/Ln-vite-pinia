import { defineStore } from 'pinia'
import loginApi from '@/service/api/login/login'

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    token: '',
    userInfo: {},
  }),
  getters: {},
  actions: {
    accountLoginAction() {
      console.log(loginApi)
    },
  },
})
