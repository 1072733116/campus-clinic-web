/**
 *
 * @author:ChenDW
 * @date:2023-02-03 14:36
 */
import { defineStore } from 'pinia';
import router from '@/router';
import {
  getPageContentListDataRequest,
  deletePageContentDataRequest,
  createPageContentDataRequest,
  updatePageContentDataRequest
} from '@/service/main';
import { localCache } from '@/utils/cache';
import { MAIN_TAB_ITEM_LIST } from '@/constant';
import type { IMainState, ITabItem } from './type';
import type { IPageParam } from '@/types';

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    tabMenuList: localCache.getCache(MAIN_TAB_ITEM_LIST) ?? [],
    total: 0,
    pages: 0,
    size: 10,
    current: 1,
    pageList: []
  }),
  actions: {
    //main-tabs
    addTabAction(tabItem: ITabItem) {
      if (this.tabMenuList.every((item) => item.path !== tabItem.path)) {
        this.tabMenuList.push(tabItem);
      }
    },
    removeTabAction(path: string, isCurrentTab: boolean = true) {
      const tabList = [...this.tabMenuList];
      if (isCurrentTab) {
        tabList.forEach((tabItem, index) => {
          if (tabItem.path !== path) return;
          const nextOrPrevTabItem = tabList[index + 1] || tabList[index - 1];
          if (!nextOrPrevTabItem) return;
          router.push(nextOrPrevTabItem.path);
        });
      }
      this.tabMenuList = tabList.filter((item) => item.path !== path);
    },
    closeMultipleTabAction(path?: string) {
      const newTabList = this.tabMenuList.filter((tabItem: ITabItem) => tabItem.path === path || !tabItem.close);
      this.tabMenuList = newTabList;
    },
    dragSortTabAction(newIndex: number, oldIndex: number) {
      const tabList = [...this.tabMenuList];
      const currentTab = tabList.splice(oldIndex, 1)[0];
      tabList.splice(newIndex, 0, currentTab);
      this.tabMenuList = tabList;
    },
    //page-content
    async getPageContentListDataAction(
      pageName: string,
      pageParam: IPageParam = {
        current: 1,
        size: 10
      },
      queryData?: any
    ) {
      const result = await getPageContentListDataRequest(pageName, pageParam, queryData);
      this.total = result.data.total;
      this.pages = result.data.pages;
      this.current = result.data.current;
      this.size = result.data.size;
      this.pageList = result.data.records;
    },
    async deletePageContentDataAction(pageName: string, id: number) {
      await deletePageContentDataRequest(pageName, id);
    },
    async createOrUpdatePageContentDataAction(pageName: string, isCreate: boolean, createOrUpdateData: any) {
      if (isCreate) {
        await createPageContentDataRequest(pageName, createOrUpdateData);
      } else {
        await updatePageContentDataRequest(pageName, createOrUpdateData);
      }
    }
  }
});

export default useMainStore;
