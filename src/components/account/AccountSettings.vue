<template>
    <el-row>
      <el-col>
        <el-text size="large">稍后再看</el-text>
      </el-col>
      <el-col>
        <el-switch
          v-model="watchLaterSync"
          :active-value="1"
          :inactive-value="0"
          @change="SetWatchLaterSync()"
          size="large"
        />
      </el-col>
    </el-row>

    <el-divider />

    <el-row>
      <el-col>
        <el-text size="large">收藏夹列表</el-text>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="favTableData">
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
          v-model:current-page="favQuery.page"
          v-model:page-size="favQuery.page_size"
          :page-sizes="[10, 20, 50, 100]"
          layout="sizes, prev, pager, next"
          :total="favTotal"
          @change="GetFavourList"
        />
      </el-col>
    </el-row>

    <el-divider />

    <el-row>
      <el-col>
        <el-text size="large">收藏和订阅列表</el-text>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="collectedTableData">
          <el-table-column prop="title" label="收藏和订阅名称" />
          <el-table-column prop="media_count" label="收藏和订阅媒体数" />
          <el-table-column label="同步状态">
            <template #default="scope">
              <el-switch
                v-model="scope.row.sync"
                :active-value="1"
                :inactive-value="0"
                @change="SetCollectedSync(scope.row.coll_id, scope.row.sync)"
                size="large"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="collectedQuery.page"
          v-model:page-size="collectedQuery.page_size"
          :page-sizes="[10, 20, 50, 100]"
          layout="sizes, prev, pager, next"
          :total="collectedTotal"
          @change="GetCollectedList"
        />
      </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { setSyncFav, setNotSyncFav } from '@/apis/favour'
import { setSyncWatchLater, setNotSyncWatchLater } from '@/apis/watch_later'
import { setSyncCollected, setNotSyncCollected } from '@/apis/collected'

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

interface Props {
  fatherFavTableData: Folder[]
  fatherFavTotal: number
  fatherCollectedTableData: Collected[]
  fatherCollectedTotal: number
  fatherMid: number
  fatherWatchLaterSync: number
}

const propsData = defineProps<Props>()

const favTableData = ref<Folder[]>([])
const favQuery = ref({
  page: 1,
  page_size: 10
})
const favTotal = ref<number>(0)
const GetFavourList = () => {
  if (propsData.fatherFavTotal == 0) return
  favTableData.value = propsData.fatherFavTableData.slice(
    (favQuery.value.page - 1) * favQuery.value.page_size,
    favQuery.value.page * favQuery.value.page_size
  )
}


const collectedTableData = ref<Collected[]>([])
const collectedQuery = ref({
  page: 1,
  page_size: 10
})
const collectedTotal = ref<number>(0)
const GetCollectedList = () => {
  if (propsData.fatherCollectedTotal == 0) return
  collectedTableData.value = propsData.fatherCollectedTableData.slice(
    (collectedQuery.value.page - 1) * collectedQuery.value.page_size,
    collectedQuery.value.page * collectedQuery.value.page_size
  )
}

const mid = ref<number>(0)
const watchLaterSync = ref<number>(0)


const InitSettings = () => {
  mid.value = propsData.fatherMid
  watchLaterSync.value = propsData.fatherWatchLaterSync

  collectedTotal.value = propsData.fatherCollectedTotal
  GetCollectedList()

  favTotal.value = propsData.fatherFavTotal
  GetFavourList()
}

const SetFavSync = (mlid: number, targetSync: number) => {
  if (targetSync == 1) {
    setSyncFav({ mid: mid.value, mlid: mlid })
  } else {
    setNotSyncFav({ mid: mid.value, mlid: mlid })
  }
}

const SetCollectedSync = (coll_id: number, targetSync: number) => {
  if (targetSync == 1) {
    setSyncCollected({ mid:mid.value, coll_id: coll_id })
  } else {
    setNotSyncCollected({ mid:mid.value, coll_id: coll_id })
  }
}

const SetWatchLaterSync = () => {
  if (watchLaterSync.value == 1) {
    setSyncWatchLater({ mid: mid.value })
  } else {
    setNotSyncWatchLater({ mid: mid.value })
  }
}

InitSettings()
</script>
<style lang="scss" scoped></style>
