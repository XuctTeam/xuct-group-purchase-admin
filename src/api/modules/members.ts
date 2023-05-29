/*
 * @Author: Derek Xu
 * @Date: 2023-05-22 09:17:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-25 09:45:11
 * @FilePath: \xuct-group-purchase-admin\src\api\modules\members.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { PORT1 } from '@/api/config/servicePort'
import http from '@/api'
import { Members } from '../interface'

export const membersListApi = (params: Members.ReqMembersParams) => {
  return http.get<Members.MemberResult[]>(PORT1 + '/v1/member/list', params)
}

/**
 * 给会员发放优惠券
 */
export const addMemberCouponApi = (params: Members.MemberCouponParam) => {
  return http.post(PORT1 + '/v1/member/coupon', params)
}

/**
 * 修改会员状态
 * @param params
 */
export const changeMemberStatusApi = (params: { id: string; status: number }) => {
  return http.post(PORT1 + '/v1/member/change/status', params)
}

/**
 * 会员订单列表
 * @param params
 * @returns
 */
export const memberOrderListApi = (params: Members.ReqMemberOrderParams) => {
  return http.get<Members.MemberOrderResult[]>(PORT1 + '/v1/order/list', params)
}

/**
 * 订单发货
 * @param params
 */
export const deliverOrderApi = (params: { id: string }) => {
  return http.put(PORT1 + `/v1/order/deliver/${params.id}`)
}

/**
 * 获取订单详情
 * @param params
 */
export const getOrderDetailApi = (params: { id: string }) => {
  return http.get<Members.MemberOrderResult>(PORT1 + `/v1/order/${params.id}`)
}
