<template>
  <div class='medicine'>
    <page-search :searchConfig='searchConfigData'
                 @searchEvent='handleSearchEvent'
                 @resetEvent='handleResetEvent'
    />
    <page-content ref='pageContentRef'
                  v-bind='contentConfig'
                  @createOrUpdateEvent='handleCreateOrUpdateEvent'
    />
    <page-drawer ref='pageDrawerRef'
                 v-bind='drawerConfigData'
                 @createOrUpdateDoneEvent='handleCreateOrUpdateDoneEvent'
    />
  </div>
</template>

<script setup lang='ts'>
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageDrawer from '@/components/page-drawer';
import searchConfig from './config/search-config';
import contentConfig from './config/content-config';
import drawerConfig from './config/drawer-config';
import usePageContent from '@/hooks/usePageContent';
import usePageDrawer from '@/hooks/usePageDrawer';

import { computed } from 'vue';
import useDrugStore from '@/store/main/drug';

const drugStore = useDrugStore();
drugStore.getMedicineTypeListDataAction();
//动态添加药品类型信息
const searchConfigData = computed(() => {
  const formItem = searchConfig.formItemList.find(item => item.prop === 'type');
  formItem!.options = drugStore.medicineTypeList.map(medicineType => {
    return {
      label: medicineType.name,
      value: medicineType.id
    };
  });
  return searchConfig;
});
const drawerConfigData = computed(() => {
  const formItem = drawerConfig.formItemList.find(item => item.prop === 'type');
  formItem!.options = drugStore.medicineTypeList.map(medicineType => {
    return {
      label: medicineType.name,
      value: medicineType.id
    };
  });
  return drawerConfig;
});

const { pageContentRef, handleSearchEvent, handleResetEvent, handleCreateOrUpdateDoneEvent } = usePageContent();
const { pageDrawerRef, handleCreateOrUpdateEvent } = usePageDrawer();
</script>

<style scoped>

</style>
