<template>
<div class="SongSheet bystyle"  ref="SongSheetRef">
  <div class="leftlayout shadow">
    <div class="top">
      <div class="cover"><img v-lazy="songsheetList.coverImgUrl + '?param=200y200'" alt=""></div>

      <div class="info">

        <div class="titleAndcount">
          <h2>{{songsheetList.name}}</h2>
          <div class="count">
            <div class="songcount"><p>歌曲数</p><p>{{songsheetList.trackCount}}</p></div>
            <div class="playcount"><p>播放数</p><p>{{songsheetList.playCount | playcount}}</p></div>
          </div>
        </div>

        <div class="author" v-if="songsheetList">
          <div class="authopic"><img :src="songsheetList.creator.avatarUrl + '?param=50y50'" alt="" :title="songsheetList.creator.signature"></div>
          <div class="nickname">{{songsheetList.creator.nickname}}</div>
          <div class="createtime">{{songsheetList.createTime | formatdate}}创建</div>
        </div>

        <div class="tags" v-if="songsheetList.tags && songsheetList.tags.length>0">
          标签：<a class="tagsitems" v-for="item in songsheetList.tags">{{item}}</a>
        </div>
        <p class="introduce" v-html="songsheetList.description"></p>
        <div class="showAll" v-if="introducelength(songsheetList.description) > 50"><a @click="showAll(songsheetList.name,songsheetList.description)">详情 ></a></div>
      </div>  
    </div>

    <!-- 歌单列表 -->
    <MusicList :sharecount="songsheetList.subscribedCount" :collectioncount="songsheetList.shareCount" :songsList="songsList" />
    
  </div>
  <div class="rightlayout">

    <div class="subscribers shadow boxlayout">
      <div class="title"><a>歌单收藏者</a> </div>
      <ul v-loading="!subscribers" class="subscribersList" v-if="subscribers && subscribers.length>0">
        <li v-for="item in subscribers">
          <div class="avatarPic" ><img v-lazy="item.avatarUrl + '?param=50y50'" :title="item.nickname"></div>
        </li>
      </ul>
      <div v-else class="userinfo"><a>还没人收藏~</a></div>
    </div>

    <div class="reMuicMeu shadow boxlayout">
      <div class="title"><a>相似歌单推荐</a> </div>
      <div class="relatedBox" v-if="songsheetList">
        <ul v-loading="!relatedList" class="relatedList">
          <li v-for="item in relatedList" @click="SelectRelateList(item.id)">
            <div class="relateCover"><img v-lazy="item.coverImgUrl + '?param=50y50' " alt=""></div>
            <div class="relateInfo">
              <p>{{item.name}}</p>
              <p>{{item.creator.nickname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="GoodComments shadow boxlayout">
      <div class="title" v-if="userComent.type === 0"><a>精彩评论</a> </div>
      <div class="title" v-else><a>最新评论</a> </div>
      <div class="comendBox" v-if="userComent.comments && userComent.comments.length>0">
        <ul class="comendList" key="">
          <li v-for="item in userComent.comments" class="comitem">
            <div class="userAvator"><img v-lazy="item.user.avatarUrl  + '?param=50y50' " alt=""></div>
            <div class="userinfo">
              <h5>{{item.user.nickname}}<a>{{item.time | getAgoAt}}</a></h5>
              <p>{{item.content}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="userinfo"><a>暂无评论</a></div>
    </div>
  </div>
</div>

</template>

<script>
import MusicList from '@/components/common/com_musiclist/MusicList'
import {getSongSheet,getSubscribers,getrelated,getUserComent} from '@/network/songsheet'
import {getMusicDetail} from '@/network/playing'
import {formatDate,playCount,getAgoAt} from '@/common/js/utils'
export default {
  name:'SongSheet',
  components:{
    MusicList
  },
  data() {
    return {
      Sid:'',
      songsheetList:'',//歌单信息
      subscribers:[], //收藏歌单用户
      relatedList:[], //相似歌单
      songsList:[], //歌单列表
      userComent:{}, //用户评论
    }
  },
  created() {
    this.getdata()
  },
  watch: {
    
  },
  methods: {
    showAll(title,content){
      this.$alert(content, title, {
        closeOnClickModal: true,
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        iconClass:'el-icon-paperclip',
        callback: action => {}
      })
    },
    SelectRelateList(id){
      this.$router.push({
        path:'/mango-music/songsheet',
        query:{
          id
        }
      })
    },
    getSongSheet(){
      getSongSheet(this.Sid).then(res => {
        if(res.data.code !== 200) return this.$message.error('请求歌单信息失败')
        if(res.data.playlist.description !== null){
          res.data.playlist.description = res.data.playlist.description.replace(/\n|\r/gm,'<br/>')
        }
        this.songsheetList = res.data.playlist
        let trackIds = res.data.playlist.trackIds.map(item => {
          return item.id
        }).join(',')
        getMusicDetail(trackIds).then(res => {
          if(res.data.code !== 200) return this.$message.error('请求歌单信息失败')
          this.songsList = res.data.songs
        })
      })
    },
    getSubscribers(){
      getSubscribers(this.Sid).then(res => {
        if(res.data.code !== 200) return this.$message.error('获取收藏用户失败')
        this.subscribers = res.data.subscribers
      })
    },
    getrelated(){
      getrelated(this.Sid).then(res => {
        if(res.data.code !== 200) return this.$message.error('获取相似歌单失败')
        this.relatedList = res.data.playlists
      })
    },
    getUserComent(){
      getUserComent(this.Sid).then(res => {
        if(res.data.code !== 200) return this.$message.error('获取评论失败')
        if(res.data.hotComments.length>0){
          this.userComent['comments'] = res.data.hotComments
          this.userComent['type'] = 0
        }else{
          this.userComent['comments'] = res.data.comments
          this.userComent['type'] = 1
        }
      })
    },
    getdata(){
      this.Sid = this.$route.query.id
      this.getSongSheet()
      if(this.Sid){
        this.getSubscribers()
        this.getrelated()
        this.getUserComent()
      }
    }
  },
  computed: {
    introducelength(){
      return function(txt){
        if(txt){
          return txt.length
        }
      }
    },
    idchange(){ //监听id变化，重载刷新数据
      return this.$route.query.id
    }
  },
  watch:{
    idchange(){
      console.log("reload");
      this.getdata()
    }
  },
  filters:{
    formatdate(value){
      let date = new Date(value);
      return formatDate(date,'yyyy-MM-dd')
    },
    playcount(count){
      return playCount(count)
    },
    getAgoAt(time){
      return getAgoAt(time)
    }
  }
}
</script>

<style scoped>
.SongSheet{
  display: flex;
  min-height: 30px;
  align-items: flex-start;
}
.top{
  display: flex;
  margin-bottom: 20px;
}
.leftlayout{
  flex: 1;
  width: 1030px;
  padding: 15px;
  border-radius: 8px;
  margin-right: 20px;
}
.rightlayout{
  height: auto;
  flex: .37;
  width: 350px;
  border-radius: 8px;
}
.cover{
  width: 200px;
  height: 200px;
  border-radius: 8px;
  position: relative;
  flex-shrink: 0;
}
.cover::before{
  content: '';
  width: 95%;
  height: 95%;
  position: absolute;
  background: rgba(0,0,0,.2);
  left: 7%;
  top: 7%;
  border-radius: 8px;
}
.cover img{
  position: relative;
  width: 100%;
  border-radius: 8px;
}
.info{
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.info h2{
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 10px 0 15px 0;
}
.author{
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}
.authopic{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.authopic img{
  width: 100%;
  border-radius: 50%;

}
.nickname{
  margin-left: 15px;
  font-size: 14px;
}
.createtime{
  margin-left: 30px;
  font-size: 14px;
  color: rgb(141, 140, 140);
}
.tags{
  display: flex;
  margin-top: 15px;
  font-size: 14px;
  align-items: center;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
}
.tagsitems{
  color: white;
  margin-right:15px;
  background-color:#fa2800;
  border-radius: 15px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: normal;
}
.introduce{
  margin: 15px 0 0 0;
  margin-top: 15px;
  font-size: 14px;
  line-height: 1.6;
   white-space: pre-wrap;  /* 关键换行  */
/* 多行 https://segmentfault.com/a/1190000019479255?utm_source=tag-newest */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden; 
}
.showAll{
  font-size: 14px;
  color: red;
  margin-top: 5px;
  
}
.showAll a{
  cursor: pointer;
}
.titleAndcount{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.count{
  font-size: 12px;
  display: flex;
  color: #aca9a9;
}
.playcount{
  border-left: 1px solid #eeeeee;
}
.songcount{
  margin-right: 15px;
}
.playcount{
  padding-left: 15px;
}
.count p {
  margin: 0;
  text-align: center;
}
.boxlayout{
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 20px;
}
.title{
  border-left: 3px solid #fa2800;
  padding-left: 1rem;
  margin-bottom: 15px;
}
.title a{
  font-size: 14px;
  font-weight: 700;
}
.subscribersList{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -10px;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.subscribersList li {
  flex:0 0 14.28571428571%;
  max-width: 14.28571428571%;
  padding: 0 5px 10px;
  cursor: pointer;
}
.avatarPic{
  width: 100%;
  border-radius: 3px;
}
.avatarPic img{
  width: 100%;
  border-radius: 3px;
}
.relatedBox{
  margin-bottom: -15px;
}
.relatedList{
  width: 100%;
}
.relatedList li{
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.relatedList li p{
  margin: 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.relateCover{
  width: 50px;
  height: 50px;
  border-radius: 3px;
}
.relateCover img{
  border-radius: 3px;
}
.relateInfo{
  width: calc(100% - 60px);
  margin-left: 15px;
}
.relateInfo p:first-child{
  font-size: 14px;
  font-weight: 700;
}
.relateInfo p:last-child{
  font-size: 12px;
  color: #aca9a9;
}
.userAvator{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 15px;
}
.userinfo{
  flex:1;
}
.userinfo a{
  margin-left: 10px;
  font-size: 12px;
  color: #b0b0c7;;
  font-weight: normal;
}
.userinfo p,h5{
  margin: 0;
  padding: 0;
}
.userinfo h5{
  margin-bottom: 10px;
}
.userinfo p{
  font-size: 12px;
  color: #666;
  line-height: 1.6;
  background: #f5f5f5;
  padding: 5px 10px;
  border-radius: 3px;
}
.userAvator img{
  width: 100%;
  border-radius: 50%;
}
.comitem{
  display: flex;
  padding: 10px 0;
}
</style>