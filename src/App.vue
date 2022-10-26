<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ref } from 'vue'
const fullscreenLoading = ref(false)
</script>

<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>


<style>
.app {
  height: 100%;
}
</style>
