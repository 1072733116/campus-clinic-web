<template>
  <el-dialog
    v-model="dialogVisible"
    title="修改密码"
    width="30%"
    center
    draggable
    destroy-on-close
    @open="handleOpenClick"
  >
    <div class="form">
      <el-form ref="formRef" :model="formData" label-width="80" size="large" :rules="rules">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="formData.password" type="password" clearable show-password />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import useHomeStore from '@/store/main/home';
import useLoginStore from '@/store/login';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';

const homeStore = useHomeStore();
const loginStore = useLoginStore();

const dialogVisible = ref<boolean>(false);
const openDialog = () => {
  dialogVisible.value = true;
};
const formRef = ref<null | FormInstance>(null);
const formData = reactive({
  password: ''
});
const rules = {
  password: [{ required: true, trigger: 'blur' }]
};
const handleOpenClick = () => {
  formData.password = '';
};
const handleConfirmClick = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      let acc = loginStore.loginUserInfo.account;
      const account = {
        account: acc,
        ...formData
      };
      homeStore.updateDoctorPasswordAction(account).then(() => {
        ElMessage({
          type: 'success',
          showClose: true,
          message: '操作成功',
          center: true,
          duration: 1500
        });
      });
    }
  });
  dialogVisible.value = false;
};

defineExpose({
  openDialog
});
</script>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
</style>
