<template>
  <div class="header-info">
    <div class="operation">
      <full-screen />
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user">
          <span class="username">{{ username }}</span>
          <el-avatar :size="35" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="openDialog('InfoRef')">
              <el-icon>
                <InfoFilled />
              </el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item @click="openDialog('passwordRef')">
              <el-icon>
                <Unlock />
              </el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleUserLogoutClick">
              <el-icon>
                <SwitchButton />
              </el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <password-dialog ref="passwordRef"></password-dialog>
    <info-drawer ref="infoRef"></info-drawer>
  </div>
</template>

<script setup lang="ts">
import FullScreen from '@/components/main-header/c-cpns/full-screen.vue';
import PasswordDialog from './passwordDialog.vue';
import InfoDrawer from './info-drawer.vue';
import { computed, ref } from 'vue';
import useLoginStore from '@/store/login';
import { ElMessageBox, ElMessage } from 'element-plus';
import useLogout from '@/hooks/useLogout';

const loginStore = useLoginStore();
const username = computed(() => loginStore.loginUserInfo.name);
const handleUserLogoutClick = () => {
  ElMessageBox.confirm('是否确认退出登录?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(
    (confirm) => {
      useLogout();
    },
    (cancel) => {}
  );
};

interface DialogExpose {
  openDialog: () => void;
}

const passwordRef = ref<null | DialogExpose>(null);
const infoRef = ref<null | DialogExpose>(null);
const openDialog = (refName: string) => {
  if (refName == 'passwordRef') {
    passwordRef.value?.openDialog();
  } else {
    infoRef.value?.openDialog();
  }
};
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 20px;
}

.info {
  .user {
    display: flex;
    align-items: center;
    cursor: pointer;

    .username {
      margin-right: 10px;
      font-size: 15px;
      color: var(--el-text-color-primary);
    }
  }
}
</style>
