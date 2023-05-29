<!--
 * @Author: Derek Xu
 * @Date: 2023-05-11 11:42:29
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-22 16:26:45
 * @FilePath: \xuct-group-purchase-admin\src\views\members\memberManage\components\CouponPushDrawer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`【${drawerProps.row.nickname}】发放优惠券`">
    <el-form ref="ruleFormRef" label-width="120px" label-suffix=" :" :rules="rules" :model="formValue">
      <el-form-item label="优惠券" prop="couponId" required>
        <el-select v-model="formValue.couponId" placeholder="请选择优惠券" size="large">
          <el-option v-for="item in couponSelectOpts" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="过期时间" prop="times" required>
        <el-date-picker
          v-model="formValue.times"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="CouponPushDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Members, SelectResult } from '@/api/interface'
import { getCouponSelectedApi } from '@/api/modules/marketing'

interface DrawerProps {
  row: Partial<Members.MemberResult>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}

const formValue = reactive({
  memberId: '',
  couponId: '',
  times: ''
})

const rules = reactive({
  couponId: [{ required: true, message: '请选择优惠券' }],
  times: [{ required: true, message: '请选择生效日期' }]
})
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  row: {}
})

const shortcuts = [
  {
    text: '一天后',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() + 3600 * 1000 * 24)
      return [start, end]
    }
  },
  {
    text: '七天后',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '十天后',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  }
]

const couponSelectOpts = reactive<SelectResult[]>([])

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params
  Object.assign(formValue, { memberId: '', couponId: '', times: '' })
  //加载优惠券
  initCouponData()
  formValue.memberId = params.row.id ?? ''
  drawerVisible.value = true
}

const initCouponData = async () => {
  const { data } = await getCouponSelectedApi()
  couponSelectOpts.length = 0
  couponSelectOpts.push(...data)
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      await drawerProps.value.api!(formValue)
      ElMessage.success({ message: `发放优惠券成功！` })
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
