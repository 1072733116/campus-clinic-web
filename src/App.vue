<template>
  <el-config-provider :locale='locale'>
    <div class='app'>
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script setup lang='ts'>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const locale = zhCn;
</script>

<style lang='less' scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
