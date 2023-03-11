/**
 *
 * @author:ChenDW
 * @date:2023-01-07 16:18
 */
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { RequestConfig } from './type';

class request {
  instance: AxiosInstance;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    //全局拦截器
    this.instance.interceptors.request.use((config) => {
      return config;
    }, (err) => {
      return err;
    });
    this.instance.interceptors.response.use((res) => {
      return res.data;
    }, (err) => {
      return err;
    });

    //实例拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptorFn,
      config.interceptors?.requestInterceptorErrFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptorFn,
      config.interceptors?.responseInterceptorErrFn
    );
  }

  //封装请求
  request<T = any>(config: RequestConfig<T>): Promise<T> {
    //单次请求拦截
    if (config.interceptors?.requestInterceptorFn) {
      config = config.interceptors?.requestInterceptorFn(config);
    }

    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptorFn) {
            res = config.interceptors?.responseInterceptorFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'POST' });
  }

  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' });
  }

  put<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' });
  }
}

export default request;
