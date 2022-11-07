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
      console.log(roomListResult)
      console.log('roomList ', this.roomList)
    },
    async joinRoomAction(params: IJoinRoomParams) {
      params.room_id = this.home_id
      params.username = localCache.getSessionCache('userInfo').username
      const joinRoomResult = await MatchApi.joinRoom(params)
      console.log(joinRoomResult)
    },
  },
})
