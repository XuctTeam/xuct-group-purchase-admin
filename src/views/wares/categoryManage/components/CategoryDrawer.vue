<!--
 * @Author: Derek Xu
 * @Date: 2023-05-11 11:42:29
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-06-05 09:45:29
 * @FilePath: \xuct-group-purchase-admin\src\views\wares\categoryManage\components\CategoryDrawer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}分类`">
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="drawerProps.row!.name" placeholder="请填写分类名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image" required>
        <UploadImg v-model:image-url="drawerProps.row!.image" width="135px" height="135px" :file-size="3">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传图片</span>
          </template>
          <template #tip> 图片大小不能超过 3M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="排序" prop="sort" required>
        <el-input v-model="drawerProps.row!.sort" type="number" placeholder="请填写分类排序" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="CategoryDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Wares } from '@/api/interface'
import UploadImg from '@/components/Upload/Img.vue'

const rules = reactive({
  name: [{ required: true, message: '请填写分类名称' }],
  image: [{ required: true, message: '请上传图片' }],
  sort: [{ required: true, message: '请填写分类排序' }]
})

interface DrawerProps {
  title: string
  isView: boolean
  row: Partial<Wares.CategoryResult>
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
  drawerVisible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      await drawerProps.value.api!(drawerProps.value.row)
      ElMessage.success({ message: `${drawerProps.value.title}分类成功！` })
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
