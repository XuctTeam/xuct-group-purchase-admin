<!--
 * @Author: Derek Xu
 * @Date: 2023-05-23 14:50:26
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-24 14:11:24
 * @FilePath: \xuct-group-purchase-admin\src\views\members\orderManage\detail.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="card content-box">
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
</template>

<script setup lang="ts" name="orderManageDetail">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderDetailApi } from '@/api/modules/members'
import { Members } from '@/api/interface'
import dayjs from 'dayjs'
import type { TagProps } from 'element-plus'

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
  if (orderValue.value?.coupon?.couponPrice) {
    return orderValue.value?.coupon?.couponPrice / 1000 + '元'
  }
  return '--'
})

const couponFullPrice = computed(() => {
  if (orderValue.value?.coupon?.couponFullPrice) {
    return orderValue.value?.coupon?.couponFullPrice / 1000 + '元'
  }
  return '--'
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
