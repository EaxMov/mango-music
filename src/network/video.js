import {request} from './request'

export function getVideoCategoryAll(){  //video标签全部分类
  return request({
    url:`/video/group/list`
  })  
}

export function getVideoCategory(){  //video标签部分列表
  return request({
    url:`/video/category/list`
  })  
}

export function getVideoRecommend(offset=0){  //video推荐视频
  return request({
    url:`/video/timeline/recommend`,
    params:{
      offset
    }
  })  
}

export function getVideoAll(offset=0){  //video全部视频
  return request({
    url:`/video/timeline/all`,
    params:{
      offset
    }
  })  
}

export function getVideoDetail(id,offset=0){  //video视频分类下的视频
  return request({
    url:`/video/group`,
    params:{
      id,
      offset
    }
  })  
}

