<template>
  <div class='status'>
    <span class='title'>诊所状态:</span>
    <el-switch
      v-model='clinic.status'
      active-text='在线'
      inactive-text='休息'
      :active-value='1'
      :inactive-value='0'
      @change='handleSwitchChange'
    />
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import useLoginStore from '@/store/login';
import useHomeStore from '@/store/main/home';

const loginStore = useLoginStore();
const homeStore = useHomeStore();
const clinic = computed(() => loginStore.clinicStatus);

const handleSwitchChange = () => {
  const status = { ...clinic.value };
  homeStore.updateClinicStatusAction(status);
};
</script>

<style scoped lang='less'>
.status {
  position: absolute;
  right:80px;
  display: flex;
  align-items: center;
  margin:0 10px;
  .title {
    line-height: 1;
    font-size: 14px;
    margin-right: 8px;
    font-weight: bolder;
  }
}
</style>
