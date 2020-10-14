<template>
<div class="SearchBox">
  <div class="searchTop">
    <div class="searchBtn">
      <input type="text" class="input" v-model="searchkeywords" @input="searchAutomatic">
      <i class="iconfont icon-search btn"></i>
    </div>
  </div>
  <div class="searchResult bystyle">
    <div class="ResultTop">
      <span>搜索结果</span>
      <ul class="meu">
        <li v-for="(item,index) in meu" :class="{active:index===currentIndex}" @click="select(index)">{{item}}</li>
      </ul>
    </div>
    <MusicList :songsList="songsList" :share="false" :collection="false" v-if="currentIndex === 0"/>
    <SingerList class="layout" :recommendSinger="singerList" :showType="2" v-if="currentIndex === 1"/>
    <AlbumList class="layout" :albumList="albumList" v-if="currentIndex === 2"/>
    <MvList class="layout" :Meutype="'search'" :mvlistArr="videoList" v-if="currentIndex === 3"/>
    <MeuList2 class="layout" :recommendMuiscLists="MusicMeuList" v-if="currentIndex === 4"/>
  </div>
</div>

</template>

<script>
import {debounce} from '@/common/js/utils'
import {getSearchKeywords} from '@/network/search'
import {getMusicDetail} from '@/network/playing'
import MusicList from '@/components/common/com_musiclist/MusicList'
import SingerList from '@/components/common/com_singerlist/SingerList'
import AlbumList from '@/components/common/com_albumlist/AlbumList'
import MvList from '@/components/common/com_mvlist/MvList'
import MeuList2 from '@/components/common/com_meulist/MeuList2'
export default {
  name:'Search',
  components:{
    MusicList,
    SingerList,
    AlbumList,
    MvList,
    MeuList2
  },
  data() {
    return {
      searchkeywords:'',
      meu:['单曲','歌手','专辑','视频','歌单'],
      currentIndex:0,
      songsList:[],//单曲
      singerList:[],//歌手
      albumList:[],//专辑
      videoList:[],//视频
      MusicMeuList:[],//歌单
      timer:null

    }
  },
  created() {
    this.searchkeywords = this.$route.query.keyword
    this.getDataModul()
  },
  methods: {
    select(index){
      this.currentIndex = index
    },
    getSearchKeywords(type){
      getSearchKeywords(this.searchkeywords,type).then(res => {
        switch(type){
          case 1 : 
            let trackIds = res.data.result.songs.map(item => {return item.id}).join(',')
            getMusicDetail(trackIds).then(res => {
              if(res.data.code !== 200) return this.$message.error('请求歌单信息失败')
              this.songsList = res.data.songs
            });break;
          case 100 : this.singerList = res.data.result.artists;break;
          case 10 : this.albumList = res.data.result.albums;break;
          case 1014 : this.videoList = res.data.result.videos;break;
          case 1000 : this.MusicMeuList = res.data.result.playlists;break;
        }
      })
    },
    searchAutomatic(){
      if(this.timer){ clearTimeout(this.timer)}
      this.timer = setTimeout(() => {
        if(this.searchkeywords){
          this.getDataModul()
        }
      }, 500);
    },
    getDataModul(){
      if(this.searchkeywords){
        this.getSearchKeywords(1)     //单曲
        this.getSearchKeywords(100)  //歌手
        this.getSearchKeywords(10)   //专辑
        this.getSearchKeywords(1014)  //视频
        this.getSearchKeywords(1000)  //歌单
      }
    }

  },
  computed: {
    keywordschange(){
      return this.$route.query.keyword
    }
  },
  watch: {
    keywordschange(){
      this.searchkeywords = this.$route.query.keyword
      this.getDataModul()
    }
  },
}
</script>

<style scoped>
.SearchBox{
  margin-top: -20px;
}
.searchTop{
  height: 250px;
  width: 100%;
  background: url('~@/assets/img/searchbg_1.jpg') no-repeat;
  background-size: cover;
  background-position: 0 52%;
  background-attachment: fixed;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchTop::before{
  content:'';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background: linear-gradient(180deg,#2980B9,#6DD5FA,#0082c8);
  opacity: .07;
}
.input{
  width: 720px;
  height: 54px;
  outline: none;
  border: none;
  border-radius: 3px;
  background-color: #ffffff;
  padding: 0 30px 0 20px;
  font-size: 14px;
  color: rgb(143, 142, 142);
}
.searchBtn{
  position: relative;
}
.btn{
  color: rgb(143, 142, 142);
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 16px;
  cursor: pointer;
}
.ResultTop{
  display: flex;
  margin-top: 45px;
  align-items: center;
}
.meu{
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  margin-left: 50px;
}
.meu li{
  margin-right: 40px;
  position: relative;
  white-space: nowrap;
  cursor: pointer;
}
.ResultTop span{
  font-size: 22px;
  font-weight: 700;
}
.meu li:before{
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 100%;
  height: 4px;
  opacity: 0;
  background-color: rgb(231, 190, 19,.5);
  transition: right .25s,opacity .25s;
}
.active{
  font-weight: 700;
}
.meu li.active::before{
  right: 0;
  opacity: 1;
}
.layout{
  margin-top: 40px;
  margin-left: -15px;
  margin-right: -15px;
}
</style>