<!--
 * @Author: Derek Xu
 * @Date: 2023-05-18 22:59:44
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-18 23:34:04
 * @FilePath: \xuct-group-purchase-admin\src\layouts\components\Header\components\ThemeSetting.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="theme-setting">
    <i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="openDrawer"></i>
  </div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus'
const openDrawer = () => {
  mittBus.emit('openThemeDrawer')
}
</script>
