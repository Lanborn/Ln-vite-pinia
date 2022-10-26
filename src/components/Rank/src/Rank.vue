<template>
  <div class="rank">
    <el-table :row-class-name="tableRowClassName" border :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="beauty" label="颜值" width="80" />
      <el-table-column align="center" prop="age" label="年龄" width="80" />
      <el-table-column align="center" prop="gender" label="Gender" width="80" />
      <el-table-column align="center" prop="emotion" label="表情" width="180" />
      <el-table-column align="center" prop="glass" label="眼镜" width="100" />
      <el-table-column align="center" label="人物照片" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image
              style="width: 100px; height: 100px; text-align: center"
              :src="scope.row.url"
              fit="cover"
              @error="handleError(scope)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, watch } from 'vue'
import { useMainStore } from '@/store/modules/main'

export default defineComponent({
  setup() {
    const main = useMainStore()
    interface Data {
      beauty: number
      age: number
      gender: string
      emotion: string
      glass: string
      url: string
    }
    let tableData = computed(() => {
      return main.getDetails
    })

    onBeforeMount(() => {
      // console.log(tableData)
      // console.log(main.getDetails)
    })

    const tableRowClassName = ({ row, rowIndex }: { row: Data; rowIndex: number }) => {
      if (rowIndex === 0) {
        return 'first-row'
      } else if (rowIndex === 1) {
        return 'second-row'
      } else if (rowIndex === 2) {
        return 'third-row'
      }
    }
    const handleError = (scope: any) => {
      console.log(scope)
    }

    return {
      tableData,
      handleError,
      tableRowClassName,
    }
  },
})
</script>

<style scoped>
.rank {
  width: 100%;
  display: flex;
  justify-content: center;
}
.el-table .first-row {
  background: #000;
}
</style>