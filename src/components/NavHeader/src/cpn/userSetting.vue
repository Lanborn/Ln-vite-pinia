<template>
  <div class="box">
    <el-dialog width="20%" title="个人信息修改" v-model="visible">
      <el-form ref="userSetForm" :model="userData" :rules="rules" label-width="100px">
        <el-form-item label="账号" prop="username">
          <el-input validate-event v-model="userData.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input validate-event v-model="userData.password" show-password />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number validate-event v-model="userData.age" :min="1" :max="100" />
        </el-form-item>
        <el-form-item label="真名" prop="realname">
          <el-input validate-event v-model="userData.realname" />
        </el-form-item>
        <el-form-item label="性别">
          <el-switch
            size="large"
            v-model="flag"
            inline-prompt
            active-text="♂"
            inactive-text="♀"
            @change="handleSwitchChange"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input validate-event v-model="userData.email" />
        </el-form-item>
        <el-form-item class="btn">
          <el-button
            style="margin-top: 10px; margin-right: 20px"
            type="primary"
            @click="updateUserAction()"
            >更新信息</el-button
          >
          <reg-face />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useLoginStore } from '@/store/modules/login/index'
import { rules } from '@/pages/login/config/account-config'
import { ElForm, ElMessage } from 'element-plus'
import regFace from '@/components/Face/src/regFace.vue'

export default defineComponent({
  components: {
    regFace,
  },
  setup() {
    const store = useLoginStore()
    const userSetForm = ref<InstanceType<typeof ElForm>>()
    let visible = ref(false)
    let flag = ref(false)
    let userData = ref(store.userInfo)

    const handleSwitchChange = (e: boolean) => {
      flag.value = e
      if (e) {
        userData.value.sex = 1

        console.log(userData)
      } else {
        userData.value.sex = 0
        console.log(userData)
      }
    }
    const showDialog = () => {
      visible.value = true
    }

    const regFaceInfo = () => {}

    const updateUserAction = () => {
      console.log(123123)
      store.updateUserAction(userData.value)
      visible.value = false
    }
    return {
      store,
      visible,
      rules,
      flag,
      userData,
      handleSwitchChange,
      updateUserAction,
      showDialog,
    }
  },
})
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  .btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>