<template>
  <div class="main">
    <el-container class="main-content">
      <el-header class="page-header">
        <nav-header @foldChange="handleFoldChange" />
      </el-header>
      <el-container class="page">
        <el-main class="page-content">
          <ln-upload />
          <div class="page-info">
            <ln-car />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useMainStore } from '@/store/modules/main'
import NavHeader from '@/components/NavHeader/index'
import LnUpload from '@/base-ui/upload/index'
import localCache from '@/utils/cache'
import { useMatchStore } from '@/store/modules/match/index'
import LnCar from '@/base-ui/Car/index'
import useStore from '@/store'
export default defineComponent({
  components: {
    NavHeader,
    LnUpload,
    LnCar,
  },
  created() {
    this.match.getRoomList()
  },
  setup() {
    const main = useMainStore()
    main.getValueInfoNow()
    const { login } = useStore()
    const loginStore = login()
    const userInfo = ref(loginStore.userInfo)
    const match = useMatchStore()
    // main.detailsInfo = main.valueInfoToday.sort(compare('value'))

    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }

    // 监听页面关闭
    const beforeunloadFn = function (e: any) {
      let beginTime = 0 //开始时间
      let differTime = 0 //时间差
      differTime = new Date().getTime() - beginTime
      console.log(differTime)
      // 关闭页面
      if (e) {
        e = e || window.event
        console.log(e)
        if (e) {
          e.returnValue = '关闭提示'
        } else {
          console.log('关闭or 刷新')
        }
        logout()
        console.log('关闭页面')
        return '关闭提示'
      }

      window.close()
    }

    const unloadHandler = function (e: any) {
      e = window.event || e
      e.returnValue = '确定离开当前页面吗？'
    }

    const logout = async () => {
      userInfo.value.enable = 0
      await loginStore.updateUserAction(userInfo.value)
    }
    return {
      main,
      match,
      isCollapse,
      userInfo,
      loginStore,
      handleFoldChange,
      beforeunloadFn,
      unloadHandler,
      logout,
    }
  },
  mounted() {
    // let _this = this
    // let beginTime = 0
    // let differTime = 0
    // window.onunload = function (e: any) {
    //   differTime = new Date().getTime() - beginTime
    //   if (differTime <= 5) {
    //     _this.logout()
    //     debugger
    //     e = e || window.event
    //     e.returnValue = '确定离开当前页面吗？'
    //   } else {
    //     console.log('刷新页面')
    //   }
    // }
    // window.onbeforeunload = function (e) {
    //   beginTime = new Date().getTime()
    //   if (e) {
    //     e = e || window
    //     if (e) {
    //       e.returnValue = '关闭提示'
    //     }
    //     console.log('关闭页面')
    //     return '关闭提示'
    //   }
    //   window.close()
    // }
    window.addEventListener('beforeunload', (e) => this.beforeunloadFn(e))
    window.addEventListener('unload', (e) => this.unloadHandler(e))
  },
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/bgMain.jpg') center center;
  background-size: cover;
  // padding: 10px;
  overflow: hidden;
}
.main-content,
.page {
  height: 100%;
  // display: flex;
  // color: #333;
  // text-align: center;
  // align-items: center;
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.page-header {
  width: 100%;
  padding: 0px;
}
.page-content {
  height: calc(100% - 48px);
}
.page-info {
  width: 100%;
  display: flex;
  justify-content: center;
  // align-items: center;
  margin-top: 400px;
}
</style>