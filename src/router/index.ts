/**
 *
 * @author:ChenDW
 * @date:2023-01-07 14:14
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { localCache } from '@/utils/cache';
import { LOGIN_USER_TOKEN } from '@/constant';
import NProgress from '@/config/nprogress';
import { firstMenu } from '@/utils/menu';
import { LOGIN_URL } from '@/config/config';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/not-found/not-found.vue')
  }

];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from) => {
  NProgress.start();
  const token = localCache.getCache(LOGIN_USER_TOKEN);
  if (to.path.startsWith('/main') && !token) {
    return LOGIN_URL;
  }
  if (to.path === '/main') {
    return firstMenu.url;
  }
  if (to.path === '/login' && token) {
    return "/main";
  }
});

router.afterEach(() => {
  NProgress.done();
});

router.onError(error => {
  NProgress.done();
  console.warn('路由错误', error.message);
});
export default router;
