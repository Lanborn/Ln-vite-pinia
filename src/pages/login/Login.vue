<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLoginStore } from '@/store/modules/login'
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  components: {
    LoginPanel,
  },
  setup() {
    const loginStore = useLoginStore()

    return {
      loginStore,
    }
  },
})
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background: url('../../assets/img/bg.gif'); */
  background: url('https://jiangly.com/_nuxt/img/banner_111.a6be22c.gif');
  background-size: cover;
  background-color: #000;
}
</style>
