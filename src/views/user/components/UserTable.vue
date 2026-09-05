<script setup lang="ts">
import { TEXTS } from '@/constants/text';
import type { User } from '@/api/system/user';
import { USER_STATUS_MAP } from '@/constants/user';

interface Props {
  data: User[];
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  (e: 'edit', row: User): void;
  (e: 'delete', row: User): void;
}>();
</script>

<template>
  <div class="card mt-4">
    <el-table :data="data" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" :label="TEXTS.user.columns.id" width="90" />
      <el-table-column prop="name" :label="TEXTS.user.form.name" min-width="180" />
      <el-table-column prop="email" :label="TEXTS.user.form.email" min-width="240" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-tag :type="USER_STATUS_MAP[row.status || 'active'].type">
            {{ USER_STATUS_MAP[row.status || 'active'].label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="TEXTS.user.columns.createdAt" min-width="220" />
      <el-table-column :label="TEXTS.user.actions" width="220" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="emit('edit', row)">
            {{ TEXTS.user.edit }}
          </el-button>
          <el-button link type="danger" @click="emit('delete', row)">
            {{ TEXTS.user.delete }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss"></style>
