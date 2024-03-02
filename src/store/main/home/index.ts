/**
 *
 * @author:ChenDW
 * @date:2023-02-04 15:41
 */
import { defineStore } from 'pinia';
import {
  getAppointmentListRequest,
  updateDoctorPassword,
  updateDoctorInfo,
  updateClinicStatusRequest,
  updateDoctorInfoStatusRequest,
  createRecordRequest,
  sendMailRequest
} from '@/service/main/home';
import type { IHomeState } from './type';
import { localCache } from '@/utils/cache';
import { LOGIN_CLINIC_STATUS, LOGIN_USER_INFO } from '@/constant';
import type { IPageParam } from '@/types';

const useHomeStore = defineStore('home', {
  state: (): IHomeState => ({
    appointmentList: [],
    total: 0,
    pages: 0,
    size: 10,
    current: 1
  }),
  actions: {
    async getAppointmentListAction(
      pageParam: IPageParam = {
        current: 1,
        size: 10
      },
      appointment: any = {},
      doctorId?: number
    ) {
      const res = await getAppointmentListRequest(pageParam, appointment, doctorId);
      this.current = res.data.current;
      this.size = res.data.size;
      this.pages = res.data.pages;
      this.total = res.data.total;
      this.appointmentList = res.data.records;
    },
    async createRecordAction(record: any) {
      const res = await createRecordRequest(record);
      if (!res.data) {
        return Promise.reject();
      }
    },
    async sendMailAction(appointment) {
      const res = await sendMailRequest(appointment);
      if (!res.data) {
        return Promise.reject();
      }
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
        localCache.setCache(LOGIN_USER_INFO, status);
      }
    }
  }
});

export default useHomeStore;
