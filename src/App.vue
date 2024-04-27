<template>
  <div id="home">
    <el-container>
      <el-header>
        <LayoutHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-affix>
            <LayoutMenu />
          </el-affix>
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/components/layout/HeaderLayout.vue'
import LayoutMenu from '@/components/layout/MenuLayout.vue'
</script>

<style lang="scss" scoped>
#home {
  min-height: 100vh;
}
.el-header {
  background-color: #2b2c44;
  padding: 0;
}

.el-aside {
  background-color: #2b2c44;
  min-height: calc(100vh - 60px);
}
</style>
