<template>
  <main-tabs />
  <el-main>
    <router-view v-slot='{ Component, route }'>
      <transition appear name='fade-transform' mode='out-in'>
        <component :is='Component' :key='route.path' />
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='less'>
.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: #f0f2f5;

  &::-webkit-scrollbar {
    background-color: #f0f2f5;
  }
}

</style>
