<template>
  <vue-finder
    id="vuefinder"
    :request="request"
    :max-file-size="maxFileSize"
    :features="features"
    locale="zhCN"
    :path="path"
  />
</template>

<script lang="ts" setup>
import router from '@/router'
import { ref } from 'vue'

const request = {
  baseUrl: '/api/account/dir',
  params: { adapter: router.currentRoute.value.params.mid },

  // And/or transform request callback
  transformRequest: (req: any) => {
    return req
  }
}
const maxFileSize = ref('500MB')
const path = router.currentRoute.value.params.mid + '://'

const features = [
  // 'edit',
  // 'newfile',
  // 'newfolder',
  'preview',
  // 'archive',
  // 'unarchive',
  // 'search',
  // 'rename',
  // 'upload',
  // 'delete',
  // 'fullscreen',
  'download',
  'language'
]
</script>
<style lang="scss" scoped></style>
