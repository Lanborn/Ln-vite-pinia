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
import { defineComponent, ref } from 'vue'
import { useMainStore } from '@/store/modules/main'
import NavHeader from '@/components/NavHeader/index'
import localCache from '@/utils/cache'
import LnUpload from '@/base-ui/upload/index'
import LnCar from '@/base-ui/Car/index'

export default defineComponent({
  components: {
    NavHeader,
    LnUpload,
    LnCar,
  },
  setup() {
    const main = useMainStore()
    main.getValueInfoNow()
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }

    return {
      main,
      isCollapse,
      handleFoldChange,
    }
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