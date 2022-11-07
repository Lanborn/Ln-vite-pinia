<template>
  <div class="uploadVideo">
    <div class="info" @click="onTake">
      <el-image></el-image>
    </div>
    <el-dialog v-model="centerDialogVisible" title="人脸上传" width="30%" align-center>
      <div class="box">
        <video
          ref="videoRef"
          class="video"
          :width="videoWidth"
          :height="videoHeight"
          autoplay
        ></video>
        <canvas ref="canvasRef" class="canvas" :width="videoWidth" :height="videoHeight"></canvas>
      </div>
      <div class="footer">
        <el-button :icon="Camera" @click="drawImg" size="small">拍照</el-button>
        <el-button :icon="VideoCamera" v-if="os" @click="getCompetence" size="small"
          >打开摄像头</el-button
        >
        <el-button :icon="SwitchButton" v-else @click="stopNavigator" size="small"
          >关闭摄像头</el-button
        >
        <el-button :icon="Refresh" @click="resetCanvas" size="small">重置</el-button>
        <el-button :icon="Select" @click="upload" size="small">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { Camera, VideoCamera, Refresh, SwitchButton, Select } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const videoWidth = 500
const videoHeight = 400
let centerDialogVisible = ref(false)
let os = ref(false)
const videoRef = ref(null)
const canvasRef = ref(null)
let Context = ref(null)
let imgSrc = ref(undefined)
let imgFlle = ref(null)

const onTake = () => {
  centerDialogVisible.value = true
  getCompetence()
}

const getCompetence = () => {
  nextTick(() => {
    on = false
    Context = canvasRef.getContext('2d')
    // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
    if (navigator.mediaDevices === undefined) {
      navigator.menavigatordiaDevices = {}
    }
    // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
    // 使用getUserMedia，因为它会覆盖现有的属性。
    // 这里，如果缺少getUserMedia属性，就添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        let getUserMedia =
          navigator.webketGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
        }
        // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject)
        })
      }
    }
    const constraints = {
      audio: false,
      video: {
        width: videoWidth,
        height: videoHeight,
        transform: 'scaleX(-1)',
      },
    }
    Navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        if ('srcObject' in videoRef) {
          videoRef.srcObject = stream
        } else {
          videoRef.src = window.URL.createObjectURL(stream)
        }
        videoRef.onloadedmetadata = function (e) {
          console.log(e)
          videoRef.play()
        }
      })
      .catch((err) => {
        console.log(err)
        ElMessage.warning({
          message: '没有开启摄像头权限或浏览器版本不兼容',
        })
      })
  })
}

const drawImage = () => {
  Context.value.drawImage(videoRef, 0, 0, videoWidth, videoHeight)
  imgSrc = canvasRef.toDataURL('image/png')
}

const clearCanvas = (id) => {
  let c = document.getElementById(id)
  let cxt = c.getContext('2d')
  cxt.clearRect(0, 0, c.width, c.height)
}

const resetCanvas = () => {
  clearCanvas()
}

const stopNavigator = () => {
  if (videoRef && videoRef !== null) {
    videoRef.srcObject.getTrack()[0].stop()
    os = true
  }
}

const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
</script>

<style lang="less" scoped>
</style>