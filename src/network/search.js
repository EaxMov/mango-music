import {request} from './request'

export function getSearchHot(){  //简略热搜
  return request({
    url:`/search/hot`
  })  
}


export function getSearchHotDetail(){  //简略热搜
  return request({
    url:`/search/hot/detail`
  })  
}