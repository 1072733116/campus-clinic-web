<template>
  <div class='login-panel'>
    <div class='header'>
      <img src='@/assets/img/campus-logo.png' alt='广州城市理工学院'>
      <h2 class='title'>医务室后台系统</h2>
    </div>
    <login-form ref='loginformRef' @loadingCancelEvent='handleLoginBtnCancel'></login-form>
    <div class='controls'>
      <el-checkbox v-model='isKeepPassword' label='记住密码' size='large' />
    </div>
    <div class='login-btn'>
      <el-button icon='CircleClose' round size='large' @click='handleResetClick'>重置</el-button>
      <el-button icon='UserFilled' round size='large' type='primary' @click='handleLoginClick'
                 :loading='loginBtnLoading'>
        登录
      </el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import LoginForm from './login-form.vue';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { localCache } from '@/utils/cache';
import { LOGIN_IS_KEEP_PASSWORD } from '@/constant';

const loginBtnLoading = ref(false);
const handleLoginBtnCancel = (isLoading: boolean) => {
  loginBtnLoading.value = isLoading;
};
const isKeepPassword = ref<boolean>(localCache.getCache(LOGIN_IS_KEEP_PASSWORD) ?? false);
watch(isKeepPassword, (newValue) => {
  localCache.setCache(LOGIN_IS_KEEP_PASSWORD, newValue);
});
const loginformRef = ref<InstanceType<typeof LoginForm>>();
const handleLoginClick = () => {
  loginBtnLoading.value = true;
  loginformRef.value!.handleLogin(isKeepPassword.value);
};
const handleResetClick = () => {
  loginformRef.value!.handleReset();
};
onMounted(() => {
  //监听enter时间
  document.onkeydown = (e: any) => {
    e = window.event || e;
    if (e.code == 'Enter' || e.code == 'enter' || e.code === 'NumpadEnter') {
      if (loginBtnLoading.value) return;
      handleLoginClick();
    }
  };
});
onUnmounted(() => {
  document.removeEventListener("onkeydown",handleLoginClick)
})

</script>

<style lang='less' scoped>
.login-panel {
  //box-sizing: border-box;
  width: 330px;
  padding: 50px 40px 40px;
  border-radius: 10px;
  box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
  margin-bottom: 150px;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;

    img {
      width: 60px;
      height: 60px;
    }

    .title {
      font-size: 34px;
      padding: 0 0 0 15px;
      font-weight: bold;
      color: #34495e;
      white-space: nowrap;
    }
  }

  .controls {
    position: relative;
    bottom: 4px;
    padding-left: 4px;
  }
}

.login-btn {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  .el-button {
    width: 185px;
  }
}

.el-checkbox {
  height: 20px;
}
</style>
