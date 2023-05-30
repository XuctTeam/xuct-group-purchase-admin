<!--
 * @Author: Derek Xu
 * @Date: 2023-05-11 11:42:29
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-30 15:13:01
 * @FilePath: \xuct-group-purchase-admin\src\views\wares\evaluateManage\components\EvaluateDrawer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`【${title}】评价`">
    <el-descriptions :title="`${drawerProps.row.memberName}评价`" :column="1" border>
      <el-descriptions-item label="商品图片">
        <el-image style="width: 100px; height: 100px" :src="drawerProps.row.waresFirstDrawing" />
      </el-descriptions-item>
      <el-descriptions-item label="评分">{{ drawerProps.row.rate }}</el-descriptions-item>
      <el-descriptions-item label="上传图片">
        <el-image
          v-for="(item, i) in drawerProps.row?.evaluateImages?.split(',')"
          :key="i"
          :src="item"
          fit="scale-down"
          style="width: 100px; height: 100px; margin-right: 10px"
        ></el-image>
      </el-descriptions-item>
      <el-descriptions-item label="评价人头像">
        <el-image style="width: 40px; height: 40px" :src="drawerProps.row.memberAvatar" />
      </el-descriptions-item>
      <el-descriptions-item label="评价时间">{{ createTime }}</el-descriptions-item>
      <el-descriptions-item label="评价内容">{{ drawerProps.row.remarks }}</el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="EvaluateDrawer">
import { ref, computed } from 'vue'
import { Wares } from '@/api/interface'
import dayjs from 'dayjs'

interface DrawerProps {
  row: Partial<Wares.WaresEvaluateResult>
}

const title = computed(() => {
  if (!drawerProps.value.row.waresName) {
    return '--'
  }
  return drawerProps.value.row?.waresName?.length > 20 ?? ''
    ? drawerProps.value.row?.waresName?.substring(0, 20) + '...'
    : drawerProps.value.row?.waresName
})

const createTime = computed(() => {
  return dayjs(drawerProps.value.row?.createTime).format('YYYY-MM-DD HH:mm:ss')
})

const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  row: {}
})

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params
  drawerVisible.value = true
}

defineExpose({
  acceptParams
})
</script>
