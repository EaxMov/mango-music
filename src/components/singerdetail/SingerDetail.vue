<template>
<div class="SingerDetail">
  <div class="topBox" :class="bgrandom">
    <div class="zhezhao">
      <div class="singerbox">
        <!-- 封面 -->
        <div class="cover">
          <img v-if="artist.artist && artist.artist.img1v1Url" v-lazy="artist.artist.img1v1Url + '?param=120y120'" alt="">
          <div class="level" v-if="userdetail && userdetail.level">
            <i :class="'iconfont icon-level-' + islevel"></i>
          </div>
        </div>
        <!-- 歌手名字 -->
        <div class="singername" v-if="artist.artist && artist.artist.name">
          {{artist.artist.name}}
           <i :class="'iconfont icon-CRM_icon_' + isgender +' '+ isgender" v-if="userdetail.profile && userdetail.profile.gender"></i>
         </div>
        <!-- 关注他 -->
        <div class="followhe">
          <i class="iconfont icon-weibiaoti1"></i>
          关注TA
        </div>
        <!-- 简介 -->
        <div class="singerdest" :title="artistdest.briefDesc">
          {{artistdest.briefDesc}}
        </div>
        <!-- 歌手各类信息 -->
        <ul class="singerinfo ul" v-if="artist.artist">
          <li><p>{{artist.artist.musicSize}}</p><p>歌曲</p></li>
          <li><p>{{artist.artist.albumSize}}</p><p>专辑</p></li>
          <li><p>{{artist.artist.mvSize}}</p><p>MV</p></li>
          <li v-if="userdetail.profile"><p>{{userdetail.profile.followeds}}</p><p>粉丝</p></li>
        </ul>
      </div>

    </div>
    <div class="bgarrow"></div>
  </div>
  <div class="containerBox bystyle">
    <ul class="navbar ul">
      <li :class="{currentcolor:index === currentIndex}" v-for="(item,index) in navbar" @click="currentIndex = index">{{item}}</li>
    </ul>
    <!-- 作品列表 -->
    <MusicList :songsList="artist.hotSongs" :share="false" :collection="false" v-if="currentIndex === 0" />
    <!-- 专辑列表 -->
    <AlbumList :albumList="albumList" v-if="currentIndex === 1"/>
    <!-- MV列表 -->
    <MvList :mvlistArr="mvList" v-if="currentIndex === 2"/>
    <!-- 歌手详情 -->
    <div class="introduce" v-if="currentIndex === 3">
        <h2 class="title" v-if="artist.artist">
          {{artist.artist.name}}·简介
        </h2>
        <p class="introducep">{{artistdest.briefDesc}}</p>
        <div class="item" v-for="item in artistdest.introduction">
          <h3>{{item.ti}}</h3>
          <p v-html="item.txt"></p>
        </div>
    </div>

  <SingerList :recommendSinger="simisingerList" v-if="currentIndex === 4"/>


  </div>
</div>

</template>

<script>
import AlbumList from '@/components/common/com_albumlist/AlbumList'
import MusicList from '@/components/common/com_musiclist/MusicList'
import MvList from '@/components/common/com_mvlist/MvList'
import SingerList from '@/components/common/com_singerlist/SingerList'

import {getArtistDesc,getArtist,getUserDetail,getMv,getSimiSinger} from '@/network/singer-detail'
import {getAlbumList} from '@/network/albumlist'

