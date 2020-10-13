import {request} from './request'

export function getArtistDesc(id){  //歌手描述
  return request({
    url:`/artist/desc?id=${id}`
  })  
}

export function getArtist(id){  //歌手信息
  return request({
    url:`/artists?id=${id}`
  })  
}

export function getUserDetail(id){  //用户信息
  return request({
    url:`/user/detail?uid=${id}`
  })  
}

export function getMv(id,limit,offset=0){ //MV列表
  return request({
    url:'/artist/mv',
    params:{
      id,
      limit,
      offset
    }
  })
}

export function getSimiSinger(id){  //相似歌手
  return request({
    url:`/simi/artist?id=${id}`
  })  
}