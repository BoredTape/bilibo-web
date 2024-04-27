<template>
  <div class="header">
    <el-button @click="jump">返回账号页</el-button>
  </div>
  <FavourExplorer />
</template>
<script lang="ts" setup>
import router from '@/router'
import FavourExplorer from '@/components/favour/FavourExplorer.vue'
const jump = () => {
  router.push({ name: 'account' })
}
</script>

<style lang="scss" scoped></style>