export default {
  name:'SingerDetail',
  components:{
    MusicList,
    AlbumList,
    MvList,
    SingerList
  },
  data() {
    return {
      currentIndex:0,
      navbar:['作品','专辑','MV','歌手详情','相似歌手'], //功能菜单
      artistdest:[], //歌手介绍
      artist:[], //歌手详细信息
      userdetail:[], //用户信息
      albumList:[], //专辑列表
      mvList:[], //mv列表
      simisingerList:[], //相似歌手列表
    }
  },
  created() {
    this.getArtistDesc()
    this.getArtist()
    this.getUserDetail()
    this.getSimiSinger()
  },
  methods: {
    getArtistDesc(){  //歌手简介
      getArtistDesc(this.$route.query.id).then(res => {
        if(res.data.code!==200){return this.$message.error('获取歌手简介失败')}
        res.data.introduction.map((item,index) => {
         res.data.introduction[index].txt = item.txt.replace(/\n|\r/gm,'<br/>')
        })
        this.artistdest = res.data
        console.log(this.artistdest);
      })
    },
    getArtist(){  //歌手信息
      getArtist(this.$route.query.id).then(res =>{
        var id = this.$route.query.id
        if(res.data.code!==200){return this.$message.error('获取歌手信息失败')}
        this.artist = res.data
        this.getAlbumList(id,this.artist.artist.albumSize,0)
        this.getMv(id,this.artist.artist.mvSize,0)
      })
    },
    getUserDetail(){    //用户详细信息
      if(this.$store.state.userId){
        getUserDetail(this.$store.state.userId).then(res => {
        if(res.data.code!==200){return this.$message.error('获取用户详细信息失败')}
          this.userdetail = res.data
        })
      }
    },
    getAlbumList(id,limit,offset){  //歌手专辑列表
      getAlbumList(id,limit,offset).then(res => {
        if(res.data.code!==200){return this.$message.error('获取歌手专辑列表失败')}
        this.albumList = res.data.hotAlbums
      })
    },
    getMv(id,limit){  //获取mv列表
      getMv(id,limit).then(res => {
        if(res.data.code!==200){return this.$message.error('获取MV列表失败')}
        this.mvList = res.data.mvs
      })
    },
    getSimiSinger(){ //相似歌手
      getSimiSinger(this.$route.query.id).then(res => {
        if(res.data.code!==200){return this.$message.error('获取相似歌手列表失败')}
        this.simisingerList = res.data.artists
      })
    }
  },
  computed: {
    islevel(){
      return this.userdetail.level
    },
    isgender(){
      return this.userdetail.profile && this.userdetail.profile.gender === 1 ? 'nanxing' : 'nvxing'
    },
    bgrandom(){
      return Math.floor(Math.random()*10) > 5 ? 'bg1' : 'bg2'
    }
  }
}
</script>

<style scoped>
.SingerDetail{
  margin-top: -20px;
}
.topBox{
  width: 100%;
  height: 580px;
  position: relative;
}
.bg1{
  background: url('https://file.moetu.org/images/2020/11/25/bg1ea11cd75762df235.jpg') no-repeat;
  background-size: cover;
}
.bg2{
  background: url('https://file.moetu.org/images/2020/11/25/bg25453fcb547f3d8e7.jpg') no-repeat;
  background-size: cover;
}
.bgarrow{
  position: absolute;
  bottom: -1px;
  height: 137px;
  background: url('~@/assets/img/bgarow.png') no-repeat;
  background-position: 50%;
  width: 100%;
}
.zhezhao{
  width: 100%; 
  height: 100%;
  background-color: rgb(0, 0, 0,.5);
}
.singerbox{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cover{
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}
.cover img{
  width: 100%;
  border-radius: 50%;
  background: #fff;
  border: 3px solid rgb(255, 255, 255);
}
.cover:hover{
  box-shadow: 0 0px 20px 0 hsla(0,0%,100%,.8);
}
.level{
  text-align: center;
  width: 100%;
  height: 25px;
  position: absolute;
  background-color: rgb(255, 255, 255,.7);
  left: 0;
  bottom: 0;
}
.level i{
  font-size: 25px;
  color: red;
  margin-left: 5px;
}
.singername{
  margin-top: 20px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}
.singername i{
  font-size: 20px;
}
.nanxing{
  color: #1f91f2;
}
.nvxing{
  color: #fc7265;
}
.followhe{
  color: white;
  height: 36px;
  width: 96px;
  border: 1px solid rgb(236, 236, 236,.7);
  border-radius: 18px;
  line-height: 36px;
  font-size: 12px;
  margin: 20px 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.followhe i{
  margin-right: 5px;
  font-size: 16px;
}
.singerdest{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-weight: 700;
  color: hsla(0,0%,100%,.6);
  line-height: 24px;
  width: 740px;
  font-size: 14px;
  text-indent: 2rem;
  margin: 0 auto 24px;
  text-align: center;
}
.singerinfo{
  color: white;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.singerinfo li{
  margin: 0 50px;
  text-align: center;
}
.singerinfo li p{
  margin: 0;
}
.singerinfo li p:first-child{
  font-size: 24px;
  margin-bottom: 5px;
}
.singerinfo li p:last-child{
  font-size: 14px;
  color: hsla(0,0%,100%,.6);
}
.ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.navbar{
  margin: 30px 0;
  display: flex;
  justify-content: center;
}
.navbar li{
  margin: 0 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.currentcolor{
  color: #fa2800;
}
.title{
  position: relative;
  text-align: center;
  padding: 0;
  margin: 0 0 30px;
  font-size: 16px;
}
.title::before{
  content: "";
  width: 40px;
  height: 3px;
  background: #fa2800;
  position: absolute;
  left: 50%;
  bottom: -10px;
  margin-left: -20px;
}
.introducep{
  text-indent: 2em;
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}
.item h3 {
  margin:0 0 20px;
  font-size: 14px;
}
.item p{
  line-height: 1.7;
  margin:0 0 20px;
  font-size: 14px;
}
</style>