/*
 * @Author: Derek Xu
 * @Date: 2023-05-29 10:42:33
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-29 10:54:33
 * @FilePath: \xuct-group-purchase-admin\src\config\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
// ? 全局默认配置项

// 首页地址（默认）
export const HOME_URL: string = '/home/index'

// 登录页地址（默认）
export const LOGIN_URL: string = '/login'

// 默认主题颜色
export const DEFAULT_PRIMARY: string = '#009688'

// 路由白名单地址（必须是本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ['/500']

// 高德地图 key
export const AMAP_MAP_KEY: string = ''

// 百度地图 key
export const BAIDU_MAP_KEY: string = ''
