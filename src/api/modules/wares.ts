/*
 * @Author: Derek Xu
 * @Date: 2023-05-15 17:46:13
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-30 09:14:13
 * @FilePath: \xuct-group-purchase-admin\src\api\modules\wares.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { PORT1 } from '@/api/config/servicePort'
import http from '@/api'
import { Wares, ResPage, SelectResult } from '../interface'

/**
 * 商品列表
 * @returns
 */
export const getWaresListApi = (params: Wares.ReqWaresParams) => {
  return http.get<ResPage<Wares.WaresResult>>(PORT1 + `/v1/wares`, params)
}

/**
 * 删除商品
 * @param params
 * @returns
 */
export const deleteWaresApi = (params: { id: string }) => {
  return http.delete(PORT1 + `/v1/wares/${params.id}`)
}

/**
 * 切换商品状态
 * @param params
 */
export const chageWaresStatusApi = (params: { id: string; status: number }) => {
  return http.post(PORT1 + '/v1/wares/change/status', params)
}

/**
 * 添加商品
 * @param params
 */
export const addWaresApi = (params: Wares.WaresResult) => {
  return http.post(PORT1 + '/v1/wares', params)
}

/**
 * 编辑商品
 * @param params
 */
export const editWaresApi = (params: Wares.WaresResult) => {
  return http.put(PORT1 + '/v1/wares', params)
}

/**
 * 获取商品下拉选择列表
 */
export const getWaresSelected = () => {
  return http.get<SelectResult[]>(PORT1 + '/v1/wares/selected')
}

/**
 * 分类列表
 * @param params
 * @returns
 */
export const categoryListApi = (params: { name?: string }) => {
  return http.get<Wares.CategoryResult[]>(PORT1 + '/v1/category', params)
}

/**
 * 新增分类
 * @param params
 * @returns
 */
export const addCategoryApi = (params: Wares.CategoryResult) => {
  return http.post(PORT1 + '/v1/category', params)
}

/**
 * 编辑分类
 * @param params
 * @returns
 */
export const editCategoryApi = (params: Wares.CategoryResult) => {
  return http.put(PORT1 + '/v1/category', params)
}

/**
 * 删除分类
 * @param params
 * @returns
 */
export const deleteCategoryApi = (params: { id: string }) => {
  return http.delete(PORT1 + `/v1/category/${params.id}`)
}

/**
 * 商品评价列表
 * @param params
 * @returns
 */
export const waresEvaluateListApi = (params: Wares.ReqWaresEvaluateParams) => {
  return http.get<Wares.WaresEvaluateResult[]>(PORT1 + '/v1/wares/evaluate/list', params)
}

/**
 * 删除商品评价
 * @param params
 * @returns
 */
export const deleteWareEvaluateApi = (params: { id: string }) => {
  return http.delete(PORT1 + `/v1/wares/evaluate/${params.id}`)
}
