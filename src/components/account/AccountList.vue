<template>
  <el-dialog v-model="dialogSettingsVisible" title="同步设置" :before-close="handleFavClose" :destroy-on-close="true">
    <AccountSettings 
    :fatherFavTableData="favDataRef" :fatherFavTotal="favCountRef"
    :fatherCollectedTableData="collectedDataRef" :fatherCollectedTotal="collectedTotalRef"
    :fatherMid="favMidRef" :fatherWatchLaterSync="watchLaterSyncRef" />
  </el-dialog>
  <el-table :data="tableData">
    <!-- <el-table-column prop="mid" label="id" /> -->
    <el-table-column prop="uname" label="用户名" />
    <el-table-column label="头像">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-avatar :src="scope.row.face" />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template #default="scope">
        <el-button type="success" v-if="scope.row.status == 0">正常</el-button>
        <el-button type="warning" v-if="scope.row.status == 1">登陆态失效</el-button>
        <el-button type="danger" v-if="scope.row.status == 2">账号异常</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="watch_later_count" label="稍后再看数量" />
    <el-table-column prop="folders_count" label="收藏夹数量" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-row>
        <el-button size="small" @click="JumpDirExplorer(scope.row.mid)">查看文件夹</el-button>
        </el-row>
        <el-row>
        <el-button
          size="small"
          @click="ShowSettings(scope.row.mid, scope.row.folders, scope.row.folders_count, scope.row.collected, scope.row.collected_count, scope.row.watch_later_sync)"
          >同步设置</el-button
        >
      </el-row>
      <el-divider />
      <el-row>
        <el-button
          size="small"
          @click="saveOperation()"
          v-if="scope.row.status == 2 || scope.row.status == 1"
        >
          重新登陆
        </el-button>
      </el-row>
      <el-row>
        <el-button  type="danger" size="small" @click="deleteOperation(scope.row)">删除</el-button>
      </el-row>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="query.page"
    v-model:page-size="query.page_size"
    :page-sizes="[10, 20, 50, 100]"
    layout="sizes, prev, pager, next"
    :total="total"
    @change="GetUserList"
  />
</template>

<script lang="ts" setup>
import { getAccountList, delAccount } from '@/apis/account'
import type ElTable from 'element-plus/es/components/table'
import { ref, inject, defineExpose } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import AccountSettings from '@/components/account/AccountSettings.vue'
import router from '@/router'

const query = ref({
  page: 1,
  page_size: 10
})
const total = ref<number>(0)
const deleteOperation = (row: User) => {
  ElMessageBox.confirm(
    '删除账号：  ' + row.uname + '  ，删除后本地已同步视频保留，但收藏夹不会再同步视频。是否继续？',
    '提示',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      delAccount({ mid: row.mid }).then((rsp) => {
        if (rsp.result === 0) {
          ElMessage({
            type: 'success',
            message: '已删除'
          })
          GetUserList()
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消'
      })
    })
}

interface Folder {
  mlid: number
  fid: number
  title: string
  media_count: number
  sync: number
}

interface Collected{
  coll_id:number
  title:string
  media_count: number
  sync: number
}

interface User {
  mid: number
  status: number
  face: string
  uname: string
  folders_count: number
  folders: Folder[]
  collected: Collected[]
  collected_count: number
  watch_later_count: number
  watch_later_sync: number
}

const tableData = ref<User[]>([])

const GetUserList = async () => {
  const res = await getAccountList(query.value)
  tableData.value = res.data.items
  total.value = res.data.total
}
defineExpose({ GetUserList })

const saveTrigger = inject('saveTrigger') as () => void
const saveOperation = () => {
  saveTrigger()
}

GetUserList()

const favDataRef = ref<Folder[]>([])
const favCountRef = ref<number>(0)

const collectedDataRef = ref<Collected[]>([])
const collectedTotalRef = ref<number>(0)

const favMidRef = ref<number>(0)
const watchLaterSyncRef = ref<number>(0)

const dialogSettingsVisible = ref(false)
const ShowSettings = (
  favMid: number, 
  favData: Folder[], favCount: number,
  collectedData: Collected[], collectedTotal: number,
  watchLaterSync:number
) => {
  favDataRef.value = favData
  favCountRef.value = favCount

  collectedDataRef.value = collectedData
  collectedTotalRef.value = collectedTotal

  favMidRef.value = favMid
  watchLaterSyncRef.value = watchLaterSync
  dialogSettingsVisible.value = true
}

const handleFavClose = () => {
  dialogSettingsVisible.value = false
  GetUserList()
}

const JumpDirExplorer = (mid: number) => {
  router.push({ name: 'account_dir', params: { mid: mid } })
}
</script>
<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
