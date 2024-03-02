<template>
  <div class="home" v-if="!visit">
    <page-search :searchConfig="searchConfig" @searchEvent="handleSearchEvent" @resetEvent="handleResetEvent" />
    <page-content ref="pageContentRef" @goVisitEvent="handleGoVisitEvent"></page-content>
  </div>
  <div v-else>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search';
import PageContent from './c-cpns/page-content.vue';
import searchConfig from './config/search-config';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';

const route = useRoute();
const router = useRouter();
let visit = computed<boolean>(() => route.path.indexOf('/main/home/visit') !== -1);
const handleGoVisitEvent = (row: any) => {
  router.push(`/main/home/visit/${row.id}`);
};

const pageContentRef = ref<InstanceType<typeof PageContent>>();
//点击搜索按钮处理
const handleSearchEvent = (formData: any) => {
  pageContentRef.value?.fetchAppointmentListAction(formData);
};
//点击重置按钮处理
const handleResetEvent = () => {
  pageContentRef.value?.fetchAppointmentListAction({});
};
</script>

<style scoped></style>
