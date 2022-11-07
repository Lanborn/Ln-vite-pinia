<template>
  <div class="login-panel">
    <h1 class="title">颜值PK系统</h1>
    <el-tabs @click="handleTabsClick" type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登陆</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="register">
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

    <div class="btn" v-if="isShow">
      <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
      <el-button type="primary" class="facelogin-btn" @click="handleFaceLogin">面容登陆</el-button>
    </div>
    <div class="Rbtn" v-else>
      <el-button type="primary" style="width: 100%; margin-top: 10px" @click="handleRegisterClick"
        >立即注册</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import SignInPanel from './signIn-panel.vue'
import router from '@/router/index'
import regFace from '../../../components/Face/src/regFace.vue'

export default defineComponent({
  components: {
    regFace,
    LoginAccount,
    SignInPanel,
  },
  setup() {
    const isKeepPassword = ref(false)
    const isShow = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>() // 获取组件对象的类型
    const signInRef = ref<InstanceType<typeof SignInPanel>>()
    const currentTab = ref<string>('account')
    const handleTabsClick = () => {
      if (currentTab.value === 'account') {
        isShow.value = true
      } else {
        isShow.value = false
      }
    }
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // 调用loginPhone 里面的登陆LoginAction
      }
    }
    const handleFaceLogin = () => {
      router.push('/face/login')
    }

    const handleRegisterClick = () => {
      if (currentTab.value === 'register') {
        signInRef.value?.registerAction()
      }
    }

    return {
      isKeepPassword,
      isShow,
      accountRef,
      signInRef,
      currentTab,
      handleTabsClick,
      handleLoginClick,
      handleFaceLogin,
      handleRegisterClick,
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
.btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.Rbtn {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.login-btn {
  width: 40%;
  margin-top: 10px;
}
.facelogin-btn {
  width: 40%;
  margin-top: 10px;
}
</style>
