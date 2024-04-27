import { createRouter, createWebHistory } from 'vue-router'
import AccountView from '@/views/AccountView.vue'
import { VideoPlay, User, GobletSquareFull } from '@element-plus/icons-vue'

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
      path: '/fav_explorer/:mid',
      name: 'account_fav',
      component: () => import('@/views/FavourExplorerView.vue')
    },
    {
      path: '/videos',
      name: 'videos',
      meta: {
        icon: VideoPlay,
        name: '视频同步详情'
      },
      component: () => import('@/views/VideosView.vue')
    }
  ]
})

export default router
