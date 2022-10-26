<template>
  <div class="userMenu">
    <div class="other-operate">
      <el-tooltip effect="light" content="排行榜">
        <el-icon @click="handleClick('Rank')"><List /></el-icon>
      </el-tooltip>
      <el-tooltip effect="light" content="匹配对手">
        <el-icon @click="handleClick('match')"><Aim /></el-icon>
      </el-tooltip>
    </div>

    <nav-dialog ref="NavDialogRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavDialog from '@/components/NavHeader/src/cpn/NavDialog.vue'

export default defineComponent({
  components: {
    NavDialog,
  },
  setup() {
    const size = 40
    const color = 'whitesmoke'

    const NavDialogRef = ref<InstanceType<typeof NavDialog>>()

    const handleClick = (tip: string) => {
      NavDialogRef.value!.isShowWhat = true

      if (tip === 'Rank') {
        NavDialogRef.value!.showDialog = 1
      } else if (tip === 'match') {
        NavDialogRef.value!.showDialog = 2
      }
    }
    return {
      size,
      color,
      NavDialogRef,
      handleClick,
    }
  },
})
</script>

<style scoped lang="less">
.userMenu {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'iconfont';
  .other-operate {
    color: whitesmoke;
    font-size: 40px;
    margin-right: 10px;
    i {
      margin: 0 15px;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>