<template>
  <div class="nav-dialog">
    <el-dialog v-model="isShowWhat" width="33%">
      <template v-if="showDialog === 1">
        <h2>Rank 榜</h2>
        <rank class="rank" />
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Rank from '@/components/Rank/index'

export default defineComponent({
  name: 'NavDiglog',
  components: {
    Rank,
  },
  setup() {
    const isShowWhat = ref(false)
    const showDialog = ref(1)
    return {
      isShowWhat,
      showDialog,
    }
  },
})
</script>

<style scoped lang="less">
.nav-dialog {
  margin-top: 0%;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  //   .rank {
  //     width: 57%;
  //   }
}
</style>