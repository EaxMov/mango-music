import {request} from './request'

export function getMusicDetail(id){
  return request({
    url:`/song/detail?ids=${id}`
  })  
}

export function getMusicMP3(id){
  return request({
    url:`/song/url?id=${id}`
  })
}
export function getMusicLyric(id){
  return request({
    url:`/lyric?id=${id}`
  })
}

export function getSingerInfo(id){ //歌手详细信息
  return request({
    url:`/artists?id=${id}`
  })
}

export function getSimilarsongs(id){  //获取相似歌曲
  return request({
    url:`/simi/song?id=${id}`
  })
}

export function getAlbum(id){ //获取歌曲版权信息
  return request({
    url:`/album?id=${id}`
  })  
}
