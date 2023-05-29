<!--
 * @Author: Derek Xu
 * @Date: 2023-05-29 10:42:33
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-29 10:59:49
 * @FilePath: \xuct-group-purchase-admin\src\components\SwitchDark\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-switch v-model="globalStore.isDark" @change="switchDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" />
</template>

<script setup lang="ts" name="SwitchDark">
import { useTheme } from '@/hooks/useTheme'
import { useGlobalStore } from '@/stores/modules/global'
import { Sunny, Moon } from '@element-plus/icons-vue'

const { switchDark } = useTheme()
const globalStore = useGlobalStore()
</script>
