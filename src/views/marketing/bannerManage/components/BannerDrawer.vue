<!--
 * @Author: Derek Xu
 * @Date: 2023-05-11 11:42:29
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-17 23:03:37
 * @FilePath: \xuct-group-purchase-admin\src\views\marketing\bannerManage\components\BannerDrawer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}轮播图`">
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="drawerProps.row!.title" placeholder="请填写标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="跳转路径" prop="router" required>
        <el-input v-model="drawerProps.row!.router" placeholder="请填写跳转路径" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="image" required>
        <UploadImg v-model:image-url="drawerProps.row!.image" width="135px" height="135px" :file-size="3">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传图片</span>
          </template>
          <template #tip> 图片大小不能超过 3M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="排序" prop="sort" required>
        <el-input v-model.number="drawerProps.row!.sort" type="number" placeholder="请填写排序" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="BannerDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Marketing } from '@/api/interface'
import UploadImg from '@/components/Upload/Img.vue'

const rules = reactive({
  title: [{ required: true, message: '请填写标题' }],
  router: [{ required: true, message: '请填写跳转路径' }],
  image: [{ required: true, message: '请上传图片' }],
  sort: [{ required: true, message: '请填写排序' }]
})

interface DrawerProps {
  title: string
  isView: boolean
  row: Partial<Marketing.BannerResult>
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
      ElMessage.success({ message: `${drawerProps.value.title}轮播图成功！` })
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
