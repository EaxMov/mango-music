import { request } from "./request"

export function getAllMv(area, type, order, offset = 0, limit = 12) {
  //video标签全部分类
  return request({
    url: `/mv/all`,
    params: {
      area,
      type,
      order,
      limit,
      offset
    }
  })
}

export function getMvUrl(id){ //mv播放链接
  return request({
    url: `/mv/url?id=${id}`
  })
}

export function getMvMp3Detail(id){ //mv详情
  return request({
    url: `/mv/detail?mvid=${id}`
  })
}

export function getMvRelated(id){ //mv相关推荐
  return request({
    url: `/simi/mv?mvid=${id}`
  })
}

export function getMvInfo(id){ //mv点赞评论收藏
  return request({
    url: `/mv/detail/info?mvid=${id}`,
    params:{
      timestamp: new Date().getTime()
    }
  })
}

export function getMvComment(id, offset = 0,limit = 20){ //mv评论详情
  return request({
    url: `/comment/mv?id=${id}`,
    params:{
      limit,
      offset,
      timestamp: new Date().getTime()
    }
  })
}

