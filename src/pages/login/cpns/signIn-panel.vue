<template>
  <el-form ref="registerFormRef" :model="registerInfo" :rules="rules" label-width="60px">
    <el-form-item label="账号" prop="username">
      <el-input v-model="registerInfo.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registerInfo.password" show-password />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input-number v-model="registerInfo.age" :min="1" :max="100" />
    </el-form-item>
    <el-form-item label="真名" prop="realname">
      <el-input v-model="registerInfo.realname" />
    </el-form-item>
    <el-form-item label="性别">
      <el-switch
        size="large"
        v-model="flag"
        inline-prompt
        active-text="♂"
        inactive-text="♀"
        @change="handleSwitchChange"
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerInfo.email" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { useLoginStore } from '@/store/modules/login/index'
import { ElForm, ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const registerFormRef = ref<InstanceType<typeof ElForm>>()
    const registerInfo = reactive({
      username: '',
      password: '',
      age: 0,
      realname: '',
      sex: 0,
      email: '',
    })
    const flag = ref(false)
    const store = useLoginStore()
    const handleSwitchChange = (e: any) => {
      flag.value = e
      if (e) {
        registerInfo.sex = 1

        console.log(registerInfo)
      } else {
        registerInfo.sex = 0
        console.log(registerInfo)
      }
    }

    const registerAction = () => {
      registerFormRef.value?.validate((valid: boolean) => {
        if (valid) {
          store.registerUserAction(registerInfo)
          registerFormRef.value?.resetFields()
        } else {
          ElMessage({
            message: '请输入正确的注册信息',
            type: 'error',
          })
        }
      })
    }

    return {
      registerFormRef,
      registerInfo,
      rules,
      flag,
      handleSwitchChange,
      registerAction,
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
