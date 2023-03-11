/**
 *
 * @author:ChenDW
 * @date:2023-02-13 14:29
 */
import request from '@/service';
import type { IPageParam } from '@/types';

//获取页面表格数据
const getPageContentListDataRequest = (pageName: string, pageParam: IPageParam, queryData?: any) => {
  return request.post({
    url: `/${pageName}/list`,
    data: queryData,
    params: pageParam
  });
};
//删除页面数据
const deletePageContentDataRequest = (pageName: string, id: number) => {
  return request.delete({
    url: `/${pageName}/${id}`
  });
};

//创建或编辑数据
const createPageContentDataRequest = (pageName: string, createData: any) => {
  return request.post({
    url: `/${pageName}`,
    data: createData
  });
};

const updatePageContentDataRequest = (pageName: string, updateData: any) => {
  return request.put({
    url: `/${pageName}`,
    data: updateData
  });
};

export {
  getPageContentListDataRequest,
  deletePageContentDataRequest,
  createPageContentDataRequest,
  updatePageContentDataRequest
};
