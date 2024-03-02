/**
 *
 * @author:ChenDW
 * @date:2023-02-03 14:38
 */

interface IMainState {
  tabMenuList: ITabItem[];
  total: number;
  pages: number;
  size: number;
  current: number;
  pageList: any[];
}

interface ITabItem {
  path: string;
  name: string;
  title: string;
  close: boolean;
  icon?: string;
}

export type { IMainState, ITabItem };
