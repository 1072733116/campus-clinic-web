/**
 *
 * @author:ChenDW
 * @date:2023-02-04 20:38
 */
import { defineStore } from 'pinia';
import { getAllResourceRequest, getAlLRoleListRequest,getAllMedicineListRequest } from '@/service/main/system';
import type { ISystemState } from './type';

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    resourceList: [],
    roleList: [],
    medicineList:[]
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
    },
    async getAllMedicineListAction() {
      const res = await getAllMedicineListRequest();
      const medicines = res.data;
      this.medicineList = medicines;
    },
  }
});

export default useSystemStore;
