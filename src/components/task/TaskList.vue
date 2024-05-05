<template>
    <el-table :data="tableData">
      <el-table-column prop="name" label="任务名称" />
      <el-table-column label="任务类型">
        <template #default="scope">
        <el-text v-if="scope.row.type == 1">周期</el-text>
        <el-text v-if="scope.row.type == 2">账号实时</el-text>
      </template>
      </el-table-column>
      <el-table-column prop="last_running_at" label="上次执行时间" />
      <el-table-column prop="next_running_at" label="下次执行时间" />
    </el-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { getTaskList } from '@/apis/task'

interface Task {
  task_id: string
  name: string
  last_running_at: string
  next_running_at: string
  type: number
}

const tableData = ref<Task[]>([])

const GetTaskList = async () => {
  const res = await getTaskList()
  tableData.value = res.data
}

GetTaskList()

</script>
<style lang="scss" scoped></style>