<!--
 * @Author: Derek Xu
 * @Date: 2023-05-15 16:55:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-29 11:42:45
 * @FilePath: \xuct-group-purchase-admin\src\views\wares\waresManage\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable ref="proTable" title="用户列表" row-key="id" :indent="30" :columns="columns" :request-api="getWaresListApi">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'wares:manage:add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增商品</el-button>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->

      <template #operation="scope">
        <el-button type="primary" v-auth="'wares:manage:view'" link :icon="View" @click="openDrawer('查看', scope.row)"
          >查看</el-button
        >
        <el-button
          type="primary"
          v-auth="'wares:manage:edit'"
          link
          :icon="EditPen"
          :disabled="scope.row.status === 1"
          @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button type="danger" v-auth="'wares:manage:del'" link :icon="Delete" @click="deleteWares(scope.row)">删除</el-button>
      </template>
    </ProTable>
  </div>
  <wares-drawer ref="drawerRef"></wares-drawer>
</template>
<script setup lang="tsx" name="waresManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import TableImageTip from '@/components/TableImageTip/index.vue'
import WaresDrawer from './components/WaresDrawer.vue'
import { ElMessage } from 'element-plus'
import { Delete, EditPen, CirclePlus, View } from '@element-plus/icons-vue'
import { Wares } from '@/api/interface'
import { waresStatus } from '@/utils/serviceDict'
import { useHandleData } from '@/hooks/useHandleData'
import { getWaresListApi, deleteWaresApi, chageWaresStatusApi, addWaresApi, editWaresApi } from '@/api/modules/wares'
import dayjs from 'dayjs'

// 表格配置项
const columns: ColumnProps<Wares.WaresResult>[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'name', label: '名称', search: { el: 'input' } },
  {
    prop: 'firstDrawing',
    label: '图片',
    width: 200,
    render: scope => {
      return <TableImageTip uri={scope.row.firstDrawing}></TableImageTip>
    }
  },
  {
    prop: 'status',
    label: '状态',
    enum: waresStatus,
    width: 200,
    search: { el: 'select' },
    fieldNames: { label: 'label', value: 'value' },
    render: scope => {
      return (
        <el-switch
          model-value={scope.row.status}
          active-text={scope.row.status ? '已上架' : '未上架'}
          active-value={1}
          inactive-value={0}
          onClick={() => changeStatus(scope.row)}
        />
      )
    }
  },
  {
    prop: 'createTime',
    label: '开始时间',
    width: 220,
    render: scope => {
      return dayjs(scope.row.startTime).format('YYYY-MM-DD')
    }
  },
  {
    prop: 'createTime',
    label: '结束时间',
    width: 220,
    render: scope => {
      return dayjs(scope.row.endTime).format('YYYY-MM-DD')
    }
  },
  { prop: 'inventory', label: '库存', width: 100 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 260 }
]

const proTable = ref()
const drawerRef = ref<InstanceType<typeof WaresDrawer> | null>(null)

// 切换商品状态
const changeStatus = async (row: Wares.WaresResult) => {
  if (row.status === 0 && dayjs(row.endTime).isBefore(dayjs())) {
    ElMessage.error('商品已过期')
    return
  }
  await useHandleData(chageWaresStatusApi, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.name}】商品状态`)
  proTable.value.getTableList()
}

// 删除用户信息
const deleteWares = async (params: Wares.WaresResult) => {
  await useHandleData(deleteWaresApi, { id: [params.id] }, `删除【${params.name}】商品`)
  proTable.value.getTableList()
}

const openDrawer = (
  title: string,
  row: Partial<Wares.WaresResult> = {
    inventory: 1,
    timeStr: []
  }
) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: title === '编辑' ? editWaresApi : addWaresApi,
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>
