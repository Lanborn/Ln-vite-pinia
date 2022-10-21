<template>
  <div class="login-panel">
    <h1 class="title">颜值PK系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登陆</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 注册账号</span>
        </template>
        <sign-in-panel ref="signInRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import SignInPanel from './signIn-panel.vue'

export default defineComponent({
  components: {
    LoginAccount,
    SignInPanel,
  },
  setup() {
    const isKeepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>() // 获取组件对象的类型
    const signInRef = ref<InstanceType<typeof SignInPanel>>()
    const currentTab = ref<string>('account')
    const handleLoginClick = () => {}

    return {
      isKeepPassword,
      accountRef,
      signInRef,
      currentTab,
      handleLoginClick,
    }
  },
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
    color: #fff;
  }
}
.account-control {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
