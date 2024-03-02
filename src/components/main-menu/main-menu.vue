<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/campus-logo.png" alt="广州城市理工学院" />
      <h2 class="title" v-show="!isCollapse">后台管理系统</h2>
    </div>
    <el-scrollbar>
      <el-menu
        :router="false"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="defaultActivePath"
        :unique-opened="true"
        active-text-color="#fff"
        background-color="#191a20"
        text-color="#bdbdc0"
      >
        <sub-menu />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SubMenu from './c-cpns/sub-menu.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useLoginStore from '@/store/login';
import { maoMenuListToDefaultActivePath } from '@/utils/menu';

interface IProps {
  isCollapse: boolean;
}

const props = defineProps<IProps>();

const route = useRoute();
const loginStore = useLoginStore();
const userMenuList = loginStore.userMenuList;

const defaultActivePath = computed(() => {
  const activeMenuItem = maoMenuListToDefaultActivePath(route.path, userMenuList);
  return activeMenuItem.id + '';
});
</script>

<style scoped lang="less">
.main-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;

  .el-scrollbar {
    height: calc(100% - 55px);

    .el-menu {
      overflow-x: hidden;
      border-right: none;
      user-select: none;
    }
  }
}

.logo {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 55px;
  padding-left: 6px;
  border-bottom: 1px solid #282a35;
  overflow: hidden;

  img {
    height: 47px;
    width: 47px;
    object-fit: contain;
    margin-right: 8px;
  }

  .title {
    font-size: 21.5px;
    font-weight: bold;
    color: #dadada;
    white-space: nowrap;
  }
}
</style>
