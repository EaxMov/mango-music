<template>
<div class="AlbumList">
  <ul class="albumbox" v-if="albumList && albumList.length>0">
    <li v-for="item in albumList" @click="selectablum(item)">
      <div class="top">
        <div class="cover">
          <div class="img">
            <img v-lazy="item.picUrl + '?param=200y200' " alt="">
          </div>
        </div>
        <div class="count">
          <i class="iconfont icon-bofangsanjiaoxing"></i>
          {{item | typefl}}
        </div>
      </div>
      <div class="info">
        <div class="musicname" :title="item.name">{{item.name}}</div>
        <div class="author">{{item.artists[0].name}}</div>
        <div class="createtime">{{item.publishTime | FormatDate}}</div>
      </div>
    </li>
  </ul>
  <Empty v-else/>
</div>

</template>

<script>
import Empty from '@/components/common/emptybgtips/Empty'
import {formatDate} from '@/common/js/utils'
export default {
  name:'AlbumList',
  components:{
    Empty
  },
  props:{
    albumList:{
      type:Array,
      default:[]
    }
  },
  methods: {
    selectablum(item){
      this.$router.push({
        path:'/mango-music/ablumsheet',
        query:{
          id:item.id
        }
      })
    }
  },
  filters:{
    typefl(item){
      return item.subType ? item.subType : item.type
    },
    FormatDate(value){
      return formatDate(new Date(value),'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.albumbox{
  list-style: none;
  margin: 0;
  padding: 0;
  flex-direction: row;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.albumbox li {
  padding: 0 15px 30px;
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
  cursor: pointer;
  margin: 0;
}
.top{
  position: relative;
  overflow: hidden;
  padding-right: 10px;
}
.cover{
  position: relative;
  padding-top: 100%;
  border-radius: 10px;
  background-color: #d9d9d9;
}
.top:before{
  content: "";
  transform: translateX(-3px);
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 50%;
  transition: transform .4s;
}
.albumbox li:hover .top::after{
  font-family: 'iconfont';
  content:'\e609';
  font-size: 50px;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-60%,-50%);
}
.albumbox li:hover :before{
  transform: translateX(0px);
}
.img{
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.img img{
  width: 100%;
  border-radius: 10px;
}
.count{
  position: absolute;
  right: 30px;
  top: 1px;
  height: 24px;
  padding-left: 9px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
  background-size: cover;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
}
.count i{
  font-size: 12px;
}
.count::after{
  content: "";
  position: absolute;
  right: -14px;
  top: 0;
  width: 14px;
  height: 24px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
  background-size: cover;
}
.info{
  margin-top: 15px;
}
.musicname{
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.author,.createtime{
  margin-top: 5px;
  font-size: 12px;
  color: #999;
}
</style>