import { defineStore } from 'pinia'
import testDemoAPI from '@/service/api/testVueReqDemo'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
  }),
  getters: {},
  actions: {
    getVueReqList() {
      console.log(
        testDemoAPI.testNewsApi().then((res) => {
          console.log('', res)
        })
      )
    },
  },
})
