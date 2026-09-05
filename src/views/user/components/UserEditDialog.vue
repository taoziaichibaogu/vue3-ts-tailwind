<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { computed, reactive, ref, watch } from 'vue';
import { TEXTS } from '@/constants/text';
import { userApi, type UserCreateData } from '@/api/system/user';
import type { DialogMode } from '@/composables/useUserManagement';

// 使用 Parameters 提取 userApi.addUser 的输入参数类型作为提交 Payload
type CreatePayload = Parameters<typeof userApi.addUser>[0];

interface Props {
  visible: boolean;
  mode: DialogMode;
  model: UserCreateData;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'submit', model: CreatePayload): void;
}>();

const formRef = ref<FormInstance>();

// Use local clone to avoid mutating parent when dialog is cancelled.
const localModel = reactive<UserCreateData>({
  name: '',
  email: '',
});

watch(
  () => props.visible,
  (val) => {
    if (val) {
      localModel.name = props.model.name;
      localModel.email = props.model.email;
    }
  },
);

const title = computed(() => (props.mode === 'create' ? TEXTS.user.create : TEXTS.user.edit));

const rules = reactive<FormRules<UserCreateData>>({
  name: [{ required: true, message: TEXTS.user.validation.nameRequired, trigger: 'blur' }],
  email: [
    { required: true, message: TEXTS.user.validation.emailRequired, trigger: 'blur' },
    { type: 'email', message: TEXTS.user.validation.emailInvalid, trigger: 'blur' },
  ],
});

function handleClose() {
  emit('update:visible', false);
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;
  emit('submit', { name: localModel.name, email: localModel.email });
}
</script>

<template>
  <el-dialog :model-value="visible" :title="title" width="520px" @close="handleClose">
    <el-form ref="formRef" :model="localModel" :rules="rules" label-width="92px">
      <el-form-item :label="TEXTS.user.form.name" prop="name">
        <el-input v-model="localModel.name" />
      </el-form-item>
      <el-form-item :label="TEXTS.user.form.email" prop="email">
        <el-input v-model="localModel.email" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button :disabled="loading" @click="handleClose">
        {{ TEXTS.user.cancel }}
      </el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        {{ TEXTS.user.confirm }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
