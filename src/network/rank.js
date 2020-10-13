import {request} from './request'

export function getTopRankList(){
  return request({
    url:'/toplist/detail'
  })
}

export function getPlayListDetail(id){
  return request({
    url:`/playlist/detail?id=${id}`
  })
}