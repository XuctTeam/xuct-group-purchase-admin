/*
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-19 10:10:07
 * @FilePath: \xuct-group-purchase-admin\src\stores\modules\user.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { UserState } from '@/stores/interface'
import piniaPersistConfig from '@/config/piniaPersist'

export const useUserStore = defineStore({
  id: 'group-user',
  state: (): UserState => ({
    token: '',
    userInfo: { id: '', avatar: '', nickname: '', phone: '', status: 0 }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo
    }
  },
  persist: piniaPersistConfig('group-user')
})
