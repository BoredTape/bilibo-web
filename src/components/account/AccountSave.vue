<template>
  <div class="header">
    <el-button type="primary" @click="saveOperation">添加账号</el-button>
  </div>
  <el-dialog
    v-model="dialogQRCodeVisible"
    title="扫描二维码"
    width="288"
    :before-close="handleClose"
  >
    <el-image :src="url" fit="fill" />
    <el-row v-show="qrCodeError">
      <el-col :span="8">
        <el-text class="mx-1" type="danger">二维码失效</el-text>
      </el-col>
      <el-col :span="10">
        <el-link :icon="RefreshRight" @click="saveOperation">刷新</el-link>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts" setup>
import { saveAccount, qrCodeStatus } from '@/apis/account'
import { ref, defineExpose, inject } from 'vue'
import { useRequest } from 'vue-hooks-plus'
import { RefreshRight } from '@element-plus/icons-vue'

const dialogQRCodeVisible = ref(false)
const url = ref('')
const qrCodeId = ref('')
const qrCodeError = ref(false)

function getQrCodeStatus(): Promise<Number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      qrCodeStatus(qrCodeId.value).then((statusRes) => {
        if (statusRes.result == 0) {
          if (statusRes.data.status == 2) {
            dialogQRCodeVisible.value = false
          } else if (statusRes.data.status == 3) {
            qrCodeError.value = true
            cancel()
          }
          resolve(statusRes.data.status)
        }
      })
      resolve(0)
    }, 1000)
  })
}

const { data, runAsync, loading, cancel } = useRequest(() => getQrCodeStatus(), {
  manual: true,
  pollingInterval: 3000,
  pollingWhenHidden: false
})

const saveOperation = async () => {
  qrCodeError.value = false
  cancel()
  const res = await saveAccount()
  dialogQRCodeVisible.value = true
  url.value = res.data.url
  qrCodeId.value = res.data.id
  runAsync()
}

const listTrigger = inject('listTrigger') as () => void
const GetUserList = () => {
  listTrigger()
}

const handleClose = () => {
  dialogQRCodeVisible.value = false
  cancel()
  GetUserList()
}

defineExpose({ saveOperation })
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: row-reverse;
}
</style>
