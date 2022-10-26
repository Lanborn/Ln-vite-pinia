<template>
  <div class="demo-progress">
    <el-tooltip effect="dark" :content="'颜值：' + beauty + '分'" placement="right">
      <el-progress :text-inside="true" type="dashboard" :percentage="beauty" :color="colors">
      </el-progress>
    </el-tooltip>
    <el-tag color="white" size="large" :hit="true" style="margin-right: 8px; font-size: 1.5rem"
      >{{ age }} 岁</el-tag
    >
    <el-tag color="white" size="large" :hit="true" style="margin-right: 8px; font-size: 1.5rem">{{
      Gender
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  setup() {
    return {}
  },
})
</script>

<style scoped>
.demo-progress {
  margin-left: 100px;
  background-color: transparent;
  border: 10px solid hsla(0, 0%, 100%, 0.5);
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