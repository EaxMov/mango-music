<template>
<div class="listItem" :style="width" @click="gosheet">
   <div class="coverGroup">
    <div class="cover">
      <div class="coverimg">
        <img v-if="item.picUrl" v-lazy="item.picUrl + '?param=205y205'" alt="" />
        <img v-else v-lazy="item.coverImgUrl + '?param=205y205'" alt="" />
        <div class="covercount">
          <div class="covercountinfo">
          <i class="iconfont icon-bofangsanjiaoxing"></i>
          <span>{{item.playCount | playcount}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="covername"><h5>{{item.name}}</h5></div>
  </div>
</div>
</template>

<script>
import {playCount} from '@/common/js/utils'
export default {
  name:'MeuItem',
  props:{
    item:Object,
    width:{
      type:String,
      default:'max-width:12.5%'
    }
  },
  methods: {
    gosheet(){
      this.$router.push({
        path:'/mango-music/songsheet',
        query:{
          id:this.item.id
        }
      })
    }
  },
  filters:{
    playcount(count){
      return playCount(count)
    }
  }
}
</script>

<style scoped>
  .listItem {
  padding: 0 15px 26px;
  cursor: pointer;
}
.cover{
  padding-right: 10px;
  position: relative;
  overflow: hidden;
}
.cover::before{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.3s;
  background-color: #d9d9d9;
  right: 6px;
  z-index: -1;
  transform: scale(.85);
  transform-origin: 100% 50%;
  border-radius: 4px;
}
.cover::after{
  transition: all 0.3s;
  content:'';
  width: 100%;
  height: 100%;
  position: absolute;
  background: #d9d9d9;
  top: 0;
  z-index: -2;
  right: 4px;
  border-radius: 4px;
  transform: scale(0.73);
  transform-origin: 100% 50%;
  opacity: .5;
}
.listItem:hover .cover::before,.listItem:hover .cover::after{
  background: rgba(231, 174, 19, 0.2);
}
.listItem:hover .cover::before{
  right: 4px;
}
.listItem:hover .cover::after{
  right: 0px;
}
.cover .coverimg{
  border-radius: 4px;
  position: relative;
}
.cover .covercount {
  position: absolute;
  top:0;
  color: #ffffff;
  background-color: rgb(0, 0, 0,.5);
  width: 100%;
  height: 1.5em;
  line-height: 1.5em;
  width: auto;
  right: 0;
  border-top-left-radius: none;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
.cover .covercountinfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  padding: 0 2px;
}
.cover .covercount i{
  display: block;
  margin-right: 3px;
  font-size: 14px;
  line-height: 1.8;
}
.listItem:hover .covercount{
  top:0;
  transition: 0.5s linear;
}
.listItem:hover .covercount::after{
  opacity: 0;
  transition: opacity 0.5s linear,top 0.1s linear;
}

.cover .coverimg img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.covername h5 {
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 20px;
  font-size: 14px;
  
}
.covername{
  margin-top: 15px;
}
</style>