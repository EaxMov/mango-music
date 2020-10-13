import {request} from './request'

export function getSongSheet(id){  //歌单信息
  return request({
    url:`/playlist/detail?id=${id}`
  })  
}

export function getSubscribers(id,limit=28){ //获取收藏的用户
  return request({
    url:'/playlist/subscribers',
    params:{
      id,
      limit
    }
  })
}


export function getrelated(id){  //获取相关歌单
  return request({
    url:`/related/playlist?id=${id}`
  })  
}

export function getUserComent(id,limit=20){
  return request({
    url:`/comment/playlist`,
    params:{
      id,
      limit
    }
  })  
}