/**
 *
 * @author:ChenDW
 * @date:2023-01-07 14:19
 */
import { createPinia } from 'pinia';
import useLoginStore from '@/store/login';

import type { App } from 'vue';

const pinia = createPinia();

function registerStore(app: App) {
  app.use(pinia);
  const loginStore = useLoginStore();
  loginStore.loadLocalCacheAction();
}

export default registerStore;
