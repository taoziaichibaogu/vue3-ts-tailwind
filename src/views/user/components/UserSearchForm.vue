<script setup lang="ts">
import { computed } from 'vue';
import { TEXTS } from '@/constants/text';

interface Props {
  keyword: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  (e: 'update:keyword', value: string): void;
  (e: 'search'): void;
  (e: 'reset'): void;
  (e: 'create'): void;
}>();

const keywordValue = computed({
  get: () => props.keyword,
  set: (val: string) => emit('update:keyword', val),
});
</script>

<template>
  <div class="card">
    <div class="flex items-center gap-3">
      <el-input
        v-model="keywordValue"
        class="max-w-md"
        clearable
        :placeholder="TEXTS.user.searchPlaceholder"
      />

      <el-button type="primary" :loading="loading" @click="emit('search')">
        {{ TEXTS.user.search }}
      </el-button>
      <el-button :disabled="loading" @click="emit('reset')">
        {{ TEXTS.user.reset }}
      </el-button>

      <div class="flex-1" />

      <el-button type="success" :disabled="loading" @click="emit('create')">
        {{ TEXTS.user.create }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

