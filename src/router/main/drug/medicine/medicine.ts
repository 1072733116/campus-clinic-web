/**
 *
 * @author:ChenDW
 * @date:2023-01-31 19:01
 */
const medicine = () => import('@/views/main/drug/medicine/medicine.vue');

export default {
  path: '/main/drug/medicine',
  name: 'medicine',
  component: medicine,
  children: [],
  meta: {}
};
