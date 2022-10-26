<template>
  <div class="display-info">
    <el-carousel
      type="card"
      :autoplay="false"
      height="300px"
      ref="carousel"
      @change="handleCardChange"
      :initial-index="index"
    >
      <el-carousel-item name="item.id" v-for="(item, index) in main.valueInfo" :key="index">
        <el-image style="width: 300px; height: 300px" :src="item.imgUrl" fit="cover" />
        <h3>{{ main.faceInfo[index].age }}</h3>
        <h3>{{ main.faceInfo[index].age }}</h3>
        <h3>{{ main.faceInfo[index].age }}</h3>
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useMainStore } from '@/store/modules/main'

export default defineComponent({
  setup() {
    const carousel = ref<HTMLFormElement>()
    const main = useMainStore()
    let index = computed(() => {
      return main.index
    })
    const handleCardChange = (e: number) => {
      console.log(e)
      // main.cardIndex = e
      main.$patch({
        index: e,
        curImg: main.curImgUrls[e],
      })
    }
    return {
      index,
      carousel,
      main,
      handleCardChange,
    }
  },
})
</script>

<style scoped>
.display-info {
  height: 100%;
  width: 50%;
  /* width: 70%; */
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>