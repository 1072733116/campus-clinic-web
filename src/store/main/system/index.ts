/**
 *
 * @author:ChenDW
 * @date:2023-02-04 20:38
 */
import { defineStore } from 'pinia';
import { getAllResourceRequest, getAlLRoleListRequest } from '@/service/main/system';
import type { ISystemState } from './type';

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    resourceList: [],
    roleList: []
  }),
  actions: {
    async getAllResourceAction() {
      const res = await getAllResourceRequest();
      const resources = res.data;
      this.resourceList = resources;
    },
    async getAllRoleListAction() {
      const res = await getAlLRoleListRequest();
      const roles = res.data;
      this.roleList = roles;
    }
  }
});

export default useSystemStore;
