import {request} from './request'

export function getBanner(){ //推荐-获取轮播图
    return request({
        url:'/banner'
    })
}

export function getRecommendMusicList(limit = 16){ //推荐-推荐歌单
    return request({
        url:`/personalized?limit=${limit}`
    })
}

export function getRecommendNewMusc(){  //推荐-推荐新歌
    return request({
        url:'/personalized/newsong'
    })
}

export function getRecommendSinger(offset=0,limit=30){   //推荐-推荐歌手
    return request({
        url:`/top/artists?offset=${offset}&limit=${limit}`
    })
}