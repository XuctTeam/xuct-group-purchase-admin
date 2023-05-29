/*
 * @Author: Derek Xu
 * @Date: 2023-05-29 10:42:33
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-29 10:58:30
 * @FilePath: \xuct-group-purchase-admin\src\directives\modules\auth.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
/**
 * v-auth
 * 按钮权限指令
 */
import { useAuthStore } from '@/stores/modules/auth'
import type { Directive, DirectiveBinding } from 'vue'

const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const authStore = useAuthStore()
    const currentPageRoles = authStore.authButtonListGet[authStore.routeName] ?? []
    if (value instanceof Array && value.length) {
      const hasPermission = value.every(item => currentPageRoles.includes(item))
      if (!hasPermission) el.remove()
    } else {
      if (!currentPageRoles.includes(value)) el.remove()
    }
  }
}

export default auth
