<template>
  <el-dropdown trigger='click'>
    <el-button type='primary' size='small'>
      <span class='more'>更多</span>
      <el-icon class='el-icon--right'>
        <arrow-down />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon='Remove' @click='handleCloseCurrentClick'>关闭当前</el-dropdown-item>
        <el-dropdown-item :icon='CircleClose' @click='handleCloseOtherClick'>关闭其它</el-dropdown-item>
        <el-dropdown-item :icon='FolderDelete' @click='handleCloseAllClick'>关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang='ts'>
import { Remove, CircleClose, FolderDelete } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import useMainStore from '@/store/main';
import { HOME_URL } from '@/config/config';

const route = useRoute();
const router = useRouter();
const mainStore = useMainStore();
//关闭当前
const handleCloseCurrentClick = () => {
  if (route.meta.isFixed) return;
  mainStore.removeTabAction(route.path);
};
const handleCloseOtherClick = () => {
  mainStore.closeMultipleTabAction(route.path);
};

const handleCloseAllClick = () => {
  mainStore.closeMultipleTabAction();
  router.push(HOME_URL);
};
</script>

<style scoped lang='less'>
.more{
  position: relative;
  top: -1px;
}
</style>
