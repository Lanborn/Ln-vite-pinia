<template>
  <div class="nav-header">
    <div class="content">
      <user-menu />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import UserMenu from './user-menu.vue'

export default defineComponent({
  components: {
    UserInfo,
    UserMenu,
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      handleFoldClick,
    }
  },
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
