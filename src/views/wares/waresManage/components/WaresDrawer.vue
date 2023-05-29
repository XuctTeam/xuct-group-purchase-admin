<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="780px" :title="`${drawerProps.title}商品`">
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
        <el-input v-model="drawerProps.row!.name" placeholder="请先写商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="blurb" required>
        <el-input v-model="drawerProps.row!.blurb" placeholder="请先写简介" :rows="2" type="textarea" clearable></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="categoryId" required>
        <el-select v-model="drawerProps.row.categoryId" placeholder="请选择分类">
          <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="首页图片" prop="firstDrawing" required>
        <UploadImg v-model:image-url="drawerProps.row!.firstDrawing" width="135px" height="135px" :file-size="3">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传图片</span>
          </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="商品轮播图" prop="swiperImages">
        <UploadImgs v-model:file-list="fileList" width="250px" height="140px" :limit="3">
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>请上传图片</span>
          </template>
        </UploadImgs>
      </el-form-item>
      <el-form-item label="商品标签" prop="tagsArray" required>
        <el-checkbox-group v-model="drawerProps.row!.tagsArray" :min="1" :max="3">
          <el-checkbox v-for="tag in waresTags" :key="tag.label" :label="tag.value">{{ tag.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="时间" prop="timeStr" required>
        <el-date-picker
          v-model="drawerProps.row!.timeStr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始"
          end-placeholder="结束"
        />
      </el-form-item>

      <el-form-item label="库存" prop="inventory" required>
        <el-input-number v-model="drawerProps.row!.inventory" :min="1" />
      </el-form-item>
      <el-form-item label="商品单位" prop="unit" required>
        <el-input v-model="drawerProps.row!.unit" placeholder="请先写商品单位" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品详情" prop="detail">
        <wang-editor height="400px" v-model:value="detail" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts" name="WaresDrawer">
import { Wares } from '@/api/interface'
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import UploadImg from '@/components/Upload/Img.vue'
import UploadImgs from '@/components/Upload/Imgs.vue'
import WangEditor from '@/components/WangEditor/index.vue'
import dayjs from 'dayjs'
import { categoryListApi } from '@/api/modules/wares'
import { waresTags } from '@/utils/serviceDict'

interface DrawerProps {
  title: string
  isView: boolean
  row: Partial<Wares.WaresResult>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}

interface CategoryOpt {
  label: string
  value: string
}

const detail = ref('')
const fileList = ref<any>([])
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: '',
  row: {}
})
const categoryOptions = reactive<CategoryOpt[]>([])

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params
  /* 加载数据 */
  initData()
  drawerVisible.value = true
}

const rules = reactive({
  name: [{ required: true, message: '请填写商品名称' }],
  blurb: [{ required: true, message: '请输入简介' }],
  firstDrawing: [{ required: true, message: '请上传首页图片' }],
  timeStr: [{ required: true, message: '请选择日期' }],
  inventory: [{ required: true, message: '请输入库存' }],
  unit: [{ required: true, message: '请输入单位' }],
  tagsArray: [{ required: true, message: '请选择标签' }],
  categoryId: [{ required: true, message: '请选择分类' }]
})

const initData = async () => {
  const { data } = await categoryListApi({})
  categoryOptions.length = 0
  categoryOptions.push(
    ...data.map(item => {
      return {
        label: item.name,
        value: item.id ?? ''
      }
    })
  )
  if (!drawerProps.value.row.id) {
    return
  }
  detail.value = drawerProps.value.row.detail ?? ''
  fileList.value = drawerProps.value.row.swiperImages?.split(',').map(item => {
    return {
      url: item
    }
  })
  drawerProps.value.row.timeStr = [
    dayjs(drawerProps.value.row.startTime).format('YYYY-MM-DD'),
    dayjs(drawerProps.value.row.endTime).format('YYYY-MM-DD')
  ]
  drawerProps.value.row.tagsArray = drawerProps.value.row.tags?.split(',')
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      const { timeStr, tagsArray, ...formData } = drawerProps.value.row
      const swiperImages = fileList.value.map((img: any) => img.url).join(',')
      await drawerProps.value.api!(
        Object.assign(formData, {
          tags: tagsArray?.join(','),
          startTime: timeStr && timeStr[0] ? timeStr[0] : new Date(),
          endTime: timeStr && timeStr[1] ? timeStr[1] : new Date(),
          detail: detail.value,
          swiperImages
        })
      )
      ElMessage.success({ message: `${drawerProps.value.title}商品成功！` })
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
