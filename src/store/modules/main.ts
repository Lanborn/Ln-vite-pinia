import { defineStore } from 'pinia'
import MainApi from '@/service/api/main/index'
import { uniqueFunc } from '@/utils/objectFilter'
import { unique } from '@/utils/ArrayFilter'
import { compare } from '@/utils/ArraySort'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
    cardIndex: 0,
    index: 0,
    length: 0,
    curImg: '',
    curImgUrls: [] as any[],
    valueInfo: [] as any[],
    detailsInfo: [] as any[],
    faceInfo: [] as any[],
    valueInfoToday: [] as any[],
  }),
  getters: {
    getCurImg(state): string {
      return state.curImg
    },
    getDetails(state): any[] {
      return state.detailsInfo
    },
  },
  actions: {
    getValueInfoNow() {
      MainApi.getTodayInfo().then(
        (res) => {
          console.log('today  ', res)
          this.valueInfoToday = res.data
        },
        (error) => {
          console.log(error)
        }
      )
    },
    addImgUrls(url: any) {
      this.curImgUrls.push(url)
      this.curImgUrls = unique(this.curImgUrls) as any[]
      this.curImg = url
    },
    getCurImgUrl(url: any) {
      this.curImgUrls.push(url)
    },
    getValueInfo(value: any) {
      this.valueInfo.push(value)
      this.valueInfo = uniqueFunc(this.valueInfo, 'id')
      this.length = this.valueInfo.length
    },
    getDetailsInfo(value: any) {
      this.detailsInfo.push(value)
      this.detailsInfo = uniqueFunc(this.detailsInfo, 'url')
      this.detailsInfo.sort(compare('beauty'))
    },
    getFaceInfo(value: any) {
      this.faceInfo.push(value)
      this.faceInfo = uniqueFunc(this.faceInfo, 'face_token')
    },
  },
})
