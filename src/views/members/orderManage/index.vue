<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-24 13:33:32
 * @FilePath: \xuct-group-purchase-admin\src\views\members\orderManage\index.vue
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
      :request-api="memberOrderListApi"
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
        <el-button type="primary" v-auth="'members:integral:add'" link :icon="Star" @click="openIntegralDialog(scope.row)"
          >设置积分</el-button
        >
        <el-button
          type="primary"
          v-if="scope.row.status === 2"
          v-auth="'members:order:deliver'"
          link
          :icon="Position"
          @click="deliverOrder(scope.row)"
          >发货</el-button
        >
      </template>
    </ProTable>

    <!-- <coupon-push-drawer ref="drawerRef"></coupon-push-drawer> -->
  </div>
</template>
<script setup lang="tsx" name="memberManage">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ColumnProps } from '@/components/ProTable/interface'
import { Star, Position } from '@element-plus/icons-vue'
import ProTable from '@/components/ProTable/index.vue'
import { memberOrderListApi, deliverOrderApi } from '@/api/modules/members'
import dayjs from 'dayjs'
import { memberOrderStatus } from '@/utils/serviceDict'
import { useHandleData } from '@/hooks/useHandleData'
import { Members } from '@/api/interface'
import type { TagProps } from 'element-plus'

const router = useRouter()
const proTable = ref()

type Item = { type: TagProps['type']; label: string; key: string }

const statusTag = ref<Item[]>([
  { type: '', label: '待支付', key: '1' },
  { type: 'danger', label: '待配送', key: '2' },
  { type: 'warning', label: '待收货 ', key: '3' },
  { type: 'success', label: '已完成', key: '4' }
])

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'expand', label: '商品详情', width: 100 },
  {
    prop: 'id',
    label: '订单ID',
    width: 220,
    render: scope => {
      return (
        <el-button type="primary" link onClick={() => pageToDetail(scope.row.id)}>
          {scope.row.id}
        </el-button>
      )
    }
  },
  { prop: 'member.nickname', label: '会员昵称' },
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
    prop: 'status',
    label: '订单状态',
    enum: memberOrderStatus,
    width: 200,
    search: { el: 'select' },
    fieldNames: { label: 'label', value: 'value' },
    render: scope => {
      const tag = statusTag.value.find(i => Number.parseInt(i.key) === scope.row.status)
      return <el-tag type={tag?.type}>{tag?.label}</el-tag>
    }
  },
  { prop: 'address.userName', label: '收货人' },
  { prop: 'address.telNumber', label: '收货电话' },
  {
    prop: 'rush',
    label: '是否催单',
    render: scope => {
      return scope.row.rush ? '是' : '否'
    }
  },
  { prop: 'operation', label: '操作', width: 150, fixed: 'right' }
]

const deliverOrder = async (row: Members.MemberOrderResult) => {
  await useHandleData(deliverOrderApi, { id: row.id, status: row.status ? 0 : 1 }, `订单【${row.id}】发货`)
  proTable.value.getTableList()
}

// 跳转详情页
const pageToDetail = (id: string) => {
  router.push(`/members/orderManage/detail/${id}`)
}
</script>
