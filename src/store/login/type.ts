/**
 *
 * @author:ChenDW
 * @date:2023-01-29 14:18
 */
interface ILoginUserInfo {
  account: string;
  doctorId: number;
  doctorName: string;
  password: string;
  roleId: number;
}

interface IUserMenu {
  id: number;
  parentId: number;
  name: string;
  type: number;
  url: string;
  sort: number;
  icon?: string;
  children?: IUserMenu[];
}

interface ILoginState {
  token: string;
  clinicStatus: any;
  loginUserInfo: any;
  userMenuList: IUserMenu[];
  userPermissions: string[];
}

export type { ILoginState, IUserMenu };
