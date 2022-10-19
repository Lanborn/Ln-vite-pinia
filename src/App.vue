<script setup lang="ts">
</script>

<template>
  <div class="app">
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
