/**
 *
 * @author:ChenDW
 * @date:2023-02-01 16:43
 */
import type { RouteRecordRaw } from 'vue-router';
import type { IUserMenu } from '@/store/login/type';

const loadLocalRoutes = (): RouteRecordRaw[] => {
  const localRoutes: RouteRecordRaw[] = [];
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  });
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }
  return localRoutes;
};

let firstMenu: any = null;
//扁平化路由数组
const flatRouteList: RouteRecordRaw[] = [];
const mapMenuListToRoutes = (menuList: IUserMenu[]): RouteRecordRaw[] => {
  const localRoutes: RouteRecordRaw[] = loadLocalRoutes();
  //注册的路由数组
  const routes: RouteRecordRaw[] = [];

  function recurseGetRoutes(menus, parentMenu?: IUserMenu) {
    for (const menu of menus) {
      if (menu.children && menu.children[0].type !== 0) {
        recurseGetRoutes(menu.children, menu);
      } else {
        const route = localRoutes.find((item) => item.path === menu.url);
        if (route) {
          if (parentMenu && !routes.find((item) => item.path === parentMenu.url)) {
            routes.push({
              path: parentMenu.url,
              redirect: route.path
            });
          }
          route.meta!.title = menu.name;
          route.meta!.icon = menu.icon;
          routes.push(route);
          flatRouteList.push(route);
        }
        if (!firstMenu && route) firstMenu = menu;
      }
    }
  }

  recurseGetRoutes(menuList);
  return routes;
};

const maoMenuListToDefaultActivePath = (path: string, menuList: IUserMenu[]): any => {
  let activeMenuItem = null;

  function recurseGetActivePath(menus) {
    for (const menu of menus) {
      if (menu.children && menu.children[0].type !== 0) {
        recurseGetActivePath(menu.children);
      } else {
        if (menu.url === path || path.indexOf(menu.url) !== -1) {
          activeMenuItem = menu;
          break;
        }
      }
    }
  }

  recurseGetActivePath(menuList);
  return activeMenuItem;
};

const mapMenuToPermissions = (userMenuList: IUserMenu[]) => {
  const userPermissions: string[] = [];

  function recurseGetPermissions(menus) {
    for (const menu of menus) {
      if (menu.type === 0) {
        userPermissions.push(menu.url);
      } else {
        recurseGetPermissions(menu.children ?? []);
      }
    }
  }

  recurseGetPermissions(userMenuList);

  return userPermissions;
};

export interface IBreadcrumb {
  id: number;
  name: string;
  path?: string;
  icon?: string;
}

const mapPathToBreadcrumbs = (path: string, userMenuList: IUserMenu[]): IBreadcrumb[] => {
  const breadcrumbs: IBreadcrumb[] = [];
  let isFlag: boolean = true;

  function recurseGetBreadcrumbs(menus: IUserMenu[], parentMenuItem?: IUserMenu) {
    for (const menu of menus) {
      if (!isFlag) break;
      if (menu.children && menu.children[0].type !== 0) {
        const breadcrumb = {
          id: menu.id,
          name: menu.name,
          path: menu.url,
          icon: menu.icon
        };
        breadcrumbs.push(breadcrumb);
        recurseGetBreadcrumbs(menu.children, menu);
      } else {
        if (menu.url === path || path.indexOf(menu.url) !== -1) {
          const breadcrumb = {
            id: menu.id,
            name: menu.name,
            path: menu.url,
            icon: menu.icon
          };
          breadcrumbs.push(breadcrumb);
          isFlag = false;
        }
      }
    }
    if (isFlag) {
      breadcrumbs.pop();
    }
  }

  recurseGetBreadcrumbs(userMenuList);
  return breadcrumbs;
};

const mapMenuListToIds = (menuList: any[]) => {
  const ids: number[] = [];

  function recurseGetMenuId(menus: any[]) {
    for (const menu of menus) {
      if (menu.children) {
        recurseGetMenuId(menu.children);
      } else {
        ids.push(menu.id);
      }
    }
  }

  recurseGetMenuId(menuList);
  return ids;
};
export {
  firstMenu,
  flatRouteList,
  mapMenuListToRoutes,
  maoMenuListToDefaultActivePath,
  mapMenuToPermissions,
  mapPathToBreadcrumbs,
  mapMenuListToIds
};
