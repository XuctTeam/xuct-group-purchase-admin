<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-15 13:16:35
 * @FilePath: \xuct-group-purchase-admin\src\views\system\roleManage\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="角色列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :request-api="roleListApi"
      :pagination="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'sys:role:add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增角色</el-button>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" v-auth="'sys:role:edit'" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button type="danger" v-auth="'sys:role:del'" link :icon="Delete" @click="deleteRole(scope.row)">删除</el-button>
        <el-button type="primary" v-auth="'sys:role:permiss'" link :icon="UserFilled" @click="openPermissDrawer(scope.row)"
          >设置权限</el-button
        >
      </template>
    </ProTable>

    <role-drawer ref="drawerRef" />
    <PermissionDrawer ref="permissDrawerRef" />
  </div>
</template>
<script setup lang="ts" name="roleManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { Delete, EditPen, CirclePlus, UserFilled } from '@element-plus/icons-vue'
import RoleDrawer from './components/RoleDrawer.vue'
import PermissionDrawer from './components/PermissionDrawer.vue'
import { roleListApi, addOrUpdateRoleApi, bindRoleResourceApi, deleteRoleApi } from '@/api/modules/system'
import { System } from '@/api/interface'
import { useHandleData } from '@/hooks/useHandleData'
import dayjs from 'dayjs'

const proTable = ref()

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 150 },
  { prop: 'code', label: '角色代码', width: 300 },
  { prop: 'name', label: '角色名称' },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 220,
    render: scope => {
      return dayjs(scope.row.createTime).format('YYYY-MM-DD')
    },
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      defaultValue: ['2023-01-01 00:00:00', '2023-12-30 23:59:00']
    }
  },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]

const drawerRef = ref<InstanceType<typeof RoleDrawer> | null>(null)
const permissDrawerRef = ref<InstanceType<typeof PermissionDrawer> | null>(null)

const openDrawer = (title: string, row: Partial<System.RoleResult> = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: addOrUpdateRoleApi,
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}

// 删除角色
const deleteRole = async (params: System.RoleResult) => {
  await useHandleData(deleteRoleApi, { id: [params.id] }, `删除【${params.name}】角色`)
  proTable.value.getTableList()
}

const openPermissDrawer = (row: Partial<System.RoleResult>) => {
  const params = {
    title: row.name ?? '',
    row: { ...row },
    api: bindRoleResourceApi,
    getTableList: proTable.value.getTableList
  }
  permissDrawerRef.value?.acceptParams(params)
}
</script>
