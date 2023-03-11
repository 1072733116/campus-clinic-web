/**
 *
 * @author:ChenDW
 * @date:2023-01-28 16:10
 */
import request from '@/service';
import type { ILoginUser } from '@/types';

export const userLoginRequest = (loginUser: ILoginUser) => {
  return request.post({
    url: '/login',
    data: loginUser
  });
};

export const getLoginUserInfoRequest = (account: string) => {
  return request.get({
    url: `/doctor/${account}`
  });
};

export const getLoginUserMenuListByRoleId = (roleId: number) => {
  return request.get({
    url: `/resource/${roleId}`
  });
};

export const getClinicStatusRequest = () => {
  return request.get({
    url: '/clinic'
  });
};

