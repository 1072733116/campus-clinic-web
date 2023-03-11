/**
 *
 * @author:ChenDW
 * @date:2023-01-31 17:21
 */
const user = () => import('@/views/main/system/user/user.vue');

export default {
  path: '/main/system/user',
  name: 'menu',
  component: user,
  children: [],
  meta:{}
};
