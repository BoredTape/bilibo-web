<template>
  <div class="videos">
    <el-tabs type="card" v-model="activate">
      <el-tab-pane label="待同步" name="toBeSync" :key="'toBeSync'">
        <VideoList :status="0" v-if="activate == 'toBeSync'" />
      </el-tab-pane>
      <el-tab-pane label="正在同步" name="syncing" :key="'syncing'">
        <VideoList :status="1" v-if="activate == 'syncing'" />
      </el-tab-pane>
      <el-tab-pane label="同步完成" name="synced" :key="'synced'" >
        <VideoList :status="2" v-if="activate == 'synced'" />
      </el-tab-pane>
      <el-tab-pane label="同步失败" name="syncFail" :key="'syncFail'" >
        <VideoList :status="3" v-if="activate == 'syncFail'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import VideoList from '@/components/video/VideoList.vue'
import { ref } from 'vue';

const activate = ref('toBeSync')
</script>

<style lang="scss" scoped></style>
