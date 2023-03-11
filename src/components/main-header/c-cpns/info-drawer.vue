<template>
  <el-drawer v-model='drawerVisible'
             :destroy-on-close='true'
             size='420px'
             title='个人信息'>
    <el-form ref='formRef'
             :model='formData'
             :rules='rules'
             label-width='90'
             size='large'
             label-suffix=' :'
             :disabled='disabled'
    >
      <el-form-item label='账号' prop='account'>
        <el-input v-model='formData.account' />
      </el-form-item>
      <el-form-item label='姓名' prop='name'>
        <el-input v-model='formData.name' />
      </el-form-item>
      <el-form-item label='手机号码' prop='phone'>
        <el-input v-model='formData.phone' />
      </el-form-item>
      <el-form-item label='性别' prop='gender'>
        <el-select v-model='formData.gender'>
          <el-option label='男' :value='0'></el-option>
          <el-option label='女' :value='1'></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click='disabled = !disabled'>{{ disabled ? '编辑' : '取消编辑' }}</el-button>
      <el-button type='primary' @click='handleConfirmClick'>确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import useLoginStore from '@/store/login';
import useHomeStore from '@/store/main/home';
import { storeToRefs } from 'pinia';
import type{ FormInstance } from 'element-plus';

const homeStore = useHomeStore();
const loginStore = useLoginStore();
const { loginUserInfo } = storeToRefs(loginStore);

const drawerVisible = ref<boolean>(false);
const disabled = ref<boolean>(true);
const formRef = ref<null | FormInstance>(null);
const rules = {
  account: [{ required: true, message: '请输入帐号' }],
  name: [{ required: true, message: '请输入姓名' }],
  phone: [{ required: true, message: '请输入手机号码' }],
  gender: [{ required: true, message: '请选择性别' }]
};
const formData = reactive({ ...loginUserInfo.value });

const openDialog = () => {
  drawerVisible.value = true;
};

const handleConfirmClick = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const doctor = { ...formData };
      homeStore.updateDoctorInfoAction(doctor).then(async () => {
        await loginStore.getLoginUserInfoAction(doctor.account);
        disabled.value = true;
        drawerVisible.value = false;
        ElMessage({
          type: 'success',
          showClose: true,
          message: '编辑成功',
          center: true,
          duration: 1500
        });
      });
    }
  });
};

defineExpose({
  openDialog
});
</script>

<style scoped>

</style>
