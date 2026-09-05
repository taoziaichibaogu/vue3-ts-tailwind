// 1. 常量数组定义（单一数据源）
export const USER_STATUSES = ['active', 'inactive', 'disabled'] as const;

// 2. 使用 typeof + [number] 自动从常量数组提取字面量联合类型
export type UserStatus = typeof USER_STATUSES[number];

// 3. Tag 组件类型
export type TagType = 'success' | 'info' | 'warning' | 'danger';

// 4. 使用 Record 建立完备的状态映射字典（TS 强约束，缺少任意状态都会报错）
export const USER_STATUS_MAP: Record<UserStatus, { label: string; type: TagType }> = {
  active: { label: '正常', type: 'success' },
  inactive: { label: '未激活', type: 'info' },
  disabled: { label: '已禁用', type: 'danger' },
};
