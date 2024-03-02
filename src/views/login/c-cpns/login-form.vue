<template>
  <div class="login-form">
    <el-form size="large" ref="formRef" :model="loginUser" :rules="formRules">
      <el-form-item prop="account">
        <el-input placeholder="工号" v-model="loginUser.account">
          <template #prefix>
            <el-icon class="el-input__icon">
              <user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码"
          show-password
          autocomplete="new-password"
          v-model="loginUser.password"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useLoginStore from '@/store/login';
import { localCache } from '@/utils/cache';
import getTimeState from '@/utils/timeState';
import { LOGIN_USER_ACCOUNT, LOGIN_USER_PASSWORD } from '@/constant';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElNotification } from 'element-plus';
import type { ILoginUser } from '@/types';

const emits = defineEmits(['loadingCancelEvent']);

const router = useRouter();
const loginStore = useLoginStore();
const formRef = ref<FormInstance>();
const formRules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入帐号', trigger: 'blur' },
    { pattern: /^[0-9a-z]{5,12}$/, message: '帐号必须是5~12位数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[0-9a-z]{5,}$/, message: '密码必须是6位长度以上', trigger: 'blur' }
  ]
});
const loginUser = reactive<ILoginUser>({
  account: localCache.getCache(LOGIN_USER_ACCOUNT) ?? '',
  password: localCache.getCache(LOGIN_USER_PASSWORD) ?? ''
});
const handleLogin = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const account = loginUser.account;
      const password = loginUser.password;
      loginStore
        .userLoginAction({ account, password })
        .then(() => {
          if (isKeepPassword) {
            localCache.setCache(LOGIN_USER_ACCOUNT, account);
            localCache.setCache(LOGIN_USER_PASSWORD, password);
          } else {
            localCache.removeCache(LOGIN_USER_ACCOUNT);
            localCache.removeCache(LOGIN_USER_PASSWORD);
          }
          emits('loadingCancelEvent', false);
          router.push('/main');
          ElNotification({
            title: getTimeState(),
            message: '欢迎登录 医务后台系统',
            type: 'success',
            duration: 3000
          });
        })
        .catch(() => {
          emits('loadingCancelEvent', false);
        });
    } else {
      ElMessage({
        message: '请填写正确的表单信息',
        type: 'error',
        duration: 2000
      });
      emits('loadingCancelEvent', false);
    }
  });
};
const handleReset = () => {
  formRef.value?.resetFields();
};

defineExpose({
  handleLogin,
  handleReset
});
</script>

<style scoped></style>
