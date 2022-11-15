<template>
  <div class="chat">
    <div class="linkList">
      <el-button class="btn" type="success" @click="handleTest">点击试试捏</el-button>
      <el-button class="btn-back" type="primary" @click="handleBack">Home</el-button>
      <el-button type="warning">🍑🍎🌈</el-button>
    </div>
    <div class="home-title">
      <h2>房间号： {{ home_id }}</h2>
    </div>
    <div class="pkContainer">
      <!-- <div v-for="(item, index) in homePeopleCount" :key="index" class="user_pk_box">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          v-if="!isUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-image v-else></el-image>
      </div> -->
      <div class="user_pk_box">
        <el-image
          style="width: 300px; height: 300px"
          src="https://face-rank.oss-cn-hangzhou.aliyuncs.com/2022/10/25/xiaocao.JPG"
          :initial-index="4"
          fit="cover"
        />
        <h2>Username: xiaocao</h2>
        <h2>Value: 79</h2>
      </div>
      <div class="user_pk_box">
        <el-image
          style="width: 300px; height: 300px"
          src="https://face-rank.oss-cn-hangzhou.aliyuncs.com/2022/10/25/%E5%B0%8FQ.JPG"
          :initial-index="4"
          fit="cover"
        />
        <h2>Username: 小Q</h2>
        <h2>Value: 69</h2>
      </div>
    </div>
    <div class="resultInfo">
      <h2>xiaoao Win！！！</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'
import useStore from '@/store/index'
import router from '@/router'
import { Plus } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import localCache from '@/utils/cache'
import type { UploadProps } from 'element-plus'

export default defineComponent({
  components: {
    Plus,
  },
  setup() {
    const loginStore = ref(useStore().login())
    const matchStore = ref(useStore().match())
    const currentDate = ref(new Date())
    let message = ref('')
    let able = ref(true)
    let isUpload = ref(false)
    const handleBack = () => {
      matchStore.value.exitRoomAction({
        roomId: matchStore.value.home_id,
        userId: localCache.getSessionCache('userInfo').id,
      })
      router.back()
    }
    const handleTest = () => {
      ElNotification({
        title: 'Success',
        message: 'This is a success message',
        type: 'success',
      })
    }
    const userInfo = ref(loginStore.value.userInfo)
    const home_id = ref(matchStore.value.home_id)
    const homePeopleCount = ref(matchStore.value.matchPeople)

    const token = ref(loginStore.value.token)

    const imageUrl = ref('')

    const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
      imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    }

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 3MB!')
        return false
      }
      return true
    }

    var webSocket = new WebSocket(`ws://localhost:8080/ws?id=${home_id.value}&token=${token.value}`)
    function onMessage(event: any) {
      console.log(event.data)
      ElMessage.warning({
        message: event.data,
        showClose: true,
        center: true,
      })
    }
    function onOpen(event: any) {
      console.log(event)
      // webSocket.send('连接上了')
      // webSocket.send(`${userInfo.value.username}加入了房间${home_id.value}`)
      ElMessage.success({
        message: '加入房间',
        showClose: true,
        center: true,
      })
    }
    function onError(event: any) {
      alert(event.data)
    }
    function onClose(event: any) {
      ElMessage.info({
        message: '退出房间',
        showClose: true,
        center: true,
      })
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
        showClose: true,
      })
    }

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
      userInfo,
      message,
      able,
      home_id,
      homePeopleCount,
      currentDate,
      isUpload,
      handleAvatarSuccess,
      beforeAvatarUpload,
      handleBack,
      beforeunloadFn,
      unloadHandler,
      handleTest,
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
  .resultInfo {
    color: cornsilk;
    text-align: center;
  }
}
.home-title {
  text-align: center;
  color: #fff;
}
.pkContainer {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  color: aliceblue;
  .user_pk_box {
    height: 400px;
    width: 300px;
    // background: #fff;
    .avatar-uploader .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>