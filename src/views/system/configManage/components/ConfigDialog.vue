<!--
 * @Author: Derek Xu
 * @Date: 2023-05-11 11:42:29
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-25 18:43:08
 * @FilePath: \xuct-group-purchase-admin\src\views\system\configManage\components\ConfigDialog.vue
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
    :title="`${drawerProps.title}系统参数`"
  >
    <el-form
      ref="ruleFormRef"
      label-width="80px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="内容" v-if="drawerProps.row.type !== 0" prop="content" required>
        <el-input v-model="drawerProps.row!.content" placeholder="请填写内容" clearable></el-input>
      </el-form-item>
      <el-form-item label="内容" v-else prop="wangContent">
        <wang-editor height="400px" v-model:value="contentValue" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="ConfigDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { System } from '@/api/interface'
import WangEditor from '@/components/WangEditor/index.vue'

const validateWang = (rule: any, value: any, callback: any) => {
  if (contentValue.value === '') {
    callback(new Error('请输入内容'))
    return
  }
  callback()
}

const rules = reactive({
  content: [{ required: true, message: '请填写内容' }],
  wangContent: [{ validator: validateWang, trigger: 'blur' }]
})
const contentValue = ref('')

interface DrawerProps {
  title: string
  isView: boolean
  row: Partial<System.AppConfigResult>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}

const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: '',
  row: {}
})

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params
  contentValue.value = drawerProps.value.row.content ?? ''
  drawerVisible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      const formData = {
        ...drawerProps.value.row,
        content: drawerProps.value.row.type === 0 ? contentValue.value : drawerProps.value.row.content
      }
      await drawerProps.value.api!(formData)
      ElMessage.success({ message: `${drawerProps.value.title}账号成功！` })
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
