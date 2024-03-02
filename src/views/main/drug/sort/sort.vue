<template>
  <div class="sort">
    <page-search :searchConfig="searchConfig" @searchEvent="handleSearchEvent" @resetEvent="handleResetEvent" />
    <page-content v-bind="contentConfig" ref="pageContentRef" @createOrUpdateEvent="handleCreateOrUpdateEvent" />
    <page-drawer v-bind="drawerConfig" ref="pageDrawerRef" @createOrUpdateDoneEvent="handleCreateOrUpdateDoneEvent" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageDrawer from '@/components/page-drawer';
import searchConfig from './config/search-config';
import contentConfig from './config/content-config';
import drawerConfig from './config/drawer-config';
import usePageContent from '@/hooks/usePageContent';
import usePageDrawer from '@/hooks/usePageDrawer';

const { pageContentRef, handleSearchEvent, handleResetEvent, handleCreateOrUpdateDoneEvent } = usePageContent();
const { pageDrawerRef, handleCreateOrUpdateEvent } = usePageDrawer();
</script>

<style scoped></style>
