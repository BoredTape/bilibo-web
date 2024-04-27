<template>
  <div class="videos">
    <el-tabs type="card">
      <el-tab-pane label="待同步"><VideoList :status="0" /></el-tab-pane>
      <el-tab-pane label="正在同步"><VideoList :status="1" /></el-tab-pane>
      <el-tab-pane label="同步完成"><VideoList :status="2" /></el-tab-pane>
      <el-tab-pane label="同步失败"><VideoList :status="3" /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import VideoList from '@/components/video/VideoList.vue'
</script>

<style lang="scss" scoped></style>
