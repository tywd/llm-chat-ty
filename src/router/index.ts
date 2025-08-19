import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: () => import('@/views/ChatView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('@/views/StatsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  next()
  // const authStore = useAuthStore()
  // if (to.meta.requiresAuth) {
  //   next('/login')
  // } else if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
  //   next('/')
  // } else {
  //   next()
  // }
})

export default router