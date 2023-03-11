/**
 *
 * @author:ChenDW
 * @date:2023-02-16 17:06
 */
import request from '@/service';

//修改密码
const updateDoctorPassword = (account: any) => {
  return request.put({
    url: '/account/password',
    data: account
  });
};

//修改个人信息
const updateDoctorInfo = (doctor: any) => {
  return request.put({
    url: '/doctor',
    data: doctor
  });
};

//修改诊所状态
const updateClinicStatusRequest = (status: any) => {
  return request.put({
    url: '/clinic',
    data: status
  });
};

//修改个人状态
const updateDoctorInfoStatusRequest = (status: any) => {
  return request.put({
    url: '/doctor',
    data: status
  });
};
export {
  updateDoctorPassword,
  updateDoctorInfo,
  updateClinicStatusRequest,
  updateDoctorInfoStatusRequest
};
