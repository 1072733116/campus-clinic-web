/**
 *
 * @author:ChenDW
 * @date:2023-01-31 16:58
 */
import { HOME_URL } from '@/config/config';

const home = () => import('@/views/main/home/home.vue');

export default {
  path: HOME_URL,
  name: 'home',
  component: home,
  children: [],
  meta: {
    isFixed: true
  }
};
