<template>
  <div class="header">
    <el-button @click="jump">返回账号页</el-button>
  </div>
  <DirExplorer />
</template>
<script lang="ts" setup>
import router from '@/router'
import DirExplorer from '@/components/account/AccountDirExplorer.vue'
const jump = () => {
  router.push({ name: 'account' })
}
</script>

<style lang="scss" scoped></style>
