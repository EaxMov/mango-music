import {request} from './request'

export function login(phone,password){  //歌单信息
  return request({
    url:`/login/cellphone`,
    params:{
      phone,
      password
    }
  })  
}