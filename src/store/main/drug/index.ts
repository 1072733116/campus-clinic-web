/**
 *
 * @author:ChenDW
 * @date:2023-02-06 19:41
 */
import { defineStore } from 'pinia';
import {
  getMedicineListRequest,
  getMedicineTypeListRequest,
  createMedicineRequest,
  updateMedicineRequest,
  deleteMedicineByIdRequest
} from '@/service/main/drug';
import type { IDrugState, IMedicine } from './type';
import type { IPageParam } from '@/types';

const useDrugStore = defineStore('drug', {
  state: (): IDrugState => ({
    total: 0,
    pages: 0,
    size: 10,
    current: 1,
    medicineList: [],
    medicineTypeList: []
  }),
  actions: {
    //获取所有的药品类型列表
    async getMedicineTypeListDataAction() {
      const res = await getMedicineTypeListRequest();
      const medicineTypeList = res.data;
      this.medicineTypeList = medicineTypeList;
    },
    //新增或者编辑药品信息
    async createOrUpdateMedicineAction(isCreate: boolean, medicine: any) {
      if (isCreate) {
        await createMedicineRequest(medicine);
      } else {
        await updateMedicineRequest(medicine);
      }
    }
  }
});

export default useDrugStore;
