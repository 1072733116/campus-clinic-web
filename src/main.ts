import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import registerIcons from '@/global/register-icons';
import 'normalize.css';
import '@/assets/css/index.less';

const app = createApp(App);
app.use(registerIcons);
app.use(store);
app.use(router);
app.mount('#app');
