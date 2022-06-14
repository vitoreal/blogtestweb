import { createApp } from 'vue'
import App from './views/App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import router from './router';

import BaseLayout from './components/base/BaseLayout.vue';
import HeaderLayout from './components/base/HeaderLayout.vue';
import FooterLayout from './components/base/FooterLayout.vue';


const app = createApp(App).use(router).use(VueAxios, axios);
 
app.component('base-layout', BaseLayout);
app.component('header-layout', HeaderLayout);
app.component('footer-layout', FooterLayout);

router.isReady().then(() => {
    app.mount('#app');
});