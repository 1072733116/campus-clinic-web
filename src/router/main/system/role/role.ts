/**
 *
 * @author:ChenDW
 * @date:2023-01-31 17:17
 */
const role = () => import('@/views/main/system/role/role.vue');
export default {
  path: '/main/system/role',
  name: 'role',
  component: role,
  children: [],
  meta: {}
};
