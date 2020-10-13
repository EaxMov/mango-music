<template>
<div class="RankTopDetail" >
  <h4 class="title">云音乐特色榜</h4>
  <div class="Top4List">
    <div class="Top4ListItem shadow" v-for="(item,index) in TopRankListTop4">
      <div class="Itemconten">
        <div class="cover"><div class="zhezhao"></div><img v-lazy="item.coverImgUrl + '?param=200y100' " alt=""><div class="updatetime">{{item.updateTime | formatdate}}更新</div></div>
        <div class="rankList" v-if="TopRankListTop4[index]" v-loading="loading[index]">
          <ul class="List">
            <li v-for="(item2,index2) in PlayListDetailTop4[index]" class="Listli" @dblclick="Dblclick(index,index2)">
              <div class="musicname">
                <a :class='{top3:index2<3}'>{{index2+1}}</a>
                {{item2.name}}
              </div>
              <div class="author">{{item2.ar[0].name}}</div>
            </li>
          </ul>
        </div>
        <div class="more" @click="more(index)">更多></div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import {getPlayListDetail} from '@/network/rank'
import {formatDate} from '@/common/js/utils'
export default {
  name:'RankTop4Detail',
  data(){
    return{
      PlayListDetailTop4:[],
      loading:[true,true,true,true],
      top4config:[19723756,3779629,2884035,3778678]
    }
  },
  props:{
    TopRankListTop4:{
      type:Array,
      default:[]
    }
  },
  created() {
    this.getPlayListDetail()
  },
  methods: {
     getPlayListDetail(){
        this.getDetail(19723756,0)
        this.getDetail(3779629,1)
        this.getDetail(2884035,2)
        this.getDetail(3778678,3)
    },
    getDetail(id,index){
        this.loading[index] = true
      getPlayListDetail(id).then(res => {
          var featureList = res.data.playlist.tracks.slice(0,8)
          this.PlayListDetailTop4.splice(index,0,featureList)
          this.loading[index] = false
      })
    },
    Dblclick(index,index2){
      this.$bus.$emit('BtPlayisShowEvent',this.PlayListDetailTop4[index][index2])
      this.$bus.$emit('currentIndex', index2)

      if(this.$store.state.PlayModelList.length === 0){
        this.$store.commit('UpdatePlayModelList',this.PlayListDetailTop4[index])
      }
      else if(this.$store.state.PlayModelList && (this.$store.state.PlayModelList[0].id !== this.PlayListDetailTop4[index][0].id)){
        this.$store.commit('UpdatePlayModelList',this.PlayListDetailTop4[index])
      }
    },
    more(index){
      var id = this.top4config[index]
      this.$router.push({
        path:'/mango-music/songsheet',
        query:{
          id
        }
      })
    }
  },
  computed: {
    lastid(){
      return this.$store.state.PlayModelList[0]['id']
    }
  },
  filters:{
    formatdate(value){
      let date = new Date(value);
      return formatDate(date,'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.title{
  padding-left: 15px;
  position: relative;
  border-left: 3.5px solid #fcd071;
}
.Top4List{
  display: flex;
  margin: 0px -30px;
  width: 100%;
}
.Top4ListItem{
  flex: 0 0 15%;
  max-width: 15%;
  margin: 0 30px;
  border-radius: 3px;
}

.cover{
  height: 100px;
  position: relative;
  overflow: hidden;
}
.zhezhao{
  width: 150%;
  background-color: rgb(255, 255, 255,.07);
  position: absolute;
  height: 300%;
  border-radius: 50%;
  left: -75%;
  top: -200%;
}
.cover img{
  width: 100%;
  height: 100%; 
  border-radius: 3px;
}
.updatetime{
  position: absolute;
  bottom: 0;
  right: 2%;
  font-size: 12px;
  color: rgb(255, 255, 255,.5);
}
.List{
  list-style: none;
  padding: 0;
  margin: 5px 0;
}
.Listli{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.musicname{
  flex: 0 0 70%;
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
}
.musicname a{
  padding: 0 5px;
  font-weight: 700;
}
.author{
  flex: 0 0 30%;
  max-width: 30%;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 5%;
}
.Listli:hover{
  background-color: #f5f5f7;
}
.more{
  text-align: right;
  font-size: 12px;
  padding: 2px 2px 5px;
  color: #d8d6d6;
  cursor: pointer;
}
.top3{
  color: #fcd071;
}
.rankList{
  min-height: 30px;
}
</style>