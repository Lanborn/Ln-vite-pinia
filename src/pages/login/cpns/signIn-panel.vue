<template>
  <el-form :model="registerInfo" :rules="rules" label-width="60px">
    <el-form-item label="账号" prop="username">
      <el-input v-model="registerInfo.username" />
    </el-form-item>
    <el-form-item label="密码" prop="username">
      <el-input v-model="registerInfo.password" />
    </el-form-item>
    <el-form-item label="真名" prop="realname">
      <el-input v-model="registerInfo.realname" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerInfo.email" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const registerInfo = reactive({
      username: '',
      password: '',
      age: 0,
      realname: '',
      sex: 0,
      email: '',
    })
    return {
      registerInfo,
      rules,
    }
  },
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
