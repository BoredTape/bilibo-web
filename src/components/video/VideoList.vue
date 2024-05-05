<template>
  <el-table :data="tableData">
    <el-table-column prop="account_name" label="用户" />
    <el-table-column prop="source_title" label="源" />
    <el-table-column prop="title" label="视频标题" />
    <el-table-column prop="part" label="分P" />
    <el-table-column label="状态" v-if="status == 3">
      <template #default="scope">
        <el-button type="warning" v-if="scope.row.status == 3">待重试</el-button>
        <el-button type="danger" v-if="scope.row.status == 4">失败</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="query.page"
    v-model:page-size="query.page_size"
    :page-sizes="[10, 20, 50, 100]"
    layout="sizes, prev, pager, next"
    :total="total"
    @change="GetVideoList"
  />
</template>

<script lang="ts" setup>
import { getVideoList } from '@/apis/video'
import { ref } from 'vue'

interface Props {
  status: number
}
const propsData = defineProps<Props>()

const query = ref({
  page: 1,
  page_size: 10,
  status: propsData.status
})
const total = ref<number>(0)

interface Video {
  part: string
  title: string
  bvid: string
  status: number
  mlid: number
  source_title: string
  mid: number
  account: number
  type: number
}

const tableData = ref<Video[]>([])

const GetVideoList = async () => {
  const res = await getVideoList(query.value)
  tableData.value = res.data.items
  total.value = res.data.total
}

GetVideoList()
</script>
