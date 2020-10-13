import Vue from 'vue';
import {Message,Button,Loading,Notification,MessageBox,Cascader,Pagination,Popover} from 'element-ui'
Vue.use(Button)
Vue.use(Loading)
Vue.use(Cascader)
Vue.use(Pagination)
Vue.use(Popover)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
