/**
 *
 * @author:ChenDW
 * @date:2023-02-04 15:41
 */
import { defineStore } from 'pinia';
import {
  updateDoctorPassword,
  updateDoctorInfo,
  updateClinicStatusRequest,
  updateDoctorInfoStatusRequest
} from '@/service/main/home';
import type { IHomeState } from './type';
import { localCache } from '@/utils/cache';
import { LOGIN_CLINIC_STATUS, LOGIN_USER_INFO } from '@/constant';

const useHomeStore = defineStore('home', {
    state: (): IHomeState => ({
      count: 0
    }),
    actions: {
      setCountAction() {
        this.count++;
      },
      async updateDoctorPasswordAction(account: any) {
        await updateDoctorPassword(account);
      },
      async updateDoctorInfoAction(formData: any) {
        await updateDoctorInfo(formData);
      },
      async updateClinicStatusAction(status: any) {
        const update = await updateClinicStatusRequest(status);
        if (update.data) {
          localCache.setCache(LOGIN_CLINIC_STATUS, status);
        }
      },
      async updateDoctorInfoStatusAction(status: any) {
        const update = await updateDoctorInfoStatusRequest(status);
        if (update.data) {
          localCache.setCache(LOGIN_USER_INFO,status)
        }
      }
    }
  }
);

export default useHomeStore;
