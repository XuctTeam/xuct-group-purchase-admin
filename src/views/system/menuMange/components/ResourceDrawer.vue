<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}菜单`">
    <el-form
      ref="ruleFormRef"
      label-width="160px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="父节点" prop="parentId">
        <el-tree-select
          v-model="menuParentValue"
          :data="menuParentListValue"
          :check-strictly="true"
          :render-after-expand="false"
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="meta.title" required>
        <el-input v-model="drawerProps.row!.meta!.title" placeholder="请填写菜单名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="菜单类型" required>
        <el-radio-group v-model="menuTypeChooseValue">
          <el-radio v-for="item in menuType" :key="item.label" :label="item.label">{{ item.value }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="menuTypeChooseValue !== '3'">
        <el-form-item label="路由路径" prop="path" required>
          <el-input v-model="drawerProps.row.path" placeholder="请填写路由路径" clearable></el-input>
        </el-form-item>
        <el-form-item label="组件名称" prop="name" required>
          <el-input v-model="drawerProps.row!.name" placeholder="请填写组件名称" clearable></el-input>
        </el-form-item>
      </template>
      <template v-if="menuTypeChooseValue === '1'">
        <el-form-item label="页面跳转" prop="redirect">
          <el-input v-model="drawerProps.row!.redirect" placeholder="请填写页面跳转地址" clearable></el-input>
        </el-form-item>
      </template>
      <template v-else-if="menuTypeChooseValue === '2' || menuTypeChooseValue === '4'">
        <el-form-item label="页面组件" prop="componentStr" required>
          <el-input v-model="drawerProps.row!.componentStr" placeholder="请填写页面组件" clearable></el-input>
        </el-form-item>
        <template v-if="menuTypeChooseValue === '4'">
          <el-form-item label="外链地址" prop="meta.isLink" required>
            <el-input v-model="drawerProps.row!.meta!.isLink" placeholder="请填外链地址" clearable></el-input>
          </el-form-item>
        </template>
      </template>
      <template v-else>
        <el-form-item label="权限标识" prop="perm" required>
          <el-input v-model="drawerProps.row.perm" placeholder="请填权限标识" clearable></el-input>
        </el-form-item>
      </template>
      <el-form-item label="图标" prop="meta.icon" required>
        <select-icon v-model:icon-value="drawerProps.row!.meta!.icon" placeholder="请选择图标"></select-icon>
      </el-form-item>
      <template v-if="menuTypeChooseValue !== '3'">
        <el-form-item label="是否菜单中隐藏" prop="meta.isHide" required>
          <el-select v-model="drawerProps.row!.meta!.isHide" placeholder="请选择是否隐藏" clearable>
            <el-option v-for="(item, index) in disableStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否全屏显示" prop="meta.isFull" required>
          <el-select v-model="drawerProps.row!.meta!.isFull" placeholder="请选择是否全屏" clearable>
            <el-option v-for="(item, index) in disableStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否固定在标签页" prop="meta.isAffix" required>
          <el-select v-model="drawerProps.row!.meta!.isAffix" placeholder="请选择是否固定在标签页" clearable>
            <el-option v-for="(item, index) in disableStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否采用页面缓存" prop="meta.isKeepAlive" required>
          <el-select v-model="drawerProps.row!.meta!.isKeepAlive" placeholder="请选择是否采用页面缓存" clearable>
            <el-option v-for="(item, index) in disableStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="排序" prop="sort" required>
        <el-input-number v-model="drawerProps.row.sort" :min="1" :max="10" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from 'vue'
import { disableStatus, menuType } from '@/utils/serviceDict'
import { ElMessage, FormInstance } from 'element-plus'
import SelectIcon from '@/components/SelectIcon/index.vue'
import { getMenuTree } from '@/api/modules/system'
import { System } from '@/api/interface'

const rules = reactive({
  'meta.title': [{ required: true, message: '请填写菜单名称' }],
  path: [{ required: true, message: '请填写路由路径' }],
  name: [{ required: true, message: '请填写组件名称' }],
  redirect: [{ required: true, message: '请填写页面跳转地址' }],
  componentStr: [{ required: true, message: '请填写页面组件' }],
  'meta.isLink': [{ required: true, message: '请填外链地址' }],
  perm: [{ required: true, message: '请填写权限标识' }],
  'meta.icon': [{ required: true, message: '请选择图标' }]
})

interface DrawerProps {
  title: string
  isView: boolean
  row: Partial<Menu.MenuDetailOptions>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}

const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: '',
  row: {}
})
const menuTypeChooseValue = ref<string>('2')
const menuParentValue = ref('-1')
const menuParentListValue = reactive<System.MenuResult[]>([])

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  const { row, ...otherParams } = params
  drawerProps.value = Object.assign(
    {},
    { ...otherParams },
    {
      row: {
        ...row,
        componentStr: !row.component || row.component instanceof Promise ? '' : row.component + ''
      }
    }
  )
  menuTypeChooseValue.value = drawerProps.value.row.category ?? '2'
  menuParentValue.value = drawerProps.value.row.parentId ?? '-1'
  /** 加载菜单树 */
  initMenuTree()
  drawerVisible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      const { meta, componentStr, name, ...resource } = drawerProps.value.row
      let formData = {
        parentId: menuParentValue.value,
        component: componentStr,
        category: menuTypeChooseValue.value,
        pathName: name
      }
      Object.assign(
        formData,
        {
          title: meta?.title,
          icon: meta?.icon,
          link: meta?.isLink,
          hide: meta?.isHide,
          full: meta?.isFull,
          affix: meta?.isAffix,
          keepAlive: meta?.isKeepAlive
        },
        { ...resource }
      )
      await drawerProps.value.api!(formData)
      ElMessage.success({ message: `${drawerProps.value.title}菜单成功！` })
      drawerProps.value.getTableList!()
      drawerVisible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

const initMenuTree = async () => {
  const { data } = await getMenuTree()
  const menuOption = { value: '-1', label: '顶级菜单', children: data }
  menuParentListValue.length = 0
  menuParentListValue.push(...[menuOption])
}

defineExpose({
  acceptParams
})
</script>
