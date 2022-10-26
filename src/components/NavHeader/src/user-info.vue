<template>
  <div class="user-info">
    <div class="other-operate">
      <el-tooltip effect="light" content="QQ联系方式">
        <i @click="showDialogClic('qq')" class="icon-qq-line"></i>
      </el-tooltip>
      <el-tooltip effect="light" content="VX联系方式">
        <i @click="showDialogClic('weichat')" class="icon-weichat"></i>
      </el-tooltip>
      <el-tooltip effect="light" content="Github">
        <i @click="gotoGithub" class="icon-huaban881"></i>
      </el-tooltip>
      <el-tooltip effect="light" content="留言板">
        <i @click="showDialogClic('valine')" class="icon-gonggao1"></i>
      </el-tooltip>
      <el-tooltip effect="light" content="时间">
        <i @click="showDialogClic('runtime')" class="icon-tingchewei"></i>
      </el-tooltip>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="50" src="http://blog.lanboc.cn/logo.png"></el-avatar>
        <span class="user-name" style="margin-left: 30px">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><Close /></el-icon>
            退出登录
          </el-dropdown-item>
          <el-dropdown-item @click="gotoGithub">
            <el-icon><User /></el-icon>
            个人主页
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <nav-tips ref="navTipsRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import useStore from '@/store'
import { useRouter } from 'vue-router'
import NavTips from './cpn/NavTips.vue'

import localCache from '@/utils/cache'

export default defineComponent({
  components: {
    NavTips,
  },
  setup() {
    const { login } = useStore()
    const loginStore = login()
    const name = computed(() => loginStore.userInfo.username)

    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.replace('/login')
    }

    const gotoGithub = () => {
      window.location.href = 'https://github.com/Lanborn/Ln-vite-pinia/tree/develop'
    }

    const navTipsRef = ref<InstanceType<typeof NavTips>>()

    const showDialogClic = (flag: string) => {
      console.log(navTipsRef)

      navTipsRef.value!.isShow = true
      if (flag === 'qq') {
        navTipsRef.value!.showFlag = 1
      } else if (flag === 'weichat') {
        navTipsRef.value!.showFlag = 2
      } else if (flag === 'gonggao') {
        navTipsRef.value!.showFlag = 3
      } else if (flag === 'runtime') {
        navTipsRef.value!.showFlag = 4
      } else if (flag === 'valine') {
        navTipsRef.value!.showFlag = 5
      }
    }

    return {
      name,
      navTipsRef,
      gotoGithub,
      handleExitClick,
      showDialogClic,
    }
  },
})
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'iconfont';
  .other-operate {
    color: whitesmoke;
    font-size: 40px;
    margin-right: 10px;
    i {
      margin: 0 12px;
      user-select: none;
      cursor: pointer;
    }
  }
  .user-name {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 27px;
    background: linear-gradient(to right, #f0610e, #e8771a, #fff34a);
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 600;
  }
}
</style>
