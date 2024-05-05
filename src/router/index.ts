import { createRouter, createWebHistory } from 'vue-router'
import AccountView from '@/views/AccountView.vue'
import { VideoPlay, User, GobletSquareFull,Cpu } from '@element-plus/icons-vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/account'
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: {
        icon: User,
        name: '账号列表'
      }
    },
    {
      path: '/dir_explorer/:mid',
      name: 'account_dir',
      component: () => import('@/views/DirExplorerView.vue')
    },
    {
      path: '/videos',
      name: 'videos',
      meta: {
        icon: VideoPlay,
        name: '视频同步详情'
      },
      component: () => import('@/views/VideosView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      meta: {
        icon: Cpu,
        name: '任务详情'
      },
      component: () => import('@/views/TaskView.vue')
    }
  ]
})

export default router
