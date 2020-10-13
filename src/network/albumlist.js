import {request} from './request'

export function getAlbumList(id,limit=18,offset=0){ //获取专辑列表
    return request({
        url:'/artist/album',
        params:{
          id,
          limit,
          offset
        }
    })
}