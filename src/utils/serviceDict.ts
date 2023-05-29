/*
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-26 13:11:13
 * @FilePath: \xuct-group-purchase-admin\src\utils\serviceDict.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
// ? 系统全局字典

/**
 * @description：用户性别
 */
export const genderType = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]

/**
 * @description：用户状态
 */
export const userStatus = [
  { label: '正常', value: 0 },
  { label: '禁用', value: 1 }
]

export const menuType = [
  { label: '1', value: '目录' },
  { label: '2', value: '菜单' },
  { label: '3', value: '按钮' },
  { label: '4', value: '外链' }
]

/**
 *  启用状态
 */
export const disableStatus = [
  { label: '是', value: true },
  { label: '否', value: false }
]

/**
 * 商品状态
 */
export const waresStatus = [
  { label: '未上架', value: 0 },
  { label: '已上架', value: 1 }
]

/**
 * 商品标签
 */
export const waresTags = [
  { label: '礼品', value: '礼品' },
  { label: '包邮', value: '包邮' },
  { label: '优选', value: '优选' }
]

/**
 * 轮播图状态
 */
export const bannerStatus = [
  { label: '正常', value: 1 },
  { label: '禁用', value: 0 }
]

/**
 * 优惠券使用状态
 */
export const couponStatus = [
  { label: '启用', value: 1 },
  { label: '未启用', value: 0 }
]

/**
 * 优惠券类型
 */
export const couponWaresType = [
  { label: '全部商品', value: 0 },
  { label: '指定商品', value: 1 }
]

/**
 * 会员状态
 */
export const memberStatus = [
  { label: '正常', value: 0 },
  { label: '禁用', value: 1 }
]

/**
 * 订单状态
 */
export const memberOrderStatus = [
  { label: '待付款', value: 1 },
  { label: '待配送', value: 2 },
  { label: '待收货', value: 3 },
  { label: '已完成', value: 4 }
]

/**
 * 退单状态
 */
export const memberRefundOrderStatus = [
  { label: '退单中', value: 1 },
  { label: '已完成', value: 2 }
]

/**
 * 退单类型
 */
export const memberRefundOrderType = [
  {
    value: '1',
    label: '商品质量问题'
  },
  {
    value: '2',
    label: '地址选错了'
  },
  {
    value: '3',
    label: '购买的商品或数量错了'
  },
  {
    value: '4',
    label: '其他原因'
  }
]

/**
 * Config类型
 */
export const appConfigType = [
  { label: '隐私协议', value: 0 },
  { label: '用户协议', value: 1 },
  { label: '版本号', value: 2 },
  { label: '客服电话', value: 3 }
]

/**
 * 反馈类型
 */
export const opinionType = [
  {
    value: '1',
    label: '质量问题'
  },
  {
    value: '2',
    label: '送货问题'
  },
  {
    value: '3',
    label: '售后问题'
  },
  {
    value: '4',
    label: '账号问题'
  },
  {
    value: '5',
    label: '系统问题'
  },
  {
    value: '6',
    label: '意见反馈'
  }
]
