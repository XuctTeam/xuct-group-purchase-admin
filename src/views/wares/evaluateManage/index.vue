<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-30 14:59:00
 * @FilePath: \xuct-group-purchase-admin\src\views\wares\evaluateManage\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="商品评价列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :request-api="waresEvaluateListApi"
    >
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" v-auth="'evaluate:manage:view'" link :icon="View" @click="openDrawer(scope.row)"
          >查看</el-button
        >
        <el-button type="danger" v-auth="'evaluate:manage:del'" link :icon="Delete" @click="deleteWaresEvaluate(scope.row)"
          >删除</el-button
        >
      </template>
    </ProTable>

    <evaluate-drawer ref="drawerRef" />
  </div>
</template>
<script setup lang="tsx" name="evaluateManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { Delete, View } from '@element-plus/icons-vue'
import TableImageTip from '@/components/TableImageTip/index.vue'
import { deleteWareEvaluateApi, waresEvaluateListApi } from '@/api/modules/wares'
import { Wares } from '@/api/interface'
import EvaluateDrawer from './components/EvaluateDrawer.vue'
import dayjs from 'dayjs'
import { useHandleData } from '@/hooks/useHandleData'

const proTable = ref()

// 表格配置项
const columns: ColumnProps<Wares.WaresEvaluateResult>[] = [
  { type: 'index', label: '#', width: 150 },
  { prop: 'memberName', label: '评价人', search: { el: 'input' } },
  {
    prop: 'memberAvatar',
    label: '评价人头像',
    width: 200,
    render: scope => {
      return <TableImageTip uri={scope.row.memberAvatar} pop-width={220} img-height={200} img-width={200}></TableImageTip>
    }
  },
  { prop: 'waresName', label: '商品名称', search: { el: 'input' } },
  {
    prop: 'createTime',
    label: '评价时间',
    width: 220,
    render: scope => {
      return dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    prop: 'waresFirstDrawing',
    label: '商品图片',
    width: 200,
    render: scope => {
      return <TableImageTip uri={scope.row.waresFirstDrawing}></TableImageTip>
    }
  },
  {
    prop: 'rate',
    label: '评分'
  },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]
const drawerRef = ref<InstanceType<typeof EvaluateDrawer> | null>(null)

const openDrawer = (row: Partial<Wares.WaresEvaluateResult> = {}) => {
  const params = {
    row: { ...row }
  }
  drawerRef.value?.acceptParams(params)
}

// 删除评价
const deleteWaresEvaluate = async (params: Wares.WaresEvaluateResult) => {
  await useHandleData(deleteWareEvaluateApi, { id: [params.id] }, `删除【${params.waresName}】的评价`)
  proTable.value.getTableList()
}
</script>
