<template>
  <div>test</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { useMainStore } from '@/store/modules/main'
export default defineComponent({
  setup() {
    const main = useMainStore()
    main.getVueReqList()

    // axios.get('http://localhost:3333/api/list').then((res) => {
    //   console.log('axios', res)
    // })
    return {}
  },
})
</script>

<style scoped></style>
