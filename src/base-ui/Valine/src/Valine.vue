<template>
  <div class="comments" id="vcomments">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis molestias eius sapiente
    provident at porro, deserunt maiores earum. Veniam repellat quo autem sed alias libero odio ab
    ex sint unde?
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Valine from 'valine'
export default defineComponent({
  setup() {
    new Valine({
      el: '#vcomments',
      appId: 'cSTJqlT7PCzCo2B7f97KRpQ0-gzGzoHsz',
      appKey: 'dkXLrN8217L29nNVIYdvMHRT',
    })
    return {}
  },
})
</script>

<style scoped>
.comments {
  height: 100%;
  width: 100%;
  color: #fff;
}
</style>