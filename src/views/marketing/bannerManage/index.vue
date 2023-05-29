<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-17 19:04:37
 * @FilePath: \xuct-group-purchase-admin\src\views\marketing\bannerManage\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="轮播图列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :request-api="bannerListApi"
      :pagination="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'banner:manage:add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')"
          >新增轮播图</el-button
        >
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" v-auth="'banner:manage:edit'" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button type="danger" v-auth="'banner:manage:del'" link :icon="Delete" @click="deleteRole(scope.row)">删除</el-button>
      </template>
    </ProTable>

    <banner-drawer ref="drawerRef" />
  </div>
</template>
<script setup lang="tsx" name="bannerManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import TableImageTip from '@/components/TableImageTip/index.vue'
import BannerDrawer from './components/BannerDrawer.vue'
import { Delete, EditPen, CirclePlus } from '@element-plus/icons-vue'
import { bannerListApi, addBannerApi, editBannerApi, deleteBannerApi, changeBannerApi } from '@/api/modules/marketing'
import { Marketing } from '@/api/interface'
import { useHandleData } from '@/hooks/useHandleData'
import { bannerStatus } from '@/utils/serviceDict'

const proTable = ref()

// 表格配置项
const columns: ColumnProps<Marketing.BannerResult>[] = [
  { type: 'index', label: '#', width: 150 },
  { prop: 'title', label: '标题', search: { el: 'input' } },
  { prop: 'router', label: '跳转路径' },
  {
    prop: 'image',
    label: '图片',
    width: 200,
    render: scope => {
      return <TableImageTip uri={scope.row.image}></TableImageTip>
    }
  },
  {
    prop: 'status',
    label: '状态',
    enum: bannerStatus,
    width: 200,
    search: { el: 'select' },
    fieldNames: { label: 'label', value: 'value' },
    render: scope => {
      return (
        <el-switch
          model-value={scope.row.status}
          active-text={scope.row.status ? '启用' : '禁用'}
          active-value={1}
          inactive-value={0}
          onClick={() => changeStatus(scope.row)}
        />
      )
    }
  },
  { prop: 'sort', label: '排序' },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]

// 切换轮播图状态
const changeStatus = async (row: Marketing.BannerResult) => {
  await useHandleData(changeBannerApi, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.title}】状态`)
  proTable.value.getTableList()
}

// 删除分类
const deleteRole = async (params: Marketing.BannerResult) => {
  await useHandleData(deleteBannerApi, { id: [params.id] }, `删除【${params.title}】轮播图`)
  proTable.value.getTableList()
}

const drawerRef = ref<InstanceType<typeof BannerDrawer> | null>(null)

const openDrawer = (title: string, row: Partial<Marketing.BannerResult> = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: title === '编辑' ? editBannerApi : addBannerApi,
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>
