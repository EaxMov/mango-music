import {request} from './request'

export function getuserDetail(uid){  //获取用户详情
  return request({
    url: `/user/detail?uid=${uid}`
  })
}

export function getuserRecord(uid,type){ //获取播放记录
  return request({
    url:'/user/record',
    params:{
      uid,
      type
    }
  })
}

export function getuserPlaylist(uid,limit = 30,offset = 0){ //用户歌单
  return request({
    url:"/user/playlist",
    params:{
      uid,
      limit,
      offset
    }
  })
}
  