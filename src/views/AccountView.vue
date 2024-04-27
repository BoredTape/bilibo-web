<template>
  <div id="users">
    <el-card>
      <AccountSave ref="accountSave" />
      <AccountList ref="accountList" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import AccountSave from '@/components/account/AccountSave.vue'
import AccountList from '@/components/account/AccountList.vue'
import { provide, ref } from 'vue'

const accountSave = ref<InstanceType<typeof AccountSave>>()
const saveTrigger = () => {
  accountSave.value?.saveOperation()
}
provide('saveTrigger', saveTrigger)

const accountList = ref<InstanceType<typeof AccountList>>()
const listTrigger = () => {
  accountList.value?.GetUserList()
}
provide('listTrigger', listTrigger)
</script>
<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
}
</style>
