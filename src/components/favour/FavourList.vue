<template>
  <el-table :data="tableData">
    <el-table-column prop="title" label="收藏夹名称" />
    <el-table-column prop="media_count" label="收藏夹媒体数" />
    <el-table-column label="同步状态">
      <template #default="scope">
        <el-switch
          v-model="scope.row.sync"
          :active-value="1"
          :inactive-value="0"
          @change="SetFavSync(scope.row.mlid, scope.row.sync)"
          size="large"
        />
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="query.page"
    v-model:page-size="query.page_size"
    :page-sizes="[10, 20, 50, 100]"
    layout="sizes, prev, pager, next"
    :total="total"
    @change="GetFavourList"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { setSyncFav, setNotSyncFav } from '@/apis/favour'

interface Folder {
  mlid: number
  fid: number
  title: string
  media_count: number
  sync: number
}

interface Props {
  fatherTableData: Folder[]
  fatherTotal: number
  fatherMid: number
}

const propsData = defineProps<Props>()
const tableData = ref<Folder[]>([])

const query = ref({
  page: 1,
  page_size: 10
})
const total = ref<number>(0)
const mid = ref<number>(0)

const GetFavourList = () => {
  tableData.value = propsData.fatherTableData.slice(
    (query.value.page - 1) * query.value.page_size,
    query.value.page * query.value.page_size
  )
}
const InitFavourList = () => {
  total.value = propsData.fatherTotal
  mid.value = propsData.fatherMid
  GetFavourList()
}

const SetFavSync = (mlid: number, targetSync: number) => {
  if (targetSync == 1) {
    setSyncFav({ mid: mid.value, mlid: mlid })
  } else {
    setNotSyncFav({ mid: mid.value, mlid: mlid })
  }
}

InitFavourList()
</script>
<style lang="scss" scoped></style>
