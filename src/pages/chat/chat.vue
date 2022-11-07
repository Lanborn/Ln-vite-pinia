<template>
  <div class="chat">
    <div class="linkList">
      <el-button class="btn" type="success">点击试试捏</el-button>
      <el-button class="btn-back" type="primary" @click="handleBack">Home</el-button>
      <el-button type="warning">🍑🍎🌈</el-button>
    </div>
    <div class="pkContainer">
      <div class="home-title">
        <h2>房间号： {{ home_id }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, ref, onUnmounted } from 'vue'
import useStore from '@/store/index'
import router from '@/router'

export default defineComponent({
  setup() {
    const loginStore = ref(useStore().login())
    const matchStore = ref(useStore().match())

    let username = ref('Coder')
    let message = ref('')
    let able = ref(true)
    const handleBack = () => {
      router.back()
    }
    const userInfo = ref(loginStore.value.userInfo)
    const home_id = ref(matchStore.value.home_id)
    const homePeopleCount = ref(matchStore.value.matchPeople)
    const token = ref(loginStore.value.token)
    var webSocket = new WebSocket(`ws://localhost:8080/ws?id=${home_id.value}&token=${token.value}`)
    function onMessage(event: any) {
      console.log(event.data)
      ElMessage.warning(event.data)
    }
    function onOpen(event: any) {
      console.log(event)
      // webSocket.send('连接上了')
      // webSocket.send(`${userInfo.value.username}加入了房间${home_id.value}`)
      ElMessage.success('加入会议室')
    }
    function onError(event: any) {
      alert(event.data)
    }
    function onClose(event: any) {
      ElMessage.info('退出房间')
    }
    webSocket.onerror = function (event) {
      onError(event)
    }
    webSocket.onopen = function (event) {
      onOpen(event)
    }
    webSocket.onmessage = function (event) {
      onMessage(event)
    }
    webSocket.onclose = function (event) {
      console.log('WebSocket断开连接', event)
      onClose(event)
    }

    if (typeof WebSocket === 'undefined') {
      ElMessage.error({
        message: '您的浏览器不支持WebSocket',
      })
    }
    onUnmounted(() => {
      // webSocket.onclose()
    })
    // 监听页面关闭
    const beforeunloadFn = function (e: any) {
      if (e) {
        e = e || window.event
        console.log(e)
        if (e) {
          userInfo.value.enable = 0
          loginStore.value.updateUserAction(userInfo.value)
          e.returnValue = '关闭提示'
        }
        userInfo.value.enable = 0
        loginStore.value.updateUserAction(userInfo.value)
        return '关闭提示'
      }
      window.close()
    }

    const unloadHandler = function (e: any) {
      e = window.event || e
      e.returnValue = '确定离开当前页面吗？'
      userInfo.value.enable = 0
    }
    return {
      username,
      message,
      able,
      home_id,
      homePeopleCount,
      handleBack,
      beforeunloadFn,
      unloadHandler,
    }
  },
  mounted() {
    window.addEventListener('beforeunload', (e) => this.beforeunloadFn(e))
    window.addEventListener('unload', (e) => this.unloadHandler(e))
  },
})
</script>

<style scoped lang="less">
.chat {
  width: 100%;
  height: 100%;
  background: url('https://jiangly.com/_nuxt/img/banner_111.a6be22c.gif');
  background-size: cover;
  background-color: #000;
  .linkList {
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .btn-back {
  }
}
.pkContainer {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  color: aliceblue;
}
</style>