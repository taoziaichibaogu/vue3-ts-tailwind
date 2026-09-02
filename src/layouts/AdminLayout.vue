<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TEXTS } from '@/constants/text';

interface MenuItem {
  name: string;
  label: string;
  routeName: string;
}

const router = useRouter();
const route = useRoute();

const appTitle = computed(() => import.meta.env.VITE_APP_TITLE || TEXTS.appTitle);

const menuItems = computed<MenuItem[]>(() => [
  {
    name: 'user',
    label: TEXTS.menu.userManagement,
    routeName: 'UserManagement',
  },
]);

const headerTitle = computed(() =>
  typeof route.meta?.title === 'string' && route.meta.title ? route.meta.title : TEXTS.user.pageTitle,
);

function handleMenuClick(item: MenuItem) {
  router.push({ name: item.routeName });
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div class="h-14 px-4 flex items-center border-b border-gray-200">
          <div class="font-semibold truncate">{{ appTitle }}</div>
        </div>
        <nav class="p-2">
          <button
            v-for="item in menuItems"
            :key="item.name"
            type="button"
            class="w-full text-left px-3 py-2 rounded-md text-sm transition"
            :class="
              route.name === item.routeName
                ? 'bg-emerald-50 text-emerald-700'
                : 'hover:bg-gray-100 text-gray-700'
            "
            @click="handleMenuClick(item)"
          >
            {{ item.label }}
          </button>
        </nav>
      </aside>

      <!-- Main -->
      <div class="flex-1 min-w-0">
        <!-- Header -->
        <header class="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <div class="font-medium text-sm text-gray-700">
            {{ headerTitle }}
          </div>
          <div class="text-xs text-gray-500">{{ appTitle }}</div>
        </header>

        <main class="p-6">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
