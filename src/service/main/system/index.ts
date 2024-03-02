/**
 *
 * @author:ChenDW
 * @date:2023-02-14 22:40
 */
import request from '@/service';

const getAllResourceRequest = () => {
  return request.get({
    url: '/resource'
  });
};

const getAlLRoleListRequest = () => {
  return request.get({
    url: '/role'
  });
};

const getAllMedicineListRequest = () => {
  return request.get({
    url: '/medicine'
  });
};

export { getAllResourceRequest, getAlLRoleListRequest, getAllMedicineListRequest };
