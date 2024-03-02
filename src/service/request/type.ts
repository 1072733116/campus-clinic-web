/**
 *
 * @author:ChenDW
 * @date:2023-01-07 16:18
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptorFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorErrFn?: (err: any) => any;
  responseInterceptorFn?: (res: T) => T;
  responseInterceptorErrFn?: (err: any) => any;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}
