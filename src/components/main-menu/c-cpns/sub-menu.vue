<template>
  <template v-for="menu in userMenuList" :key="menu.url">
    <el-sub-menu :index="menu.id + ''" v-if="menu.children">
      <template #title>
        <el-icon>
          <component :is="menu.icon" />
        </el-icon>
        <span>{{ menu.name }}</span>
      </template>
      <template v-for="subMenu in menu.children" :key="subMenu.url">
        <menu-item :menuItem="subMenu"></menu-item>
      </template>
    </el-sub-menu>
    <menu-item :menuItem="menu" v-else></menu-item>
  </template>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue';
import useLoginStore from '@/store/login';

const loginStore = useLoginStore();

const userMenuList = loginStore.userMenuList;
</script>

<style scoped lang="less">
.el-menu-item:hover {
  color: #fff;
  background-color: #333;
}

.el-menu-item.is-active {
  background-color: #060708;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    content: '';
    background: var(--el-color-primary);
  }
}

.el-sub-menu {
  .el-menu-item {
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
    background-color: #333;
  }
}
</style>
