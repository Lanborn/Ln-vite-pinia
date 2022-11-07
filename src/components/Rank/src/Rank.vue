<template>
  <div class="rank">
    <div class="tips">
      <el-button @click="handleNowRank" type="primary">今日排行</el-button>
      <el-button @click="handleNewRank" type="danger">最新排行榜</el-button>
      <el-button @click="handleSevenRank" type="info">近7天排行榜</el-button>
    </div>
    <el-table :row-class-name="tableRowClassName" border :data="tableData" style="width: 100%">
      <el-table-column align="center" width="80" label="名次">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="value" label="颜值" width="80" />
      <el-table-column align="center" prop="age" label="年龄" width="80" />
      <el-table-column align="center" prop="gender" label="Gender" width="80" />
      <el-table-column align="center" prop="emotion" label="表情" width="100" />
      <el-table-column align="center" prop="glass" label="眼镜" width="100" />
      <el-table-column align="center" label="人物照片" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image
              style="width: 100px; height: 100px; text-align: center"
              :src="scope.row.imgUrl"
              fit="cover"
              @error="handleError(scope)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <slot name="footer">
        <el-pagination
          :hide-on-single-page="false"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:currentPage="page.pageNum"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue'
import { useMainStore } from '@/store/modules/main'
import { compare } from '@/utils/ArraySort'

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

    let page = computed(() => {
      return main.getPageInfo
    })

    let pageParmas = ref({
      pageSize: 10,
      pageNo: 1,
    })

    console.log(page)

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

    const handleNewRank = () => {
      main.getValueInfoNow()
      main.detailsInfo = main.valueInfoToday.sort(compare('value'))
    }
    const handleNowRank = () => {}

    const handleSevenRank = () => {
      main.getValueInfoSeven()
    }

    const handleSizeChange = (val: number) => {
      main.pageParmas.pageSize = val
      main.getValueInfoNow()
      main.getValueInfoSeven()
    }
    const handleCurrentChange = (val: number) => {
      main.pageParmas.pageNo = val
      // main.getValueInfoNow()
      main.getValueInfoSeven()
      console.log('123', val)
      // console.log('page ', page)
    }

    return {
      tableData,
      page,
      handleError,
      tableRowClassName,
      handleNewRank,
      handleNowRank,
      handleSevenRank,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>

<style scoped>
.rank {
  width: 100%;
  /* display: flex; */
  /* justify-content: center; */
}
.tips {
  margin-top: 0%;
}
.el-table .first-row {
  background: #000;
}
</style>