/**
 *
 * @author:ChenDW
 * @date:2023-02-16 17:06
 */
import request from '@/service';

//获取预约列表
const getAppointmentListRequest = (pageParam: any, appointment: any, doctorId?: number) => {
  return request.post({
    url: '/appointment/list',
    data: appointment,
    params: {
      ...pageParam,
      doctorId
    }
  });
};

//添加就诊记录
const createRecordRequest = (record) => {
  return request.post({
    url:"/record",
    data:record
  })
}

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
  getAppointmentListRequest,
  updateDoctorPassword,
  updateDoctorInfo,
  updateClinicStatusRequest,
  updateDoctorInfoStatusRequest,
  createRecordRequest
};
