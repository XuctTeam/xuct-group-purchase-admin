<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-17 19:05:29
 * @FilePath: \xuct-group-purchase-admin\src\views\system\logManage\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="日志列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :tool-button="false"
      :request-api="logsListApi"
    >
    </ProTable>
  </div>
</template>
<script setup lang="ts" name="logManage">
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { logsListApi } from '@/api/modules/system'
import dayjs from 'dayjs'

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 150 },
  { prop: 'userName', label: '操作账号', width: 140 },
  { prop: 'type', label: '操作类型' },
  { prop: 'module', label: '操作模块', search: { el: 'input' } },
  { prop: 'uri', label: '请求地址', width: 300 },
  { prop: 'ip', label: '请求IP' },
  { prop: 'takeUpTime', label: '执行时间（ms）' },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 220,
    render: scope => {
      return dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      defaultValue: ['2023-01-01 00:00:00', '2023-12-30 23:59:00']
    }
  }
]
</script>
