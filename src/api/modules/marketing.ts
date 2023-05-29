/*
 * @Author: Derek Xu
 * @Date: 2023-05-17 11:17:59
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-22 14:09:23
 * @FilePath: \xuct-group-purchase-admin\src\api\modules\marketing.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { PORT1 } from '@/api/config/servicePort'
import http from '@/api'
import { Marketing, ResPage, SelectResult } from '../interface'

export const bannerListApi = (params: { title?: string; status?: number }) => {
  return http.get<Marketing.BannerResult[]>(PORT1 + '/v1/banner', params)
}

export const addBannerApi = (params: Marketing.BannerResult) => {
  return http.post(PORT1 + '/v1/banner', params)
}

export const editBannerApi = (params: Marketing.BannerResult) => {
  return http.put(PORT1 + '/v1/banner', params)
}

export const deleteBannerApi = (params: { id: string }) => {
  return http.delete(PORT1 + `/v1/banner/${params.id}`)
}

export const changeBannerApi = (params: { id: string; status: number }) => {
  return http.post(PORT1 + '/v1/banner/change/status', params)
}

/**
 * 优惠券列表
 * @param params
 */
export const couponListApi = (params: Marketing.ReqCouponParams) => {
  return http.get<ResPage<Marketing.CouponResult>>(PORT1 + '/v1/coupon', params)
}

/**
 * 新增优惠券
 * @param params
 * @returns
 */
export const addCouponApi = (params: Marketing.CouponResult) => {
  return http.post(PORT1 + '/v1/coupon', params)
}

/**
 * 编辑优惠券
 * @param params
 * @returns
 */
export const editCouponApi = (params: Marketing.CouponResult) => {
  return http.put(PORT1 + '/v1/coupon', params)
}

/**
 * 删除优惠券
 * @param params
 */
export const deleteCouponApi = (params: { id: string }) => {
  return http.delete(PORT1 + `/v1/coupon/${params.id}`)
}

/**
 *
 * 获取优惠券指定商品
 * @param id
 */
export const getCouponWaresIds = (id: string) => {
  return http.get<string[]>(PORT1 + '/v1/coupon/wares', { id })
}

/**
 * 修改优惠券状态
 * @param params
 */
export const changeCouponStatusApi = (params: { id: string; status: number }) => {
  return http.post(PORT1 + '/v1/coupon/change/status', params)
}

/**
 * 获取优惠券下拉选择
 */
export const getCouponSelectedApi = () => {
  return http.get<SelectResult[]>(PORT1 + '/v1/coupon/selected')
}
