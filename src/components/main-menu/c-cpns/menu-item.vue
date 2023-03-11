<template>
  <el-menu-item :index='menuItem.id + ""' @click='handleMenuItemClick'>
    <el-icon>
      <component :is='menuItem.icon' />
    </el-icon>
    <span>{{ menuItem.name }}</span>
  </el-menu-item>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import type{ IUserMenu } from '@/store/login/type';
import router from '@/router';

interface IProps {
  menuItem: IUserMenu
}

const props = defineProps<IProps>();

const handleMenuItemClick = () => {
  const path = props.menuItem.url;
  router.push(path);
};
</script>

<style scoped>

</style>
