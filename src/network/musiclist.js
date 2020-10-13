import {request} from './request'

export function getCatList(){  //歌单类型全部分类
  return request({
    url:'/playlist/catlist'
  })
}

export function getCatHot(){ //热门歌单
  return request({
    url:'/playlist/hot'
  })
}

export function getCatgoryList(order='hot',cat='全部',limit=40,offset=0){ //热门歌单
  return request({
    url:'/top/playlist',
    params:{
      order,
      cat,
      limit,
      offset
    }
  })
}

