/*
 * @Author: Derek Xu
 * @Date: 2023-05-25 09:45:32
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-25 18:29:46
 * @FilePath: \xuct-group-purchase-admin\src\api\modules\services.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { PORT1 } from '@/api/config/servicePort'
import http from '@/api'
import { Members } from '../interface'

/**
 * 会员订单列表
 * @param params
 * @returns
 */
export const memberRefundOrderListApi = (params: Members.ReqMemberOrderParams) => {
  return http.get<Members.MemberOrderResult[]>(PORT1 + '/v1/order/refund/list', params)
}

/**
 * 审核退单
 * @param params
 */
export const memberRefundOrderAuditApi = (params: { id: string; content: string; audit: number }) => {
  return http.put(PORT1 + '/v1/order/refund/audit', params)
}

/**
 * 会员反馈列表
 * @param params
 */
export const memberOpinionListApi = (params: Members.ReqMembersOpinionParams) => {
  return http.get<Members.MemberOpinionResult[]>(PORT1 + '/v1/opinion', params)
}
