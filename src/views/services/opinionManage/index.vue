<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-26 13:13:33
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
        <el-button type="primary" v-auth="'category:manage:edit'" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
      </template>
    </ProTable>
  </div>
</template>
<script setup lang="tsx" name="roleManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { EditPen } from '@element-plus/icons-vue'
import { memberOpinionListApi } from '@/api/modules/services'
import dayjs from 'dayjs'
import { Members } from '@/api/interface'
import { opinionType } from '@/utils/serviceDict'

const proTable = ref()

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
      return <el-tag type={scope.row.status === 0 ? 'danger' : 'success'}>{scope.row.status === 0 ? '未反馈' : '已反馈'}</el-tag>
    }
  },
  {
    prop: 'createTime',
    label: '反馈时间',
    width: 220,
    render: scope => {
      return dayjs(scope.row.createTime).format('YYYY-MM-DD')
    }
  },
  { prop: 'remarks', label: '描述' },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]

const openDrawer = () => {}
</script>
