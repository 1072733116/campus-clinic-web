/**
 *
 * @author:ChenDW
 * @date:2023-01-07 15:58
 */
import { BASE_URL, TIMEOUT } from './config';
import Request from './request';
import { ElMessageBox } from 'element-plus';
import { localCache } from '@/utils/cache';
import { LOGIN_USER_TOKEN } from '@/constant';
import useLogout from '@/hooks/useLogout';

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptorFn(config) {
      const token = localCache.getCache(LOGIN_USER_TOKEN);
      if (config.headers && token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    responseInterceptorFn(res: any) {
      const code = /^4|5/;
      if (res.code === 402) {
        ElMessageBox.alert(res.msg, '温馨提示', {
          confirmButtonText: '确认',
          type: 'warning',
          center: true,
          callback: () => {
            useLogout();
          }
        });
        return Promise.reject(res.msg);
      }
      if (code.test(res.code + '')) {
        ElMessage({
          message: res.msg,
          type: 'error',
          duration: 2000
        });
        return Promise.reject(res.msg);
      }
      return res;
    }
  }
});

export default request;
