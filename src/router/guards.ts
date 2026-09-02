import type { Router } from 'vue-router';
import { TEXTS } from '@/constants/text';

export function setupRouterGuards(router: Router) {
  router.beforeEach((to) => {
    const baseTitle = import.meta.env.VITE_APP_TITLE || TEXTS.appTitle;
    const pageTitle = typeof to.meta?.title === 'string' ? to.meta.title : '';
    document.title = pageTitle ? `${pageTitle} - ${baseTitle}` : baseTitle;
    return true;
  });
}
