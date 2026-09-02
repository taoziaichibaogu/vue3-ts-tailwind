import type { RouteRecordRaw } from 'vue-router';
import { TEXTS } from '@/constants/text';

export const routes: RouteRecordRaw[] = [
  // Backward compatible path: avoid 404 when user still opens /about from history/bookmarks
  {
    path: '/about',
    redirect: { name: 'UserManagement' },
  },
  {
    path: '/',
    name: 'AdminLayout',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: { name: 'UserManagement' },
    children: [
      {
        path: 'system/users',
        name: 'UserManagement',
        component: () => import('@/views/user/UserManagement.vue'),
        meta: {
          title: TEXTS.menu.userManagement,
        },
      },
    ],
  },
  // Fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'UserManagement' },
  },
];
