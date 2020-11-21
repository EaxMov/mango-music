import {request} from './request'

export function sendComment(t,type,id,content,commentId){
  return request({
    url:`/comment`,
    params:{
      t,
      type,
      id,
      content,
      commentId,
      timestamp: new Date().getTime()
    }
  })
}