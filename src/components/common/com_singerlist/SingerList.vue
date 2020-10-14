<template>

<ul class="SingerList" v-if="recommendSinger && recommendSinger.length>0">
  <li v-for="(item,index) in recommendSinger" @click="selectsinger(item)" >
    <div class="cover"><img  alt="" v-lazy="item.img1v1Url + '?param=200y200' "></div>
    <div class="info">
      <p :title="item.name">{{item.name}}</p>
      <p v-if="showType==1">单曲：{{item.musicSize}}</p>
      <p v-if="showType==2" class="mvstyle">MV：{{item.mvSize}}</p>
    </div>
  </li>
</ul>
<Empty v-else />
</template>

<script>
import Empty from '@/components/common/emptybgtips/Empty'
export default {
  name:'RecommendSinger',
  components:{
    Empty
  },
  props:{
    recommendSinger:{
      type:Array,
      default:[]
    },
    showType:{
      type:Number,
      default:1
    }
  },
  methods: {
    selectsinger(item){
      if(this.$store.state.userId !== item.accountId){
        this.$store.commit('UpdatauserId',item.accountId)
      }else{
        this.$store.commit('UpdatauserId',false)
      }
      this.$router.push({
        path:'/mango-music/singer-detail',
        query:{
          id:item.id
        }
      })
    }
  },
}
</script>

<style scoped>
.SingerList{
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px 0;
  list-style: none;
  padding: 0;
  z-index: -22;
}
.SingerList li{
  padding: 0 15px 30px;
  flex: 0 0 10%;
  max-width: 10%;
  border-radius: 50%;
  cursor: pointer;
}
.cover img{
  width: 100%;
  border-radius: 50%;
  border: 1px solid #ebeaea;
  height: 100%;
  box-shadow: 1px 1px 1px  #ebeaea;
}
.info{
  margin-top: 15px;
  text-align: center;
}
.info p{
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info p:first-child{
  font-weight: 700;
  font-size: 14px;
}
.info p:last-child{
  color:#fa2800;
  font-size: 12px;
  margin-top: 12px;
  font-weight: 400;
}
.mvstyle{
  font-weight: 700 !important;
  color: #a79191 !important;
}
</style>