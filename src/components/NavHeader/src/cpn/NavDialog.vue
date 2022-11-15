<template>
  <div class="nav-dialog">
    <el-dialog v-model="isShowWhat" width="33%">
      <template v-if="showDialog === 1">
        <h2>Rank 榜</h2>
        <rank class="rank" />
      </template>
      <template v-else-if="showDialog === 2">
        <h2>匹配对手</h2>
        <el-input
          class="match_input"
          v-model="home_id"
          maxlength="4"
          placeholder="Please input home number"
          type="number"
          show-word-limit
          @blur="handleBlur"
        ></el-input>
        <el-button type="primary" @click="handleMatch()"> 组队匹配</el-button>
        <el-button type="primary" @click="handleSoloMatch()">单排SOLO</el-button>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Home name</span>
            </div>
          </template>

          <div v-for="(item, index) in room_list" :key="index" class="text item">
            <el-descriptions border title="Home Tags">
              <el-descriptions-item label="🌈 HomeId"> {{ item.roomId }}</el-descriptions-item>
              <el-descriptions-item label="🍑 HomeName">{{ item.name }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed } from 'vue'
import Rank from '@/components/Rank/index'
import router from '@/router'
import localCache from '@/utils/cache'
import { useMatchStore } from '@/store/modules/match'

export default defineComponent({
  name: 'NavDiglog',
  components: {
    Rank,
  },
  created() {
    this.match.getRoomList()
  },
  setup() {
    const isShowWhat = ref(false)
    const showDialog = ref(1)
    const match = useMatchStore()
    const home_id = ref(match.home_id)
    let room_list = computed(() => {
      return match.roomList
    })

    const handleMatch = () => {
      isShowWhat.value = false
      match.matchPeople = 4
      // match.joinRoomAction(home_id.value, localCache.getSessionCache('userInfo').username)
      router.push('/chat/match')
    }
    const handleBlur = () => {
      match.home_id = home_id.value
    }
    const handleSoloMatch = () => {
      isShowWhat.value = false
      match.matchPeople = 2
      match.joinRoomAction({
        roomId: match.home_id,
        userId: localCache.getSessionCache('userInfo').id,
      })
      router.push('/chat/match')
    }
    onBeforeMount(() => {})
    return {
      isShowWhat,
      showDialog,
      home_id,
      room_list,
      match,
      handleMatch,
      handleSoloMatch,
      handleBlur,
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
  .match_input {
    width: 400px;
    margin: 20px;
  }
  //   .rank {
  //     width: 57%;
  //   }
}
</style>