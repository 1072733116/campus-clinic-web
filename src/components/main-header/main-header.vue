<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="22px">
        <component :is="isCollapse ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-breadcrumb></header-breadcrumb>
      <div class="status">
        <clinic-status />
        <info-status />
      </div>
      <header-info></header-info>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClinicStatus from '@/components/main-header/c-cpns/clinic-status.vue';
import InfoStatus from '@/components/main-header/c-cpns/info-status.vue';
import HeaderInfo from './c-cpns/header-info.vue';
import HeaderBreadcrumb from './c-cpns/header-breadcrumb.vue';
import { ref } from 'vue';

const emits = defineEmits(['menuIconClickEvent']);

const isCollapse = ref<boolean>(false);

const handleMenuIconClick = () => {
  isCollapse.value = !isCollapse.value;
  emits('menuIconClickEvent', isCollapse.value);
};
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;
}

.menu-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0 20px;

  .status {
    position: relative;
    display: flex;
    align-items: center;
  }
}
</style>
