<!--
 * @Author: Derek Xu
 * @Date: 2023-05-16 09:05:21
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-22 10:43:04
 * @FilePath: \xuct-group-purchase-admin\src\components\TableImageTip\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-popover placement="right" trigger="hover" :width="popWidth">
    <el-image :style="{ width: props.imgWidth + 'px', height: props.imgHeight + 'px' }" :src="props.uri" fit="scale-down" />
    <template #reference>
      <el-image style="width: 40px; height: 40px" :src="props.uri" fit="scale-down" />
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  uri: {
    type: String,
    default: ''
  },

  /* 整体宽度 */
  popWidth: {
    type: Number,
    default: 424
  },

  /** 图片宽度 */
  imgWidth: {
    type: Number,
    default: 400
  },

  /** 图片高度 */
  imgHeight: {
    type: Number,
    default: 420
  }
})

const popWidth = computed(() => {
  return props.popWidth
})
</script>
