<template>
  <el-dialog v-model="dialogVisible" :title="$t('header.changePassword')" width="500px" draggable>
    <el-form ref="formRef" :model="ruleForm" label-width="90px" :rules="rules">
      <el-form-item :label="$t('header.passLabel')" prop="pass" required>
        <el-input v-model="ruleForm.pass" type="password" />
      </el-form-item>
      <el-form-item :label="$t('header.checkPassLabel')" prop="checkPass" required>
        <el-input v-model="ruleForm.checkPass" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onUpdatePassword">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import md5 from 'js-md5'
import stringUtil from '@/utils/stringutils'
import { updatePasswordApi, logoutApi } from '@/api/modules/login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { LOGIN_URL } from '@/config'

const router = useRouter()
const userStore = useUserStore()

const { t } = useI18n()

const formRef = ref<FormInstance>()

const dialogVisible = ref(false)
const openDialog = () => {
  dialogVisible.value = true
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(t('header.passError')))
    return
  }
  if (!stringUtil.checkPassowrd(value)) {
    callback(new Error(t('header.passWrongError')))
    return
  }
  if (ruleForm.checkPass !== '') {
    if (!formRef.value) return
    formRef.value.validateField('checkPass', () => null)
  }
  callback()
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(t('header.checkPassError')))
  } else if (value !== ruleForm.pass) {
    callback(new Error(t('header.passNotEqual')))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }]
})

const ruleForm = reactive({
  pass: '',
  checkPass: ''
})

const onUpdatePassword = async () => {
  await formRef.value?.validate((valid, fields) => {
    if (valid) {
      updatePasswordApi(md5(ruleForm.pass))
        .then(() => {
          ElMessageBox.confirm('密码修改成功，退出后使用新密码登录?', 'Warning', {
            type: 'warning'
          })
            .then(() => {
              _logout()
            })
            .catch(() => {})
        })
        .catch((err: any) => {
          console.log(err)
        })
        .finally(() => {
          dialogVisible.value = false
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const _logout = async () => {
  // 1.执行退出登录接口
  await logoutApi()

  // 2.清除 Token
  userStore.setToken('')

  // 3.重定向到登陆页
  router.replace(LOGIN_URL)
}

defineExpose({ openDialog })
</script>
