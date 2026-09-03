import { request } from '../axios';
import type { ApiResponse } from '../types/common';

// 用户类型定义
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

// 查询参数类型
export interface UserListParams {
  page?: number;
  size?: number;
  keyword?: string;
}

export interface UserListData {
  list: User[];
  total: number;
  page: number;
  pageSize: number;
}

// 创建用户表单数据类型：使用 Omit 排除服务端自增主键与时间戳，避免重复定义字段
export type UserCreateData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// 用户基础信息类型：使用 Pick 提取关键标识字段（常用于下拉框或简略列表）
export type UserBaseInfo = Pick<User, 'id' | 'name'>;

// 用户相关API封装
export const userApi = {
  // 获取用户列表
  listUsers: (params?: UserListParams) => {
    return request<ApiResponse<UserListData>>({
      url: '/users',
      method: 'get',
      params,
    });
  },

  // 获取单个用户详情
  getUser: (id: number | string) => {
    return request<ApiResponse<User>>({
      url: `/users/${id}`,
      method: 'get',
    });
  },

  // 添加用户
  addUser: (data: UserCreateData) => {
    return request<ApiResponse<User>>({
      url: '/users',
      method: 'post',
      data,
    });
  },

  // 更新用户
  updateUser: (id: number | string, data: Partial<UserCreateData>) => {
    return request<ApiResponse<User>>({
      url: `/users/${id}`,
      method: 'put',
      data,
    });
  },

  // 删除用户
  deleteUser: (id: number | string) => {
    return request<ApiResponse<null>>({
      url: `/users/${id}`,
      method: 'delete',
    });
  },
};

// Backward compatibility
export const listUser = userApi.listUsers;
