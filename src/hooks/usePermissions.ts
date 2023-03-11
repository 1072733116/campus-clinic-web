/**
 *
 * @author:ChenDW
 * @date:2023-02-04 19:44
 */
import useLoginStore from '@/store/login';

const usePermissions = (permissionID) => {
  const loginStore = useLoginStore();
  const permissionList = loginStore.userPermissions;
  return permissionList.includes(permissionID);
};

export default usePermissions;
