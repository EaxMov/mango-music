import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/iconfont.css'
import './plugin/elementui'
Vue.config.productionTip = false

import VueLazyLoad from 'vue-lazyload'
//使用懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/placeholder.png')
})

//下拉加载更多
import infiniteScroll from 'vue-infinite-scroll' 
Vue.use(infiniteScroll)

import { Swiper as SwiperClass, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Autoplay, Navigation])
Vue.use(getAwesomeSwiper(SwiperClass))
import 'swiper/swiper-bundle.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$bus = new Vue()