import {request} from './request'

export function getArtistList(limit=40,offset=0,type=-1,area=-1,initial=-1){  //歌手分类
  return request({
    url:'/artist/list',
    params:{
      limit,
      offset,
      type,
      area,
      initial
    }
  })
}