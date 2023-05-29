<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-22 14:18:12
 * @FilePath: \xuct-group-purchase-admin\src\views\marketing\couponMange\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="优惠券列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :request-api="couponListApi"
      :pagination="true"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'coupon:manage:add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')"
          >新增优惠券</el-button
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
        <el-button type="primary" v-auth="'coupon:manage:edit'" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button type="danger" v-auth="'coupon:manage:del'" link :icon="Delete" @click="deleteRole(scope.row)">删除</el-button>
      </template>
    </ProTable>

    <coupon-drawer ref="drawerRef" />
  </div>
</template>
<script setup lang="tsx" name="couponMange">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import CouponDrawer from './components/CouponDrawer.vue'
import { Delete, EditPen, CirclePlus } from '@element-plus/icons-vue'
import { couponListApi, addCouponApi, editCouponApi, deleteCouponApi, changeCouponStatusApi } from '@/api/modules/marketing'
import { Marketing } from '@/api/interface'
import { useHandleData } from '@/hooks/useHandleData'
import { couponStatus, couponWaresType } from '@/utils/serviceDict'

const proTable = ref()

// 表格配置项
const columns: ColumnProps<Marketing.CouponResult>[] = [
  { type: 'index', label: '#', width: 150 },
  { prop: 'name', label: '名称', search: { el: 'input' } },
  { prop: 'price', label: '金额' },
  { prop: 'fullPrice', label: '满减金额' },
  { prop: 'effective', label: '有效期' },
  {
    prop: 'used',
    label: '状态',
    enum: couponStatus,
    width: 200,
    search: { el: 'select' },
    fieldNames: { label: 'label', value: 'value' },
    render: scope => {
      return (
        <el-switch
          model-value={scope.row.used}
          active-text={!scope.row.used ? '启用' : '禁用'}
          active-value={false}
          inactive-value={true}
          onClick={() => changeStatus(scope.row)}
        />
      )
    }
  },
  {
    prop: 'waresType',
    label: '使用范围',
    enum: couponWaresType,
    width: 200,
    search: { el: 'select' },
    fieldNames: { label: 'label', value: 'value' }
  },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]

// 切换轮播图状态
const changeStatus = async (row: Marketing.CouponResult) => {
  await useHandleData(changeCouponStatusApi, { id: row.id, status: row.used ? 0 : 1 }, `切换【${row.name}】状态`)
  proTable.value.getTableList()
}

// 删除优惠券
const deleteRole = async (params: Marketing.CouponResult) => {
  await useHandleData(deleteCouponApi, { id: [params.id] }, `删除【${params.name}】优惠券`)
  proTable.value.getTableList()
}

const drawerRef = ref<InstanceType<typeof CouponDrawer> | null>(null)

const openDrawer = (
  title: string,
  row: Partial<Marketing.CouponResult> = {
    effective: 1,
    waresType: 0
  }
) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: title === '编辑' ? editCouponApi : addCouponApi,
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>
