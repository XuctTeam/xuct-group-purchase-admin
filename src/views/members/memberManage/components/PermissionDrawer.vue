<!--
 * @Author: Derek Xu
 * @Date: 2023-05-11 11:42:29
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-05-17 22:59:59
 * @FilePath: \xuct-group-purchase-admin\src\views\system\roleManage\components\PermissionDrawer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved. 
-->
<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`【${drawerProps.title}】设置权限`">
    <el-tree
      ref="treeRef"
      :data="menuParentListValue"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :props="defaultProps"
    />
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="PermissionDrawer">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { System } from '@/api/interface'
import { getMenuTree, getRoleResourceApi } from '@/api/modules/system'
import { ElTree } from 'element-plus'

const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'label'
}

interface DrawerProps {
  title: string
  row: Partial<System.RoleResult>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}

const menuParentListValue = reactive<System.MenuResult[]>([])
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
  row: {}
})

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params
  /** 加载菜单树 */
  initMenuTree(params.row?.id || '')
  drawerVisible.value = true
}

const handleSubmit = async () => {
  const resourceIds = treeRef.value?.getCheckedKeys(false)
  const roleId = drawerProps.value.row.id
  try {
    await drawerProps.value.api!({ roleId, resourceIds })
    ElMessage.success({ message: `设置权限成功！` })
    drawerProps.value.getTableList!()
    drawerVisible.value = false
  } catch (error) {
    console.log(error)
  }
}

const initMenuTree = async (roleId: string) => {
  const { data } = await getMenuTree(1)
  const menuOption = { id: -1, value: '-1', label: '全部', children: data }
  menuParentListValue.length = 0
  menuParentListValue.push(...[menuOption])

  if (!roleId) {
    return
  }
  const result = await getRoleResourceApi(roleId)
  console.log('勾选权限', result.data)
  treeRef.value?.setCheckedKeys(result.data)
}

defineExpose({
  acceptParams
})
</script>
