<template>
<div class="RecommendNewMusic" v-loading="!recommendNewMusic.length">
  <titleCricular><h4>推荐新歌</h4></titleCricular>
  <div class="NewMusicList">
    <div class="ListItem shadow" v-for="(item,index) in recommendNewMusic" :key="item.id" @click="SelectNewMusic(index)">
      <div class="index">{{index + 1 | newSongs}}</div>
      <div class="musicimg"><img v-lazy="item.picUrl + '?param=80y80'"></div>
      <div class="muiscname">
        <h4>{{item.name}}</h4>
        <p>{{item.song.artists[0].name}}</p>
      </div>
      <div class="musicnameTwo">《{{item.name}}》</div>
      <div class="duration">{{item.song.duration | showDate}}</div>
    </div>
  </div>
</div>

</template>

<script>
import {formatDate} from '@/common/js/utils'
import titleCricular from '@/components/common/animations/title-circular'
export default {
  name:'RecommendNewMusic',
  components:{
    titleCricular
  },
  data(){
    return {
    }
  },
  props:{
    recommendNewMusic:{
      type:Array,
      default:[]
    }
  },
  created() {
  },
  methods: {
    SelectNewMusic(index){
      var currentList = []
      this.$store.commit('UpdataPlaying',true)
      this.$bus.$emit('BtPlayisShowEvent',this.recommendNewMusic[index].song)//告诉播放器来自哪个页面，因为可能data路径不同  //BottomPlay.vue
      //  this.$store.commit('UpdateRecommendNewMusic',res.data.result)  //把推荐新歌数据存储到仓库中，以便切换歌曲使用
      this.$bus.$emit('currentIndex',index) //发送当前点击的index索引

      var temp = this.$store.state.PlayModelList
      if((temp && temp[0].id === this.recommendNewMusic[0].id) && temp.length === this.recommendNewMusic.length) return  //防止重复触发
      for(var i=0; i<this.recommendNewMusic.length;i++){
        currentList.push(this.recommendNewMusic[i].song)
      }
      this.$store.commit('UpdatePlayModelList',currentList) //记录当前播放的是哪个模块到仓库中  //Store
    }
  },
  filters:{
    newSongs:value =>{
      return (value + '').padStart(2,'0')
    },
    showDate:value =>{
      return formatDate(new Date(value),'mm:ss')
    }
  }
}
</script>

<style scoped>
.RecommendNewMusic .title{
  padding: 0;
  margin: 0 0 15px 0;
}
.RecommendNewMusic .title h4{
  margin: 0;
}
.NewMusicList{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.ListItem{
  flex: 0 0 49%;
  max-width: 49%;
  background-color: rgb(255, 255, 255,.3);
  border-radius: 3px;
  margin-bottom: 20px;
  height: 70px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 2%;
}
.ListItem:hover{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.06);
}
.ListItem:hover .musicimg::before{
  transition-duration: 1s;
  content: '';
  width: 3.5em;
  height: 3.5em;
  background-color: rgb(15, 1, 1,.6);
  background-image: url("~@/assets/img/music-player.png");
  background-repeat: no-repeat;
  background-size: 50%;
  background-position:50% 50%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 2px;;
}
.index{
  font-weight: 700;
}
.musicimg{
  width: 3.5em;
  height: 3.5em;
  margin-left: 4%;
  position: relative;
}
.musicimg img{
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.muiscname{
  margin-left: 4%;
  width:20%;
  white-space: nowrap;
  overflow : hidden;
  text-overflow: ellipsis;
}
.muiscname p {
  margin:3px 0;
  font-size: 13px;
  color: rgb(0, 0, 0,.7);;
}
.muiscname h4{
  margin: 0;
   overflow : hidden;
  text-overflow: ellipsis;
}
.musicnameTwo{
  font-weight: 700;
  margin: 0 4% 0 10%;
  flex: 1;
  font-size: 15px;
  /* text-align: center; */
}
.duration{
  margin:auto;
  font-weight: 700;
  font-size: 14px;
}
</style>