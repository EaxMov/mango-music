import Vue from 'vue';
import {Message,Button,Loading,Notification,MessageBox,Cascader,Pagination,Popover,Form,FormItem,Input} from 'element-ui'
Vue.use(Button)
Vue.use(Loading)
Vue.use(Cascader)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
