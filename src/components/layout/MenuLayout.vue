<template>
  <div id="menu">
    <el-menu
      active-text-color="#fff"
      background-color="#2b2c43"
      :default-active="defaultActive"
      text-color="#babccd"
      router
    >
      <component :is="ElMenuItem" v-for="item in menulist" :key="item.id" :index="item.index">
        <span>
          <el-icon v-if="item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </span>
      </component>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { ElMenuItem } from 'element-plus'
import type { Component } from 'vue'

interface MenuItem {
  name: string
  id: number
  index: string
  icon: Component
}

const menulist: MenuItem[] = []

router.getRoutes().forEach((item, itemId) => {
  if (item.meta && item.meta.name) {
    menulist.push({
      name: item.meta.name as string,
      id: itemId,
      index: item.path,
      icon: item.meta.icon as Component
    })
  }
})

let defaultActive = ref<string>(window.location.pathname)
if (defaultActive.value === '/') {
  defaultActive = ref<string>('/account')
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
