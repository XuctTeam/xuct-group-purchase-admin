<!--
 * @Author: Derek Xu
 * @Date: 2023-05-23 14:50:26
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-25 18:48:12
 * @FilePath: \xuct-group-purchase-admin\src\views\services\refundManage\detail.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="card content-box">
    <div class="content-box-inner">
      <el-descriptions :title="`订单${orderValue?.id}详情`" :column="3" border>
        <el-descriptions-item label="下单时间">{{ createTime }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag :type="tagType">{{ tagLabel }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品总数">{{ orderValue?.waresNum }}</el-descriptions-item>
        <el-descriptions-item label="会员昵称">{{ orderValue?.member.nickname }}</el-descriptions-item>
        <el-descriptions-item label="会员头像">
          <el-image style="width: 40px; height: 40px" :src="orderValue?.member.avatar" />
        </el-descriptions-item>
        <el-descriptions-item label="会员ID" :span="2">{{ orderValue?.member.openId }}</el-descriptions-item>

        <el-descriptions-item label="收货人">{{ orderValue?.address.userName }}</el-descriptions-item>
        <el-descriptions-item label="收货电话">{{ orderValue?.address.telNumber }}</el-descriptions-item>
        <el-descriptions-item label="收货地址">{{
          `${orderValue?.address.provinceName}${orderValue?.address.cityName}${orderValue?.address.countyName}${orderValue?.address.detailInfo}`
        }}</el-descriptions-item>
        <el-descriptions-item label="优惠券名称">{{ orderValue?.coupon?.couponName ?? '--' }}</el-descriptions-item>
        <el-descriptions-item label="优惠券金额">{{ couponPrice }}</el-descriptions-item>
        <el-descriptions-item label="优惠券满减">{{ couponFullPrice }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions title="退单信息" :column="1" border>
        <el-descriptions-item label="退单时间">{{ refundTime }}</el-descriptions-item>
        <el-descriptions-item label="退单状态">{{ refundStatus }}</el-descriptions-item>
        <el-descriptions-item label="退单类型">{{ refundType }}</el-descriptions-item>
        <el-descriptions-item label="退单原因">{{ orderValue?.refundReason }}</el-descriptions-item>
        <el-descriptions-item label="上传图片">
          <el-image
            v-for="(item, i) in orderValue?.refundImages?.split(',')"
            :key="i"
            :src="item"
            fit="scale-down"
            style="width: 100px; height: 100px; margin-right: 10px"
          ></el-image>
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions title="审核信息" :column="1" border>
        <el-descriptions-item label="退单类型">{{ refundAuditTime }}</el-descriptions-item>
        <el-descriptions-item label="审核意见">{{ orderValue?.refundAuditReason }}</el-descriptions-item>
      </el-descriptions>
      <el-divider content-position="left">订单明细</el-divider>
      <el-table :data="orderValue?.items" border>
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
    </div>
  </div>
</template>

<script setup lang="ts" name="orderManageDetail">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderDetailApi } from '@/api/modules/members'
import { Members } from '@/api/interface'
import dayjs from 'dayjs'
import type { TagProps } from 'element-plus'
import { memberRefundOrderType, memberRefundOrderStatus } from '@/utils/serviceDict'

const route = useRoute()

type Item = { type: TagProps['type']; label: string; key: string }

const statusTag = ref<Item[]>([
  { type: '', label: '待支付', key: '1' },
  { type: 'danger', label: '待配送', key: '2' },
  { type: 'warning', label: '待收货 ', key: '3' },
  { type: 'success', label: '已完成', key: '4' }
])

const orderValue = ref<Members.MemberOrderResult>()

onMounted(() => {
  const { id } = route.params
  if (!id) {
    return
  }
  initOrderData(id + '')
})

const createTime = computed(() => {
  return dayjs(orderValue.value?.createTime).format('YYYY-MM-DD HH:mm:ss')
})

const tagType = computed(() => {
  const tag = statusTag.value.find(i => Number.parseInt(i.key) === orderValue.value?.status)
  return tag?.type
})

const tagLabel = computed(() => {
  const tag = statusTag.value.find(i => Number.parseInt(i.key) === orderValue.value?.status)
  return tag?.label
})

const couponPrice = computed(() => {
  if (!orderValue.value?.coupon?.couponPrice) {
    return '--'
  }
  return orderValue.value?.coupon?.couponPrice / 1000 + '元'
})

const couponFullPrice = computed(() => {
  if (!orderValue.value?.coupon?.couponFullPrice) {
    return '--'
  }
  return orderValue.value?.coupon?.couponFullPrice / 1000 + '元'
})

const refundTime = computed(() => {
  if (!orderValue.value?.refundTime) {
    return '--'
  }
  return dayjs(orderValue.value?.refundTime).format('YYYY-MM-DD HH:mm:ss')
})

const refundType = computed(() => {
  return memberRefundOrderType.find(item => item.value === orderValue.value?.refundType)?.label
})

const refundStatus = computed(() => {
  return memberRefundOrderStatus.find(item => item.value === orderValue.value?.refundStatus)?.label
})

const refundAuditTime = computed(() => {
  if (!orderValue.value?.refundAuditTime) {
    return '--'
  }
  return dayjs(orderValue.value?.refundAuditTime).format('YYYY-MM-DD HH:mm:ss')
})
const initOrderData = (id: string) => {
  getOrderDetailApi({ id })
    .then(res => {
      const { data } = res
      orderValue.value = data
    })
    .catch((err: any) => {
      console.log(err)
    })
}
</script>
<style>
.content-box .el-descriptions {
  padding: 10px 0 0 !important;
}
</style>
