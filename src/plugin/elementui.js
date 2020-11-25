import Vue from 'vue';
import {Popconfirm,Message,Button,Loading,Notification,MessageBox,Cascader,Pagination,Popover,Form,FormItem,Input,Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
Vue.use(Button)
Vue.use(Loading)
Vue.use(Cascader)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Popconfirm)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
