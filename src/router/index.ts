import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue'), // 注意这里要带上 文件后缀.vue
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/pages/main/main.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/pages/not-found/not-found.vue'),
  },
  {
    path: '/face/login',
    name: 'faceLogin',
    component: () => import('@/pages/login/faceLogin.vue'),
  },
  {
    path: '/chat/match',
    name: 'chatMatch',
    component: () => import('@/pages/chat/chat.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.path !== '/login' && to.path !== '/face/login') {
    const token = localCache.getSessionCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
