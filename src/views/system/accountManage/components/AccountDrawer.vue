<!--
 * @Author: Derek Xu
 * @Date: 2023-05-11 11:42:29
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-17 23:01:32
 * @FilePath: \xuct-group-purchase-admin\src\views\system\accountManage\components\AccountDrawer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}账号`">
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="账号" prop="username" required>
        <el-input v-model="drawerProps.row!.username" placeholder="请填写账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname" required>
        <el-input v-model="drawerProps.row!.nickname" placeholder="请填写昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="avatar" required>
        <UploadImg v-model:image-url="drawerProps.row!.avatar" width="135px" height="135px" :file-size="3">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传头像</span>
          </template>
          <template #tip> 头像大小不能超过 3M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="drawerProps.row!.phone" placeholder="请填写手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleId" required>
        <el-select v-model="drawerProps.row!.roleId" placeholder="请选择角色" size="large">
          <el-option v-for="item in roleSelectOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="AccountDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import UploadImg from '@/components/Upload/Img.vue'
import { User, SelectResult } from '@/api/interface'
import { getRoleSelectApi } from '@/api/modules/user'

const rules = reactive({
  username: [{ required: true, message: '请填写账号' }],
  nickname: [{ required: true, message: '请填写昵称' }],
  avatar: [{ required: true, message: '请上传头像' }],
  roleId: [{ required: true, message: '请选择角色' }]
})

const roleSelectOptions = reactive<SelectResult[]>([])

interface DrawerProps {
  title: string
  isView: boolean
  row: Partial<User.ResUser>
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
  //加载角色
  initRoleSelect()
  drawerVisible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      await drawerProps.value.api!(drawerProps.value.row)
      ElMessage.success({ message: `${drawerProps.value.title}账号成功！` })
      drawerProps.value.getTableList!()
      drawerVisible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

const initRoleSelect = async () => {
  const { data } = await getRoleSelectApi()
  roleSelectOptions.length = 0
  roleSelectOptions.push(...data)
}

defineExpose({
  acceptParams
})
</script>
