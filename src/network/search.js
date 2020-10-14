import {request} from './request'

export function getSearchHot(){  //简略热搜
  return request({
    url:`/search/hot`
  })  
}


export function getSearchHotDetail(){  //详细热搜
  return request({
    url:`/search/hot/detail`
  })  
}

export function getSearchKeywords(keywords,type=1,limit=30,offset=0){
  return request({
    url:`/search?keywords=${keywords}`,
    params:{
      type,
      limit,
      offset
    }
  })
}