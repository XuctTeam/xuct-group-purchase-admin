<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-22 17:42:58
 * @FilePath: \xuct-group-purchase-admin\src\views\members\memberManage\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="会员列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :request-api="membersListApi"
      :pagination="true"
    >
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" v-auth="'members:integral:add'" link :icon="Star" @click="openIntegralDialog(scope.row)"
          >设置积分</el-button
        >
        <el-button type="primary" v-auth="'members:coupon:push'" link :icon="Ticket" @click="openCouponDrawer(scope.row)"
          >发放优惠券</el-button
        >
      </template>
    </ProTable>

    <coupon-push-drawer ref="drawerRef"></coupon-push-drawer>
  </div>
</template>
<script setup lang="tsx" name="memberManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import { Star, Ticket } from '@element-plus/icons-vue'
import ProTable from '@/components/ProTable/index.vue'
import TableImageTip from '@/components/TableImageTip/index.vue'
import { membersListApi, addMemberCouponApi, changeMemberStatusApi } from '@/api/modules/members'
import CouponPushDrawer from './components/CouponPushDrawer.vue'
import { useHandleData } from '@/hooks/useHandleData'
import dayjs from 'dayjs'
import { memberStatus } from '@/utils/serviceDict'
import { Members } from '@/api/interface'

const proTable = ref()

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 150 },
  { prop: 'nickname', label: '昵称', search: { el: 'input' } },
  {
    prop: 'avatar',
    label: '图片',
    width: 200,
    render: scope => {
      return <TableImageTip uri={scope.row.avatar} pop-width={220} img-height={200} img-width={200}></TableImageTip>
    }
  },
  {
    prop: 'createTime',
    label: '注册时间',
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
  },
  {
    prop: 'status',
    label: '状态',
    enum: memberStatus,
    width: 200,
    search: { el: 'select' },
    fieldNames: { label: 'label', value: 'value' },
    render: scope => {
      return (
        <el-switch
          model-value={scope.row.status}
          active-text={scope.row.status === 0 ? '正常' : '禁用'}
          active-value={0}
          inactive-value={1}
          onClick={() => changeMemberStatus(scope.row)}
        />
      )
    }
  },
  { prop: 'phone', label: '电话', width: 220 },
  { prop: 'integral', label: '积分', width: 120 },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]

const drawerRef = ref<InstanceType<typeof CouponPushDrawer> | null>(null)

const changeMemberStatus = async (row: Members.MemberResult) => {
  await useHandleData(changeMemberStatusApi, { id: row.id, status: row.status ? 0 : 1 }, `切换【${row.nickname}】状态`)
  proTable.value.getTableList()
}

const openIntegralDialog = (row: Members.MemberResult) => {
  console.log(row)
}

const openCouponDrawer = (row: Members.MemberResult) => {
  const params = {
    row: { ...row },
    api: addMemberCouponApi,
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>
