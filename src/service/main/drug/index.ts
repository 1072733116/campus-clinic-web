/**
 *
 * @author:ChenDW
 * @date:2023-02-06 19:33
 */
import request from '@/service';
import type { IPageParam } from '@/types';
import type { IMedicine } from '@/store/main/drug/type';

//获取所有的药物类型
const getMedicineTypeListRequest = () => {
  return request.get({
    url: '/medicine/type'
  });
};

//获取药品信息列表
const getMedicineListRequest = (pageParam: IPageParam, medicine?: IMedicine) => {
  return request.post({
    url: '/medicine/list',
    data: medicine,
    params: pageParam
  });
};

//新增商品信息
const createMedicineRequest = (medicine: IMedicine) => {
  return request.post({
    url: '/medicine',
    data: medicine
  });
};

//编辑药品信息
const updateMedicineRequest = (medicine: IMedicine) => {
  return request.put({
    url: '/medicine',
    data: medicine
  });
};

//删除药品信息
const deleteMedicineByIdRequest = (id: number) => {
  return request.delete({
    url: `/medicine/${id}`
  });
};

export {
  getMedicineListRequest,
  getMedicineTypeListRequest,
  createMedicineRequest,
  updateMedicineRequest,
  deleteMedicineByIdRequest
};
