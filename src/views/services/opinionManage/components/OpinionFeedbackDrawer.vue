<!--
 * @Author: Derek Xu
 * @Date: 2023-05-25 14:14:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-29 18:34:23
 * @FilePath: \xuct-group-purchase-admin\src\views\services\opinionManage\components\OpinionFeedbackDrawer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-drawer
    class="el-drawer"
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="600px"
    :title="`回复${drawerProps.row.memberName}反馈`"
  >
    <el-form ref="ruleFormRef" label-width="120px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="反馈内容" prop="feedback">
        <el-input v-model="drawerProps.row.feedback" type="textarea" :rows="5" placeholder="反馈内容" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts" name="OpinionFeedbackDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Members } from '@/api/interface'

interface DrawerProps {
  row: Partial<Members.MemberOpinionResult>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}

const drawerProps = ref<DrawerProps>({
  row: {}
})

const rules = reactive({
  feedback: [{ required: true, message: '请输入反馈内容' }]
})

const drawerVisible = ref(false)

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params
  drawerVisible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      await drawerProps.value.api!(drawerProps.value.row)
      ElMessage.success({ message: `反馈${drawerProps.value.row.memberName}成功！` })
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
