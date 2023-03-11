<template>
  <div class='main-tabs'>
    <div class='tab-menu'>
      <el-tabs type='card' v-model='activeTabItem' @tab-click='handleTabClick' @tab-remove='handleTabRemoveClick'>
        <template v-for='tab in tabList' :key='tab.path'>
          <el-tab-pane :name='tab.path' :closable='tab.close'>
            <template #label>
              <el-icon class='tab-icon'>
                <component :is='tab.icon' />
              </el-icon>
              {{ tab.title }}
            </template>
          </el-tab-pane>
        </template>
      </el-tabs>
      <more-button />
    </div>
  </div>
</template>

<script setup lang='ts'>
import MoreButton from './c-cpns/more-button.vue';
import Sortable from 'sortablejs';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useLoginStore from '@/store/login';
import useMainStore from '@/store/main';
import { flatRouteList } from '@/utils/menu';
import { localCache } from '@/utils/cache';
import { MAIN_TAB_ITEM_LIST } from '@/constant';
import type { ITabItem } from '@/store/main/type';

const route = useRoute();
const router = useRouter();
const loginStore = useLoginStore();
const mainStore = useMainStore();
const userMenuList = loginStore.userMenuList;

const activeTabItem = ref(route.path);
const tabList = computed(() => {
  localCache.setCache(MAIN_TAB_ITEM_LIST, mainStore.tabMenuList);
  return mainStore.tabMenuList;
});

onMounted(() => {
  tabDragSort();
  initTabList();
});

watch(() => route.path, () => {
  activeTabItem.value = route.path;
  const tabItem: ITabItem = {
    name: route.name as string,
    path: route.path,
    title: route.meta.title as string,
    close: !route.meta.isFixed,
    icon: route.meta.icon as string
  };
  mainStore.addTabAction(tabItem);
}, { immediate: true });

//标签拖拽排序
const tabDragSort = () => {
  Sortable.create(document.querySelector('.el-tabs__nav'), {
    draggable: '.el-tabs__item',
    animation: 300,
    onEnd: ({ newIndex, oldIndex }) => {
      mainStore.dragSortTabAction(newIndex, oldIndex);
    }
  });
};

//初始化需要固定的标签
const initTabList = () => {
  flatRouteList.forEach(item => {
    if (item.meta?.isFixed) {
      const tabItem: ITabItem = {
        name: item.name as string,
        path: item.path,
        title: item.meta.title as string,
        close: !item.meta.isFixed,
        icon: item.meta.icon as string
      };
      mainStore.addTabAction(tabItem);
    }
  });
};

const handleTabClick = (tabItem) => {
  const path = tabItem.props.name;
  router.push(path);
};

const handleTabRemoveClick = (path: string) => {
  mainStore.removeTabAction(path, path === route.path);
};
</script>

<style scoped lang='less'>
.main-tabs {
  background-color: #fff;

  :deep(.tab-menu) {
    position: relative;
    width: 100%;
    .el-dropdown {
      position: absolute;
      top: 8px;
      right: 13px;
    }
    .tab-icon {
      top: 2px;
      font-size: 15px;
    }
    .el-tabs__nav-wrap {
      position: absolute;
      width: calc(100% - 110px);
    }
    .el-tabs--card > .el-tabs__header {
      box-sizing: border-box;
      height: 40px;
      padding: 0 10px;
      margin: 0;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item {
      color: #cccccc;
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      color: var(--el-color-primary);
      border-bottom: 2px solid var(--el-color-primary);
    }
    .el-tabs__item .is-icon-close svg {
      margin-top: 0.5px;
    }
  }
}

</style>
