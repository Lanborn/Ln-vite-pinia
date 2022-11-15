import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import MatchApi from '@/service/api/match/index'
import localCache from '@/utils/cache'
import { IJoinRoomParams } from '@/service/api/match/types'

export const useMatchStore = defineStore({
  id: 'match',
  state: () => ({
    pageParmas: {
      pageSize: 4,
      pageNo: 1,
    },
    home_id: 8888,
    matchPeople: 0,
    roomList: [],
  }),
  getters: {},
  actions: {
    async getRoomList() {
      const roomListResult = await MatchApi.getRoomList(this.pageParmas)
      this.roomList = roomListResult.data.list
    },
    async joinRoomAction(params: IJoinRoomParams) {
      const joinRoomResult = await MatchApi.joinRoom(params)
      console.log(joinRoomResult)
    },
    async exitRoomAction(params: IJoinRoomParams) {
      const exitRoomResult = await MatchApi.exitRoom(params)
      console.log(exitRoomResult)
      ElMessage.info({
        message: exitRoomResult.data,
        center: true,
        showClose: true,
      })
    },
  },
})
