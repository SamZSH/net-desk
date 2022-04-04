import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

// element
Vue.use(ElementUI);

// 引入字体图标
import '@/assets/font/iconfont.css'

// 引入全局样式
import '@/style/common.less';
import '@/style/common.js';

// 引入全局过滤器
import '@/config/filters.js'

// 引入animate.css
import '@/plugins/animate.js'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
