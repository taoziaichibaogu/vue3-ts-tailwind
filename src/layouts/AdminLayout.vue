<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { TEXTS } from '@/constants/text';

const { isDark, toggleTheme } = useTheme();

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
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="w-56 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div class="h-14 px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div class="font-semibold truncate text-gray-900 dark:text-gray-100">{{ appTitle }}</div>
          <el-button
            circle
            size="small"
            :icon="isDark ? Sunny : Moon"
            class="!border-gray-200 dark:!border-gray-600 dark:!bg-gray-700 dark:!text-gray-200"
            :title="isDark ? '切换浅色模式' : '切换深色模式'"
            @click="toggleTheme"
          />
        </div>
        <nav class="p-2">
          <button
            v-for="item in menuItems"
            :key="item.name"
            type="button"
            class="w-full text-left px-3 py-2 rounded-md text-sm transition"
            :class="
              route.name === item.routeName
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
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
        <header class="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between">
          <div class="font-medium text-sm text-gray-700 dark:text-gray-200">
            {{ headerTitle }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ appTitle }}</div>
        </header>

        <main class="p-6">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
