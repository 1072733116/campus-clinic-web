/**
 *
 * @author:ChenDW
 * @date:2023-01-28 15:46
 */
import { defineStore } from 'pinia';
import router from '@/router';
import {
  userLoginRequest,
  getLoginUserInfoRequest,
  getLoginUserMenuListByRoleId,
  getClinicStatusRequest
} from '@/service/login';
import { localCache } from '@/utils/cache';
import { mapMenuListToRoutes, mapMenuToPermissions } from '@/utils/menu';
import { LOGIN_USER_TOKEN, LOGIN_USER_INFO, LOGIN_USER_MENU_LIST, LOGIN_CLINIC_STATUS } from '@/constant';
import type { ILoginUser } from '@/types';
import type { ILoginState } from './type';


const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_USER_TOKEN) ?? '',
    clinicStatus: localCache.getCache(LOGIN_CLINIC_STATUS) ?? {},
    loginUserInfo: localCache.getCache(LOGIN_USER_INFO) ?? {},
    userMenuList: localCache.getCache(LOGIN_USER_MENU_LIST) ?? [],
    userPermissions: []
  }),
  actions: {
    async getLoginUserInfoAction(account: string) {
      const userRes = await getLoginUserInfoRequest(account);
      this.loginUserInfo = userRes.data;
      localCache.setCache(LOGIN_USER_INFO, this.loginUserInfo);
    },
    async getClinicStatusAction() {
      const res = await getClinicStatusRequest();
      this.clinicStatus = res.data;
      localCache.setCache(LOGIN_CLINIC_STATUS, this.clinicStatus);
    },
    async userLoginAction(account: ILoginUser) {
      const loginRes = await userLoginRequest(account);
      this.token = loginRes.data.token;
      localCache.setCache(LOGIN_USER_TOKEN, this.token);
      const userRes = await getLoginUserInfoRequest(loginRes.data.account);
      this.loginUserInfo = userRes.data;
      localCache.setCache(LOGIN_USER_INFO, this.loginUserInfo);
      const loginUserMenuList = await getLoginUserMenuListByRoleId(this.loginUserInfo.roleId);
      this.userMenuList = loginUserMenuList.data;
      localCache.setCache(LOGIN_USER_MENU_LIST, this.userMenuList);
      this.getClinicStatusAction();
      //获取用户的权限
      const permissions = mapMenuToPermissions(this.userMenuList);
      this.userPermissions = permissions;

      const routes = mapMenuListToRoutes(this.userMenuList);
      routes.forEach((route) => router.addRoute('main', route));
    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_USER_TOKEN);
      const loginUserInfo = localCache.getCache(LOGIN_USER_INFO);
      const userMenuList = localCache.getCache(LOGIN_USER_MENU_LIST);
      if (token && loginUserInfo && userMenuList) {

        this.token = token;
        this.loginUserInfo = loginUserInfo;
        this.userMenuList = userMenuList;
        this.getClinicStatusAction();
        const permissions = mapMenuToPermissions(this.userMenuList);
        this.userPermissions = permissions;

        const routes = mapMenuListToRoutes(userMenuList);
        routes.forEach((route) => router.addRoute('main', route));
      }
    }
  }
});

export default useLoginStore;
