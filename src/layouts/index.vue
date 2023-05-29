<!--
 * @Author: Derek Xu
 * @Date: 2023-05-29 10:42:33
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-29 11:01:02
 * @FilePath: \xuct-group-purchase-admin\src\layouts\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="LayoutComponents[layout]" />
  <ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from 'vue'
import { LayoutType } from '@/stores/interface'
import { useGlobalStore } from '@/stores/modules/global'
import ThemeDrawer from './components/ThemeDrawer/index.vue'
import LayoutVertical from './LayoutVertical/index.vue'
import LayoutClassic from './LayoutClassic/index.vue'
import LayoutTransverse from './LayoutTransverse/index.vue'
import LayoutColumns from './LayoutColumns/index.vue'

const LayoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns
}

const globalStore = useGlobalStore()
const layout = computed(() => globalStore.layout)
</script>

<style scoped lang="scss">
.layout {
  min-width: 730px;
}
</style>
