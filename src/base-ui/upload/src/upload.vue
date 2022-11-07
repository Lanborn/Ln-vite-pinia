<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="uploadInfo">
    <el-upload
      class="avatar-uploader"
      action="api/face/save"
      drag
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-remove="handleRemove"
    >
      <el-button type="primary">Click to upload</el-button>

      <!-- <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> -->
    </el-upload>
    <el-image
      v-if="imageUrl"
      style="width: 300px; height: 300px"
      :src="srcList[index]"
      :preview-src-list="srcList"
      :initial-index="0"
    />
    <div class="demo-progress">
      <!-- <el-tooltip effect="dark" :content="'颜值：' + beauty + '分'" placement="right">
        <el-progress :text-inside="true" type="dashboard" :percentage="beauty" :color="colors">
        </el-progress>
      </el-tooltip>
      <el-tag color="white" size="large" :hit="true" style="margin-right: 8px; font-size: 1.5rem"
        >{{ age }} 岁</el-tag
      >
      <el-tag color="white" size="large" :hit="true" style="margin-right: 8px; font-size: 1.5rem">{{
        Gender
      }}</el-tag> -->
      <div class="title">
        <h2>数据分析</h2>
      </div>
      <el-tooltip effect="dark" :content="'颜值：' + beauty + '分'" placement="right">
        <el-progress
          :text-inside="true"
          type="dashboard"
          :percentage="faceValue[index]?.beauty"
          :color="colors"
        >
        </el-progress>
      </el-tooltip>
      <el-tag color="white" size="large" :hit="true" style="margin-right: 8px; font-size: 1.5rem"
        >{{ faceValue[index]?.age }} 岁</el-tag
      >
      <el-tag color="white" size="large" :hit="true" style="margin-right: 8px; font-size: 1.5rem">{{
        faceValue[index]?.gender.type
      }}</el-tag>

      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="100"
        status="warning"
        :indeterminate="true"
        :duration="1"
      />
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="50"
        status="exception"
        :indeterminate="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { useMainStore } from '@/store/modules/main'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { colors } from '@/utils/getColor'

export default defineComponent({
  components: {
    Plus,
  },
  setup() {
    const main = useMainStore()
    let Gender = ref('Gender')
    let age = ref(0)
    let fullscreenLoading = ref(false)
    let beauty = ref(0)
    let imageUrl = ref(main.curImg)
    let srcList = computed(() => {
      return main.curImgUrls
    })
    // let srcList = ref(main.curImgUrls)
    let index = computed(() => {
      return main.index
    })
    let faceValue = computed(() => {
      return main.faceInfo
    })

    const format = (percentage: any) => (percentage === 100 ? 'Full' : `${percentage}%`)

    const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
      console.log(response)
      if (response.code !== 200) {
        ElMessage.error({
          type: 'error',
          center: true,
          showClose: true,
          message: response.data,
        })
      } else {
        ElMessage.success({
          type: 'success',
          center: true,
          showClose: true,
          message: '女留微信，男自强~',
        })
        imageUrl.value = URL.createObjectURL(uploadFile.raw!)
        beauty.value = Number(response.data.imgInfo.value)
        age.value = response.data.faceReuslt.result.face_list[0].age
        Gender.value =
          response.data.faceReuslt.result.face_list[0].gender.type === 'female' ? '靓女' : '帅哥'
        main.addImgUrls(response.data.imgInfo.imgUrl)
        main.getValueInfo(response.data.imgInfo)
        main.getDetailsInfo(response.data.valueDetails)
        main.getFaceInfo(response.data.faceReuslt.result.face_list[0])
        main.getValueInfoNow()
        main.$patch({
          index: main.length - 1,
        })
      }
    }

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
      const loadingInstance = ElLoading.service({
        fullscreen: true,
        text: '拼命加载中~',
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        loadingInstance.close()
        ElMessage.error('Avatar picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 / 1024 > 2) {
        loadingInstance.close()
        ElMessage.error('Avatar picture size can not exceed 3MB!')
        return false
      }
      loadingInstance.close()
      return true
    }

    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
    }

    return {
      main,
      imageUrl,
      colors,
      beauty,
      age,
      faceValue,
      index,
      Gender,
      srcList,
      fullscreenLoading,
      format,
      handleAvatarSuccess,
      beforeAvatarUpload,
      handleRemove,
    }
  },
})
</script>

<style scoped lang="less">
.uploadInfo {
  height: 20%;
  display: flex;
  justify-content: space-around;
  .avatar-uploader {
    display: block;
  }
  .title {
    text-align: center;
    // background: linear-gradient(to right, red, blue);
    // -webkit-background-clip: text;
    // color: transparent;
    background-image: linear-gradient(to right, orange, purple);
    -webkit-background-clip: text;
    color: transparent;
  }
}
.demo-progress {
  margin-left: 100px;
  background-color: transparent;
  // border: 1px solid hsla(0, 0%, 100%, 0.5);
  // padding-top: 12%;
  background: linear-gradient(to left, #2cd5ff, #2cd5ff) left top no-repeat,
    linear-gradient(to bottom, #2cd5ff, #2cd5ff) left top no-repeat,
    linear-gradient(to left, #2cd5ff, #2cd5ff) right top no-repeat,
    linear-gradient(to bottom, #2cd5ff, #2cd5ff) right top no-repeat,
    linear-gradient(to left, #2cd5ff, #2cd5ff) left bottom no-repeat,
    linear-gradient(to bottom, #2cd5ff, #2cd5ff) left bottom no-repeat,
    linear-gradient(to left, #2cd5ff, #2cd5ff) right bottom no-repeat,
    linear-gradient(to left, #2cd5ff, #2cd5ff) right bottom no-repeat;
  background-size: 4px 20px, 20px 4px, 4px 20px, 20px 4px;
  border: 1px solid #073f97;
  position: relative;

  height: 300px;
  color: whitesmoke;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .el-progress--line {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 350px;
}
</style>


