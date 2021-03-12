import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'
import VueAMap from "vue-amap";
import '@/permission'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key:'ae0b3b501631fe61ed7be6354a640cc1',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
Vue.config.productionTip = false
const options = {
  namespace: 'pro__',
  name: 'ls',
  storage: 'local'
}
Vue.use(Antd)

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
