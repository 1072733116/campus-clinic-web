/**
 *
 * @author:ChenDW
 * @date:2023-01-31 20:20
 */
const manage = () => import('@/views/main/clinic/manage/manage.vue');

export default {
  path: '/main/clinic/manage',
  name: 'mange',
  component: manage,
  children: [],
  meta:{}
};
