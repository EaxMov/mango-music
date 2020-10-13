<template>
<div class="MusicList">
  <div class="playcontrol">
  <div class="playall" @click="playall"><i class="iconfont icon-bofangsanjiaoxing"></i>播放全部</div>
  <div class="playall collection" v-if="collection"><i class="iconfont icon-shoucang"></i>收藏({{collectioncount | playcount}})</div>
  <div class="playall collection" v-if="share"><i class="iconfont icon-fxiang"></i>分享({{sharecount | playcount}})</div>
  </div>
  <table class="music-table" v-loading="!(songsList && songsList.length>0)">
    <thead>
      <tr>
        <th class="tr_index">序号</th>
        <th class="tr_music">歌曲</th>
        <th class="tr_singer">歌手</th>
        <th class="tr_album">专辑</th>
        <th class="tr_duration">时长</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in songsList" :key="item.id" :class="{trbg:index%2 !== 0}" @dblclick="Dbselect(index)">
        <td><div class="tb_index">{{index + 1 | padStart}}</div></td>
        <td>
          <div class="PicAndName ellipsis">
            <div class="tb_img"><img v-lazy="item.al.picUrl + '?param=50y50'"></div>
            <div class="tb_musicname ellipsis "  :title="item.name">{{item.name}}</div>
          </div>
        </td>
        <td><div class="arname ellipsis" :title="item.ar[0].name">{{item.ar | ManySingers}}</div></td>
        <td><div class="tb_album ellipsis" :title="item.al.name">{{item.al.name}}</div></td>
        <td><div class="tb_duration ellipsis">{{item.dt | formatDate}}</div></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import {playCount,formatDate,ManySingers} from '@/common/js/utils'
export default {
  name:'MusicList',
  props:{
    share:{
      type:Boolean,
      default:true
    },
    collection:{
      type:Boolean,
      default:true
    },
    sharecount:{
      type:[String,Number],
      default:''
    },
    collectioncount:{
      type:[String,Number],
      default:''
    },
    songsList:{
      type:Array
    }
  },
  methods: {
    Dbselect(index){ //列表点击播放
      this.$bus.$emit('BtPlayisShowEvent',this.songsList[index])
      this.$bus.$emit('currentIndex',index) //发送当前点击的index索引
      var temp = this.$store.state.ModelList
      if((temp &&temp[0].id === this.songsList[0].id) && temp.length === this.songsList.length) return
      this.$store.commit('UpdatePlayModelList',this.songsList) //记录当前播放的是哪个模块到仓库中  //Store
    },
    playall(){  //播放全部
      this.$bus.$emit('BtPlayisShowEvent',this.songsList[0])
      this.$bus.$emit('currentIndex',0) //发送当前点击的index索引
      var temp = this.$store.state.ModelList
      if((temp &&temp[0].id === this.songsList[0].id) && temp.length === this.songsList.length) return
      this.$store.commit('UpdatePlayModelList',this.songsList) //记录当前播放的是哪个模块到仓库中  //Store
    }
  },
  filters:{
    playcount(count){
      return playCount(count)
    },
    formatDate(time){
      return formatDate(new Date(time),'mm:ss')
    },
    padStart(value){
      return String(value).padStart('2','0')
    },
    ManySingers(singers){
      return ManySingers(singers)
    }
  }
}
</script>

<style scoped>
.playcontrol{
  display: flex;
  margin: 15px 0;
  justify-content: flex-end;
}
.playall{
  padding: 7px 15px;
  border-radius: 50px;
  cursor: pointer;
  background-color: #fa2800;
  color: white;
  font-size: 14px;
  margin-left: 15px;
  display: flex;
  align-items: center;
}
.collection{
  background-color: #f2f2f2;
  color: rgb(126, 123, 123);
}
.playall i{
  font-size: 16px;
  margin-right: 5px;
}
.music-table{
  width: 100%;
  font-size: 14px;
  border-spacing: 0;
  table-layout: fixed;
}
.music-table thead{
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: rgb(250, 250, 250);
  color: rgb(153, 153, 153);
}
.tr_index,.tr_music,.tr_singer,.tr_album,.tr_duration{
  font-weight: 300;
  padding: 0px 9px;
  line-height: 50px;
}
.ellipsis{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tr_index{
  width: 10%;
}
.tr_music{
  width: 35%;
  text-align: left;
}
.tr_singer{
  width: 25%;
  text-align: left;
}
.tr_album{
  width: 20%;
  text-align: left;
}
.tr_duration{
  width: 10%;
  text-align: center;
}
.trbg{
  background-color: #f7f7f7;
}
.tb_index{
  text-align: center;
}
.music-table tbody tr td{
  padding:  0 9px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.music-table tbody tr{
  height: 50px;
  transition: background-color .2s linear;
}
.music-table tbody tr:hover .tb_img::before{
  z-index: 999;
  content: '';
  width: 35px;
  height: 35px;
  background-color: rgb(0, 0, 0,.5);
  position: absolute;
  border-radius: 5px;
  background-image: url("~@/assets/img/music-player.png");
  background-repeat: no-repeat;
  background-size: 50%;
  background-position:50% 50%;
}
.music-table tbody tr:hover{
  background-color: #e8e9ed;
}
.PicAndName{
  display: flex;
  align-items: center;
}
.tb_img{
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  position: relative;
}
.tb_img img{
  width: 100%;
  border-radius: 5px;
}
.tb_musicname{
  margin-left: 10px;
}
.tb_duration{
  text-align: center;
}
</style>