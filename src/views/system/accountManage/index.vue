<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="用户列表"
      row-key="id"
      :indent="30"
      :columns="columns"
      :request-api="getUserList"
      :pagination="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'sys:user:add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增账号</el-button>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="success" v-auth="'sys:user:reset'" link :icon="Refresh" @click="resetPass(scope.row)"
          >重置密码</el-button
        >
        <el-button type="primary" v-auth="'sys:user:edit'" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button type="danger" v-auth="'sys:user:del'" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
  </div>

  <account-drawer ref="drawerRef"></account-drawer>
</template>

<script setup lang="tsx" name="accountManage">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { Delete, EditPen, CirclePlus, Refresh } from '@element-plus/icons-vue'
import { User } from '@/api/interface'
import { changeUserStatus, getUserList, resetUserPassWord, addUser, editUser, deleteUser } from '@/api/modules/user'
import { userStatus } from '@/utils/serviceDict'
import { useHandleData } from '@/hooks/useHandleData'
import AccountDrawer from './components/AccountDrawer.vue'
import dayjs from 'dayjs'

// 表格配置项
const columns: ColumnProps<User.ResUser>[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'username', label: '账号', width: 140, search: { el: 'input' } },
  { prop: 'nickname', label: '昵称' },
  {
    prop: 'avatar',
    label: '头像',
    width: 200,
    render: scope => {
      return <el-image style="width: 60px; height: 60px" src={scope.row.avatar} />
    }
  },
  {
    prop: 'status',
    label: '用户状态',
    enum: userStatus,
    search: { el: 'select' },
    fieldNames: { label: 'label', value: 'value' },
    render: scope => {
      return (
        <el-switch
          model-value={scope.row.status}
          active-text={scope.row.status ? '禁用' : '启用'}
          active-value={0}
          inactive-value={1}
          onClick={() => changeStatus(scope.row)}
        />
      )
    }
  },
  { prop: 'roleName', label: '角色' },
  { prop: 'phone', label: '电话', search: { el: 'input' } },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 220,
    render: scope => {
      return dayjs(scope.row.createTime).format('YYYY-MM-DD')
    },
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      defaultValue: ['2023-01-01 00:00:00', '2023-12-30 23:59:00']
    }
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 330 }
]

const proTable = ref()
const drawerRef = ref<InstanceType<typeof AccountDrawer> | null>(null)

// 切换用户状态
const changeStatus = async (row: User.ResUser) => {
  await useHandleData(changeUserStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】用户状态`)
  proTable.value.getTableList()
}

// 重置用户密码
const resetPass = async (params: User.ResUser) => {
  await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`)
  proTable.value.getTableList()
}

// 删除用户信息
const deleteAccount = async (params: User.ResUser) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`)
  proTable.value.getTableList()
}

const openDrawer = (title: string, row: Partial<User.ResUser> = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: title === '编辑' ? editUser : addUser,
    getTableList: proTable.value.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>
