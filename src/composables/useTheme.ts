import { ref } from 'vue';

const THEME_KEY = 'theme-mode';

// 初始检测：优先读取本地存储，其次检测系统喜好
const getInitialTheme = (): boolean => {
  const cachedTheme = localStorage.getItem(THEME_KEY);
  if (cachedTheme) {
    return cachedTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const isDark = ref<boolean>(getInitialTheme());

// 同步 DOM 根节点 class 与本地缓存
const applyTheme = (dark: boolean) => {
  isDark.value = dark;
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
};

// 初始执行一次
applyTheme(isDark.value);

export function useTheme() {
  const toggleTheme = () => {
    applyTheme(!isDark.value);
  };

  return {
    isDark,
    toggleTheme,
  };
}
