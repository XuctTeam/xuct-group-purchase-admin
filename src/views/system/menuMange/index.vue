<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-15 11:07:29
 * @FilePath: \xuct-group-purchase-admin\src\views\system\menuMange\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="菜单列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :request-api="getMenuListApi"
      :pagination="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'sys:menu:add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增菜单</el-button>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="danger" link :icon="Delete" @click="deleteMenu(scope.row)">删除</el-button>
      </template>
    </ProTable>
  </div>

  <resource-drawer ref="drawerRef" />
</template>

<script setup lang="ts" name="menuMange">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { getMenuListApi } from '@/api/modules/system'
import { Delete, EditPen, CirclePlus } from '@element-plus/icons-vue'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import ResourceDrawer from './components/ResourceDrawer.vue'
import { menuType } from '@/utils/serviceDict'
import { addResourceApi, editResourceApi, deleteResourceApi } from '@/api/modules/system'

const proTable = ref()

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 150 },
  { prop: 'meta.title', label: '菜单名称', align: 'left', search: { el: 'input' } },
  {
    prop: 'category',
    label: '菜单类型',
    width: 120,
    tag: true,
    enum: menuType,
    search: { el: 'select' },
    fieldNames: { label: 'value', value: 'label' }
  },
  { prop: 'meta.icon', label: '菜单图标' },
  { prop: 'path', label: '菜单路径' },
  { prop: 'perm', label: '权限标识' },
  { prop: 'component', label: '组件路径', width: 300 },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]

// 删除菜单（示例、根据自己后端接口来）
const deleteMenu = async (params: Menu.MenuOptions) => {
  await useHandleData(deleteResourceApi, { path: [params.path] }, `删除【${params.meta.title}】菜单`)
  proTable.value.getTableList()
}

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof ResourceDrawer> | null>(null)
const openDrawer = (
  title: string,
  row: Partial<Menu.MenuOptions> = {
    sort: 1,
    meta: {
      icon: '',
      title: '',
      isAffix: false,
      isFull: false,
      isHide: false,
      isKeepAlive: true
    }
  }
) => {
  const { children, ...rowData } = row
  console.log(children)
  const params = {
    title,
    isView: title === '查看',
    row: { ...rowData },
    api: title === '新增' ? addResourceApi : title === '编辑' ? editResourceApi : undefined,
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>
