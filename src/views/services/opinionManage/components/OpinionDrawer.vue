<!--
 * @Author: Derek Xu
 * @Date: 2023-05-11 11:42:29
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-29 13:12:04
 * @FilePath: \xuct-group-purchase-admin\src\views\services\opinionManage\components\opinionDrawer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}反馈`">
    <el-descriptions :title="`用户${drawerProps.row.memberName}反馈`" :column="1" border>
      <el-descriptions-item label="用户头像">
        <el-image style="width: 40px; height: 40px" :src="drawerProps.row.memberAvatar" />
      </el-descriptions-item>
      <el-descriptions-item label="提交类型">{{ type }}</el-descriptions-item>
      <el-descriptions-item label="提交时间">{{ createTime }}</el-descriptions-item>
      <el-descriptions-item label="提交内容">{{ drawerProps.row.remarks }}</el-descriptions-item>
      <el-descriptions-item label="反馈时间">{{ feedbackTime }}</el-descriptions-item>
      <el-descriptions-item label="反馈内容">{{ drawerProps.row.feedback }}</el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="OpinionDrawer">
import { ref, computed } from 'vue'
import { Members } from '@/api/interface'
import dayjs from 'dayjs'
import { opinionType } from '@/utils/serviceDict'

interface DrawerProps {
  title: string
  row: Partial<Members.MemberOpinionResult>
  getTableList?: () => void
}

const createTime = computed(() => {
  return dayjs(drawerProps.value.row?.createTime).format('YYYY-MM-DD HH:mm:ss')
})

const type = computed(() => {
  return opinionType.find(item => item.value === drawerProps.value.row.type)?.label
})

const feedbackTime = computed(() => {
  if (!drawerProps.value.row?.feedbackTime) {
    return '--'
  }
  return dayjs(drawerProps.value.row?.feedbackTime).format('YYYY-MM-DD HH:mm:ss')
})

const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
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
