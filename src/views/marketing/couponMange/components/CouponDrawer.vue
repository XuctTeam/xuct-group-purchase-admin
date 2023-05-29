<!--
 * @Author: Derek Xu
 * @Date: 2023-05-11 11:42:29
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-22 17:37:42
 * @FilePath: \xuct-group-purchase-admin\src\views\marketing\couponMange\components\CouponDrawer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}优惠券`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="drawerProps.row!.name" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="price" required>
        <el-input v-model="drawerProps.row!.price" type="number" placeholder="0.5-99999" clearable>
          <template #append>元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="满减" prop="fullPrice" required>
        <el-input v-model="drawerProps.row!.fullPrice" type="number" placeholder="0-99999" clearable>
          <template #prepend>满</template>
          <template #append>元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="有效期" prop="effective" required>
        <el-input v-model="drawerProps.row!.effective" type="number" clearable> <template #append>天</template></el-input>
      </el-form-item>
      <el-form-item label="每人领取" prop="memberHasMax" required>
        <el-input v-model="drawerProps.row!.memberHasMax" type="number" placeholder="0-99999" clearable>
          <template #append>张</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="waresType" required>
        <el-select v-model="drawerProps.row!.waresType" placeholder="请选择商品类型">
          <el-option v-for="item in couponWaresType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="drawerProps.row!.waresType === 1" label="商品选择" prop="waresIds" required>
        <el-select v-model="drawerProps.row!.waresIds" multiple placeholder="请选择商品">
          <el-option v-for="item in waresSelect" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="CouponDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Marketing, SelectResult } from '@/api/interface'
import { couponWaresType } from '@/utils/serviceDict'
import { getWaresSelected } from '@/api/modules/wares'
import { getCouponWaresIds } from '@/api/modules/marketing'

const rules = reactive({
  name: [{ required: true, message: '请填写标题' }],
  price: [{ required: true, message: '请填写金额' }],
  fullPrice: [{ required: true, message: '请输入满减金额' }],
  effective: [{ required: true, message: '请输入有效期' }],
  memberHasMax: [{ required: true, message: '请输入每人限领个数' }],
  waresType: [{ required: true, message: '请选择商品类型' }],
  waresIds: [{ required: true, message: '请选择指定商品' }]
})

interface DrawerProps {
  title: string
  isView: boolean
  row: Partial<Marketing.CouponResult>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}

const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: '',
  row: {}
})
const waresSelect = reactive<SelectResult[]>([])

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params
  initWaresSelected()
  drawerVisible.value = true
}

const initWaresSelected = async () => {
  const { data } = await getWaresSelected()
  waresSelect.length = 0
  waresSelect.push(...data)
  if (drawerProps.value.row && drawerProps.value.row.waresType === 1) {
    const result = await getCouponWaresIds(drawerProps.value.row.id ?? '')
    drawerProps.value.row.waresIds = result.data
  }
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      await drawerProps.value.api!(drawerProps.value.row)
      ElMessage.success({ message: `${drawerProps.value.title}优惠券成功！` })
      drawerProps.value.getTableList!()
      drawerVisible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

defineExpose({
  acceptParams
})
</script>
