<!--
 * @Author: Derek Xu
 * @Date: 2023-05-25 14:14:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-25 18:42:03
 * @FilePath: \xuct-group-purchase-admin\src\views\services\refundManage\components\AuditDialog.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-dialog
    class="el-dialog"
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="600px"
    :title="`审核${drawerProps.row.id}退单`"
  >
    <el-form ref="ruleFormRef" label-width="80px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="反馈内容" prop="content">
        <el-input v-model="contentValue" type="textarea" :rows="5" placeholder="反馈内容" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="danger" @click="handleSubmit(0)">不同意</el-button>
      <el-button type="primary" @click="handleSubmit(1)">同意</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts" name="AuditDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Members } from '@/api/interface'

interface DrawerProps {
  row: Partial<Members.MemberOrderResult>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}

const drawerProps = ref<DrawerProps>({
  row: {}
})

const validate = (rule: any, value: any, callback: any) => {
  if (contentValue.value === '') {
    callback(new Error('请输入内容'))
    return
  }
  callback()
}

const rules = reactive({
  content: [{ validator: validate, trigger: 'blur' }]
})
const contentValue = ref('')

const drawerVisible = ref(false)

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params
  drawerVisible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = (feedback: number) => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      const formData = {
        id: drawerProps.value.row.id,
        content: contentValue.value,
        feedback
      }
      await drawerProps.value.api!(formData)
      ElMessage.success({ message: `审核${drawerProps.value.row.id}退单成功！` })
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
