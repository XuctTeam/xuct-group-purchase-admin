<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-06-02 18:00:19
 * @FilePath: \xuct-group-purchase-admin\src\views\services\opinionManage\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable ref="proTable" title="反馈列表" row-key="id" :indent="30" :columns="columns" :request-api="memberOpinionListApi">
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" v-auth="'opinion:manage:view'" link :icon="View" @click="openDrawer('查看', scope.row)"
          >查看</el-button
        >
        <el-button
          type="primary"
          v-if="!scope.row.status"
          v-auth="'opinion:manage:feedback'"
          link
          :icon="ChatLineRound"
          @click="openFeedbackDrawer(scope.row)"
          >反馈</el-button
        >
      </template>
    </ProTable>
  </div>
  <opinion-drawer ref="drawerRef"></opinion-drawer>
  <opinion-feedback-drawer ref="feedbackDrawerRef"></opinion-feedback-drawer>
</template>
<script setup lang="tsx" name="opinionManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { View, ChatLineRound } from '@element-plus/icons-vue'
import { memberOpinionListApi, feedbackMemberOpinionApi } from '@/api/modules/services'
import dayjs from 'dayjs'
import OpinionDrawer from './components/OpinionDrawer.vue'
import OpinionFeedbackDrawer from './components/OpinionFeedbackDrawer.vue'
import { Members } from '@/api/interface'
import { opinionType } from '@/utils/serviceDict'

// 表格配置项
const columns: ColumnProps<Members.MemberOpinionResult>[] = [
  { type: 'index', label: '#', width: 150 },
  { prop: 'memberName', label: '会员昵称', width: 150 },
  {
    prop: 'type',
    label: '反馈类型',
    enum: opinionType,
    width: 200,
    fieldNames: { label: 'label', value: 'value' }
  },
  {
    prop: 'createTime',
    label: '反馈时间',
    width: 220,
    render: scope => {
      return <el-tag type={!scope.row.status ? 'danger' : 'success'}>{!scope.row.status ? '未反馈' : '已反馈'}</el-tag>
    }
  },
  {
    prop: 'createTime',
    label: '反馈时间',
    width: 220,
    render: scope => {
      return dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  { prop: 'remarks', label: '描述' },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right', align: 'left' }
]

const proTable = ref()
const drawerRef = ref<InstanceType<typeof OpinionDrawer> | null>(null)
const feedbackDrawerRef = ref<InstanceType<typeof OpinionFeedbackDrawer> | null>(null)

const openDrawer = (title: string, row: Partial<Members.MemberOpinionResult> = {}) => {
  const params = {
    title,
    row: { ...row },
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}

const openFeedbackDrawer = (row: Partial<Members.MemberOpinionResult> = {}) => {
  const params = {
    row: { ...row },
    api: feedbackMemberOpinionApi,
    getTableList: proTable.value.getTableList
  }
  feedbackDrawerRef.value?.acceptParams(params)
}
</script>
