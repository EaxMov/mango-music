import {request} from './request'

export function getAblumSheet(id){  //歌单信息
  return request({
    url:`/album?id=${id}`
  })  
}

export function getUserComent(id,limit=28,offset=0){  //用户评论
  return request({
    url:`/comment/album?id=${id}`,
    params:{
      limit,
      offset
    }
  })  
}