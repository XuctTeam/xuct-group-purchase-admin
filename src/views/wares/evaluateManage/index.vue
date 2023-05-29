<!--
 * @Author: Derek Xu
 * @Date: 2023-05-08 17:41:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-29 19:15:10
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
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'category:manage:add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')"
          >新增分类</el-button
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
        <el-button type="primary" v-auth="'category:manage:edit'" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button type="danger" v-auth="'category:manage:del'" link :icon="Delete" @click="deleteRole(scope.row)"
          >删除</el-button
        >
      </template>
    </ProTable>

    <category-drawer ref="drawerRef" />
  </div>
</template>
<script setup lang="ts" name="roleManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { Delete, EditPen, CirclePlus } from '@element-plus/icons-vue'
import { waresEvaluateListApi } from '@/api/modules/wares'
import { Wares } from '@/api/interface'
import dayjs from 'dayjs'

const proTable = ref()

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 150 },
  { prop: 'name', label: '分类名称' },
  { prop: 'sort', label: '排序' },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 220,
    render: scope => {
      return dayjs(scope.row.createTime).format('YYYY-MM-DD')
    }
  },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]

const openDrawer = (title: string, row: Partial<Wares.ReqWaresEvaluateParams> = {}) => {
  console.log(title, row)
  // const params = {
  //   title,
  //   isView: title === '查看',
  //   row: { ...row },
  //   api: title === '编辑' ? editCategoryApi : addCategoryApi,
  //   getTableList: proTable.value.getTableList
  // }
  // drawerRef.value?.acceptParams(params)
}

// 删除分类
const deleteRole = async (params: Wares.ReqWaresEvaluateParams) => {
  console.log(params)
  // await useHandleData(deleteCategoryApi, { id: [params.id] }, `删除【${params.name}】分类`)
  // proTable.value.getTableList()
}
</script>
