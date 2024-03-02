/**
 *
 * @author:ChenDW
 * @date:2023-01-31 20:28
 */

const record = () => import('@/views/main/patient/record/record.vue');

export default {
  path: '/main/patient/record',
  name: 'record',
  component: record,
  children: [],
  meta: {}
};
