<template>
  <div class='home'>
    <h2>home</h2>
    <el-button type='primary' @click='handleTestClick'>测试按钮</el-button>
    <span>{{ count }}</span>
  </div>
</template>

<script setup lang='ts'>
import useHomeStore from '@/store/main/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore();
const { count } = storeToRefs(homeStore);

const handleTestClick = async () => {
  homeStore.setCountAction();
};
</script>

<style scoped>

</style>
