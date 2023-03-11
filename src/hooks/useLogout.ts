/**
 *
 * @author:ChenDW
 * @date:2023-01-31 15:05
 */
import { localCache } from '@/utils/cache';
import { LOGIN_USER_INFO, LOGIN_USER_TOKEN, LOGIN_USER_MENU_LIST } from '@/constant';
import { ElMessage } from 'element-plus';
import router from '@/router';

const useLogout = (): void => {
  localCache.removeCache(LOGIN_USER_TOKEN);
  localCache.removeCache(LOGIN_USER_INFO);
  localCache.removeCache(LOGIN_USER_MENU_LIST);
  router.replace('/login');
  ElMessage({
    message: '退出登录成功',
    type: 'success'
  });
};

export default useLogout;
