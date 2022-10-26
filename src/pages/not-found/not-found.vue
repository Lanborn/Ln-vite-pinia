<template>
  <div>
    <ln-valine />
    <h2>Not Found</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LnValine from '@/base-ui/Valine/index'
export default defineComponent({
  components: {
    LnValine,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
