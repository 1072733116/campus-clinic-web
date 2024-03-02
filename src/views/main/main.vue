<template>
  <el-container class="main-container">
    <el-aside>
      <main-menu :isCollapse="isCollapse" :style="{ width: isCollapse ? '60px' : '210px' }"></main-menu>
    </el-aside>
    <el-container>
      <el-header height="55px">
        <main-header @menuIconClickEvent="handleMenuIconClickEvent"></main-header>
      </el-header>
      <main-content />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu';
import MainHeader from '@/components/main-header';
import MainContent from '@/components/main-content';
import MainTabs from '@/components/main-tabs';
import { ref } from 'vue';

const isCollapse = ref<boolean>(false);

const handleMenuIconClickEvent = (collapse: boolean) => {
  isCollapse.value = collapse;
};
</script>

<style scoped lang="less">
.main-container {
  width: 100%;
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    width: auto;
    overflow: inherit;
    background-color: #191a20;
    border-right: 1px solid #191a20;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.el-header {
  box-sizing: border-box;
  padding: 0 15px;
  border-bottom: 1px solid #f1f1f1;
}
</style>
