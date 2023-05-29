/*
 * @Author: Derek Xu
 * @Date: 2023-05-18 22:59:44
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-23 18:01:22
 * @FilePath: \xuct-group-purchase-admin\src\api\helper\checkStatus.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { ElMessage } from 'element-plus'

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number) => {
  switch (status) {
    case 400:
      ElMessage.error('请求失败！请您稍后重试')
      break
    case 401:
      ElMessage.error('登录失效！请您重新登录')
      break
    case 403:
      ElMessage.error('当前账号无权限访问！')
      break
    case 404:
      ElMessage.error('你所访问的资源不存在！')
      break
    case 405:
      ElMessage.error('请求方式错误！请您稍后重试')
      break
    case 408:
      ElMessage.error('请求超时！请您稍后重试')
      break
    case 424:
      ElMessage.error('账号被禁用！')
      break
    case 500:
      ElMessage.error('服务异常！')
      break
    case 502:
      ElMessage.error('网关错误！')
      break
    case 503:
      ElMessage.error('服务不可用！')
      break
    case 504:
      ElMessage.error('网关超时！')
      break
    default:
      ElMessage.error('请求失败！')
  }
}
