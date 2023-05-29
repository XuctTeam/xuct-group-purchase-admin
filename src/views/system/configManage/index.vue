<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-25 14:22:18
 * @FilePath: \xuct-group-purchase-admin\src\views\system\configManage\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="系统参数列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :tool-button="false"
      :request-api="appConfigListApi"
      :pagination="false"
    >
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" v-auth="'sys:config:edit'" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
      </template>
    </ProTable>

    <config-dialog ref="drawerRef"></config-dialog>
  </div>
</template>
<script setup lang="ts" name="configManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { appConfigListApi, editAppConfigApi } from '@/api/modules/system'
import { EditPen } from '@element-plus/icons-vue'
import { appConfigType } from '@/utils/serviceDict'
import ConfigDialog from './components/ConfigDialog.vue'
import { System } from '@/api/interface'

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 150 },
  {
    prop: 'type',
    label: '操作类型',
    enum: appConfigType,
    fieldNames: { label: 'label', value: 'value' }
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 200 }
]

const proTable = ref()
const drawerRef = ref<InstanceType<typeof ConfigDialog> | null>(null)

const openDrawer = (title: string, row: Partial<System.AppConfigResult> = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: editAppConfigApi,
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>
