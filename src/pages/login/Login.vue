<template>
  <div class="login"></div>
  <test-demo />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import testDemo from '@/components/testDemo.vue'
import { useLoginStore } from '@/store/modules/login'
export default defineComponent({
  components: {
    testDemo,
  },
  setup() {
    const loginStore = useLoginStore()
    console.log(loginStore)

    return {
      loginStore,
    }
  },
})
</script>

<style scoped></style>
