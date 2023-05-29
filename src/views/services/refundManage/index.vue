<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-25 16:43:33
 * @FilePath: \xuct-group-purchase-admin\src\views\services\refundManage\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="订单列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :request-api="memberRefundOrderListApi"
      :pagination="true"
    >
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <template #expand="scope">
        <el-table :data="scope.row.items" border>
          <el-table-column label="商品名称" prop="waresName" />
          <el-table-column label="商品图片">
            <template #default="item">
              <el-image fit="cover" :src="item.row.waresFirstDrawing" style="width: 70px; height: 50px"> </el-image>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="price" />
          <el-table-column label="购买数量" prop="num" />
          <el-table-column label="商品单位" prop="waresUnit" />
        </el-table>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          v-if="scope.row.refundStatus === 1"
          v-auth="'services:refund:audit'"
          link
          :icon="Coordinate"
          @click="onAuditOrder(scope.row)"
          >审核</el-button
        >
      </template>
    </ProTable>
    <audit-dialog ref="drawerRef"></audit-dialog>
  </div>
</template>
<script setup lang="tsx" name="memberManage">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ColumnProps } from '@/components/ProTable/interface'
import { Coordinate } from '@element-plus/icons-vue'
import ProTable from '@/components/ProTable/index.vue'
import { memberRefundOrderListApi, memberRefundOrderAuditApi } from '@/api/modules/services'
import AuditDialog from './components/AuditDialog.vue'
import dayjs from 'dayjs'
import { memberRefundOrderStatus, memberRefundOrderType } from '@/utils/serviceDict'
import type { TagProps } from 'element-plus'
import { Members } from '@/api/interface'

const router = useRouter()

type Item = { type: TagProps['type']; label: string; key: string }

const statusTag = ref<Item[]>([
  { type: 'danger', label: '退单中', key: '1' },
  { type: 'success', label: '已完成', key: '2' }
])

// 表格配置项
const columns: ColumnProps<Members.MemberOrderResult>[] = [
  { type: 'expand', label: '商品详情', width: 100 },
  {
    prop: 'id',
    label: '订单ID',
    width: 220,
    render: scope => {
      return (
        <el-button type="primary" link onClick={() => pageToDetail(scope.row?.id ?? '')}>
          {scope.row.id}
        </el-button>
      )
    }
  },
  { prop: 'member.nickname', label: '会员昵称', search: { el: 'input' } },
  {
    prop: 'createTime',
    label: '下单时间',
    width: 200,
    render: scope => {
      return dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      defaultValue: ['2023-01-01 00:00:00', '2023-12-30 23:59:00']
    }
  },
  {
    prop: 'refundTime',
    label: '退单时间',
    width: 200,
    render: scope => {
      return dayjs(scope.row.refundTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'refundStatus',
    label: '退单状态',
    enum: memberRefundOrderStatus,
    width: 200,
    render: scope => {
      const tag = statusTag.value.find(i => Number.parseInt(i.key) === scope.row.refundStatus)
      return <el-tag type={tag?.type}>{tag?.label}</el-tag>
    }
  },
  {
    prop: 'refundType',
    label: '退单类型',
    enum: memberRefundOrderType,
    width: 200,
    fieldNames: { label: 'label', value: 'value' }
  },
  { prop: 'operation', label: '操作', width: 150, fixed: 'right' }
]

const onAuditOrder = (row: Members.MemberOrderResult) => {
  const params = {
    row: { ...row },
    api: memberRefundOrderAuditApi,
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}

const proTable = ref()
const drawerRef = ref<InstanceType<typeof AuditDialog> | null>(null)

// 跳转详情页
const pageToDetail = (id: string) => {
  router.push(`/services/refundManage/detail/${id}`)
}
</script>
