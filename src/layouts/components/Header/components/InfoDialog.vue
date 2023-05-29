<!--
 * @Author: Derek Xu
 * @Date: 2023-05-18 22:59:44
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-18 23:27:03
 * @FilePath: \xuct-group-purchase-admin\src\layouts\components\Header\components\InfoDialog.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <span>This is userInfo</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)
const openDialog = () => {
  dialogVisible.value = true
}

defineExpose({ openDialog })
</script>
