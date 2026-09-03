import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue';
import { userApi, type User, type UserCreateData, type UserListParams } from '@/api/system/user';
import { TEXTS } from '@/constants/text';

export function useUserManagement() {
  const loading = ref(false);
  const tableData = ref<User[]>([]);
  const total = ref(0);

  // 使用 Pick 从通用查询参数中挑选搜索关键字字段
  const queryForm = reactive<Pick<UserListParams, 'keyword'>>({
    keyword: '',
  });

  // 使用 Required + Pick 组合，确保分页参数 page 和 size 必填
  const pagination = reactive<Required<Pick<UserListParams, 'page' | 'size'>>>({
    page: 1,
    size: 10,
  });

  const dialogVisible = ref(false);
  const dialogMode = ref<'create' | 'edit'>('create');
  const editingId = ref<number | null>(null);
  const formModel = reactive<UserCreateData>({
    name: '',
    email: '',
  });

  async function fetchList() {
    loading.value = true;
    try {
      const res = await userApi.listUsers({
        page: pagination.page,
        size: pagination.size,
        keyword: queryForm.keyword?.trim() || undefined,
      });

      tableData.value = res.data?.list || [];
      total.value = res.data?.total || 0;
    } finally {
      loading.value = false;
    }
  }

  function handleSearch() {
    pagination.page = 1;
    fetchList();
  }

  function handleReset() {
    queryForm.keyword = '';
    pagination.page = 1;
    fetchList();
  }

  function handlePageChange(page: number) {
    pagination.page = page;
    fetchList();
  }

  function handlePageSizeChange(size: number) {
    pagination.size = size;
    pagination.page = 1;
    fetchList();
  }

  function openCreate() {
    dialogMode.value = 'create';
    editingId.value = null;
    formModel.name = '';
    formModel.email = '';
    dialogVisible.value = true;
  }

  function openEdit(row: User) {
    dialogMode.value = 'edit';
    editingId.value = row.id;
    formModel.name = row.name;
    formModel.email = row.email;
    dialogVisible.value = true;
  }

  async function submitForm(model: UserCreateData) {
    const payload: UserCreateData = {
      name: model.name.trim(),
      email: model.email.trim(),
    };

    if (!payload.name || !payload.email) return;

    try {
      loading.value = true;
      if (dialogMode.value === 'create') {
        await userApi.addUser(payload);
        ElMessage.success(TEXTS.user.validation.created);
      } else if (editingId.value != null) {
        await userApi.updateUser(editingId.value, payload);
        ElMessage.success(TEXTS.user.validation.updated);
      }

      dialogVisible.value = false;
      await fetchList();
    } finally {
      loading.value = false;
    }
  }

  // 使用 Pick<User, 'id'> 解耦对整个 User 实体的过度依赖，仅要求传入包含 id 的对象即可
  async function deleteRow(row: Pick<User, 'id'>) {
    await ElMessageBox.confirm(TEXTS.user.validation.deleteConfirm, TEXTS.user.validation.warning, {
      type: 'warning',
      confirmButtonText: TEXTS.user.confirm,
      cancelButtonText: TEXTS.user.cancel,
    });

    loading.value = true;
    try {
      await userApi.deleteUser(row.id);
      ElMessage.success(TEXTS.user.validation.deleted);
      await fetchList();
    } finally {
      loading.value = false;
    }
  }

  return {
    // state
    loading,
    tableData,
    total,
    queryForm,
    pagination,
    dialogVisible,
    dialogMode,
    formModel,

    // actions
    fetchList,
    handleSearch,
    handleReset,
    handlePageChange,
    handlePageSizeChange,
    openCreate,
    openEdit,
    submitForm,
    deleteRow,
  };
}
