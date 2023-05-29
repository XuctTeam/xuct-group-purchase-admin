/*
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-19 10:50:14
 * @FilePath: \xuct-group-purchase-admin\src\api\modules\user.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { User, SelectResult } from '@/api/interface/index'
import { PORT1 } from '@/api/config/servicePort'
import http from '@/api'

/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getUserList = (params: User.ReqUserParams) => {
  return http.get<User.ResUser[]>(PORT1 + `/v1/user/list`, params)
}

// 新增用户
export const addUser = (params: { id: string }) => {
  return http.post(PORT1 + `/v1/user`, params)
}

// 编辑用户
export const editUser = (params: { id: string }) => {
  return http.put(PORT1 + `/v1/user`, params)
}

// 删除用户
export const deleteUser = (params: { id: string }) => {
  return http.delete(PORT1 + `/v1/user/${params.id}`)
}

// 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + `/v1/user/change`, params)
}

// 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
  return http.post(PORT1 + `/v1/user/reset/password`, params)
}

// 导出用户数据
export const exportUserInfo = (params: User.ReqUserParams) => {
  return http.download(PORT1 + `/user/export`, params)
}

// 获取用户状态
export const getUserStatus = () => {
  return http.get<User.ResStatus>(PORT1 + `/user/status`)
}

/**
 * 获取角色下拉数据
 */
export const getRoleSelectApi = () => {
  return http.get<SelectResult[]>(PORT1 + `/v1/role/selected`)
}
