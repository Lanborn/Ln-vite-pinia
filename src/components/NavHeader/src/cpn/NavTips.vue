<template>
  <div class="nav-dialog">
    <el-dialog v-model="isShow" width="30%">
      <template v-if="showFlag === 1">
        <h2>QQ</h2>
        <img src="src\assets\img\qq.jpg" alt="" />
      </template>
      <template v-else-if="showFlag === 2">
        <h2>WeChat</h2>
        <img src="src\assets\img\wechat.jpg" alt="" />
      </template>
      <template v-else-if="showFlag === 3">
        <p><i class="icon-wendang"></i><b>没事来看看博主的博客吧</b></p>
        <a href="http://blog.lanboc.cn">Here! Coder</a>
      </template>
      <template v-else-if="showFlag === 4">
        <h2>时间</h2>
        <iframe frameborder="0" width="100%" src="/page/run-time/index.html"></iframe
      ></template>
      <template v-else-if="showFlag === 5">
        <h2>留言板</h2>
        <iframe frameborder="0" height="650" width="700" src="/page/valine/index.html"></iframe>
      </template>

      <h3>和我一起来学习前端吧<i class="icon-yiqiguang"></i></h3>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'NavDialog',
  setup() {
    const isShow = ref(false)
    const showFlag = ref(1)
    return { isShow, showFlag }
  },
})
</script>

<style lang="less" scoped>
.nav-dialog {
  margin-top: 0%;
  padding: 0 10px;
  img {
    width: 90%;
  }
  i {
    font-family: 'iconfont';
    font-size: 25px;
  }
  b {
    font-size: 18px;
    margin-left: 10px;
  }
  a {
    color: #57606a;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
