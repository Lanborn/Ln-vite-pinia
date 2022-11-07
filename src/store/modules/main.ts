import { defineStore } from 'pinia'
import MainApi from '@/service/api/main/index'
import { uniqueFunc } from '@/utils/objectFilter'
import { unique } from '@/utils/ArrayFilter'
import { compare } from '@/utils/ArraySort'
import { ElMessage } from 'element-plus'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
    cardIndex: 0,
    index: 0,
    length: 0,
    curImg: '',
    page: {},
    pageParmas: {
      pageSize: 10,
      pageNo: 1,
    },
    totalToday: {},
    totalSeven: {},
    curImgUrls: [] as any[],
    valueInfo: [] as any[],
    detailsInfo: [] as any[],
    faceInfo: [] as any[],
    valueInfoToday: [] as any[],
    valueInfoSeven: [] as any[],
  }),
  getters: {
    getCurImg(state): string {
      return state.curImg
    },
    getDetails(state): any[] {
      return state.detailsInfo
    },
    getInfoSeven(state): object {
      return state.totalSeven
    },
    getInfoToday(state): object {
      return state.totalToday
    },
    getPageInfo(state): object {
      return state.page
    },
    // getInfoPage(state): object {
    //   return state.totalSeven!.pageSize == undefined ? state.totalToday : state.totalSeven
    // },
  },
  actions: {
    getValueInfoNow() {
      MainApi.getTodayInfo(this.pageParmas).then(
        (res) => {
          this.totalToday = res.data
          this.valueInfoToday = res.data.list
          this.detailsInfo = this.valueInfoToday.sort(compare('value'))
          this.page = this.totalToday
        },
        (error) => {
          console.log(error)
        }
      )
    },

    getValueInfoSeven() {
      MainApi.getSevenInfo(this.pageParmas).then(
        (res) => {
          console.log('data ', res.data)
          this.totalSeven = res.data
          this.valueInfoSeven = res.data.list
          this.detailsInfo = uniqueFunc(this.valueInfoSeven, 'value').sort(compare('value'))
          this.page = this.totalSeven
          console.log('page ', this.getPageInfo)
        },
        (err) => {
          console.log(err)
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
      this.detailsInfo = uniqueFunc(this.detailsInfo, 'imgUrl')
      this.detailsInfo.sort(compare('value'))
    },
    getFaceInfo(value: any) {
      this.faceInfo.push(value)
      this.faceInfo = uniqueFunc(this.faceInfo, 'face_token')
    },

    async uploadImgAli(value: any) {
      const res = await MainApi.uploadImg(value)
      console.log(res)
    },

    async uploadRegInfo(value: any) {
      const res = await MainApi.regFaceInfo(value)
      console.log(res)
      if (res.code !== 200) {
        ElMessage.error({
          type: 'error',
          message: res.message,
        })
      } else {
      }
    },
  },
})
