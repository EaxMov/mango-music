import { request } from "./request"

export function sendComment(t, type, id, content, commentId) {
  //发送评论
  return request({
    url: `/comment`,
    params: {
      t,
      type,
      id,
      content,
      commentId,
      timestamp: new Date().getTime()
    }
  })
}

export function LikedSouce(id,t,type){ //mv/视频点赞
  return request({
    url: `/resource/like`,
    params:{
      id,
      t,
      type,
      timestamp: new Date().getTime()
    }
  })
}

export function likeComment(id, cid, t, type) { //楼层点赞
  //给评论点赞
  return request({
    url: `/comment/like`,
    params: {
      t,
      type,
      id,
      cid,
      timestamp: new Date().getTime()
    }
  })
}
