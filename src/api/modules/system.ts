/*
 * @Author: Derek Xu
 * @Date: 2023-05-09 18:07:50
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-24 18:22:08
 * @FilePath: \xuct-group-purchase-admin\src\api\modules\system.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { PORT1 } from '@/api/config/servicePort'
import http from '@/api'
import { Logs, ResPage, System } from '../interface'

/**
 * 菜单列表
 * @returns
 */
export const getMenuListApi = () => {
  return http.get<Menu.MenuOptions[]>(PORT1 + `/v1/menu`, {}, { noLoading: true })
}

/**
 * 查询树型菜单，不包括按钮
 */
export const getMenuTree = (showBtn: number = 0) => {
  return http.get<System.MenuResult[]>(PORT1 + `/v1/menu/tree`, { showBtn })
}

/**
 * 添加菜单
 * @param params
 * @returns
 */
export const addResourceApi = (params: System.MenuFrom) => {
  return http.post(PORT1 + `/v1/menu`, { ...params })
}

/**
 * 修改菜单
 * @param params
 * @returns
 */
export const editResourceApi = (params: System.MenuFrom) => {
  return http.put(PORT1 + `/v1/menu`, { ...params })
}

/**
 * 删除资源
 * @param resourceId
 */
export const deleteResourceApi = (resourceId: string) => {
  return http.delete(PORT1 + `/v1/menu/${resourceId}`)
}

/**
 * 角色列表
 * @returns
 */
export const roleListApi = () => {
  return http.get<System.RoleResult[]>(PORT1 + '/v1/role/list')
}

/**
 * 添加角色
 */
export const addOrUpdateRoleApi = (role: { id?: string; name: string; code: string }) => {
  return http.post(PORT1 + '/v1/role', { ...role })
}

/**
 * 查询角色对应资源ID
 * @param roleId
 */
export const getRoleResourceApi = (roleId: string) => {
  return http.get<string[]>(PORT1 + `/v1/role/resource`, { roleId })
}

/**
 * 角色绑定资源
 * @param roleIds
 */
export const bindRoleResourceApi = (params: { roleId: string; resourceIds: string[] }) => {
  return http.post(PORT1 + '/v1/role/resource', params)
}

/**
 * 删除角色
 *
 * @param role
 */
export const deleteRoleApi = (params: { id: string }) => {
  return http.delete(PORT1 + `/v1/role/${params.id}`)
}

/**
 * 日志列表
 */
export const logsListApi = (params: Logs.ReqLogsParams) => {
  return http.get<ResPage<Logs.LogResult>>(PORT1 + '/v1/logs', params)
}

/**
 * 系统参数列表
 * @returns
 */
export const appConfigListApi = () => {
  return http.get<System.AppConfigResult[]>(PORT1 + '/v1/app/config')
}

/**
 * 修改系统参数
 * @param params
 * @returns
 */
export const editAppConfigApi = (params: System.AppConfigResult) => {
  return http.put(PORT1 + '/v1/app/config', params)
}
