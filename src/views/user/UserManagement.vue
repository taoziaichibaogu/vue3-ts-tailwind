<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserManagement } from '@/composables/useUserManagement';
import UserEditDialog from './components/UserEditDialog.vue';
import UserSearchForm from './components/UserSearchForm.vue';
import UserTable from './components/UserTable.vue';

const {
  loading,
  tableData,
  total,
  queryForm,
  pagination,
  dialogVisible,
  dialogMode,
  formModel,
  fetchList,
  handleSearch,
  handleReset,
  handlePageChange,
  handlePageSizeChange,
  openCreate,
  openEdit,
  submitForm,
  deleteRow,
} = useUserManagement();

onMounted(() => {
  fetchList();
});
</script>

<template>
  <section>
    <UserSearchForm
      v-model:keyword="queryForm.keyword"
      :loading="loading"
      @search="handleSearch"
      @reset="handleReset"
      @create="openCreate"
    />

    <UserTable :data="tableData" :loading="loading" @edit="openEdit" @delete="deleteRow" />

    <div class="mt-4 flex justify-end">
      <el-pagination
        :current-page="pagination.page"
        :page-size="pagination.size"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        @update:current-page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      />
    </div>

    <UserEditDialog
      v-model:visible="dialogVisible"
      :mode="dialogMode"
      :model="formModel"
      :loading="loading"
      @submit="submitForm"
    />
  </section>
</template>

<style scoped lang="scss"></style>

