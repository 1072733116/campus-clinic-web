<template>
  <div class="full-screen" @click="toggle">
    <i :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']" class="screen-icon"></i>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';

const { toggle, isFullscreen } = useFullscreen();
</script>

<style scoped lang="less">
.full-screen {
  .screen-icon {
    color: var(--el-text-color-primary);
  }
}
</style>
