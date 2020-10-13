<template>
<div class="Singer bystyle">
  <div class="selectBox">

    <ul class="areaBox">
      <li v-for="(item,index) in area" :class="{bgcolor:areacurrent.index === index}" @click="areaClick(index,item)">{{item.label}}</li>
    </ul>

    <ul class="typeBox">
      <li v-for="(item,index) in type" :class="{bgcolor:typecurrent.index === index}" @click="typeClick(index,item)">{{item.label}}</li>
    </ul>

    <ul class="letterbox">
      <li v-for="(item,index) in lettercode" :class="{bgcolor:lettercurrent.index === index}" @click="letterClick(index,item)">{{item.label}}</li>
    </ul>

  </div>
  <div class="SingerBox" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-throttle-delay="3000" infinite-scroll-immediate-check="false">
    <SingerList :recommendSinger="SingerList" />
  </div>

  <LoadMore v-show="!busy"/>
</div>
</template>

<script>
import LoadMore from '@/components/common/loadmore/LoadMore'
import SingerList from '@/components/common/com_singerlist/SingerList'
import {getArtistList} from '@/network/singer'
export default {
  name:'Singer',
  components:{
    SingerList,
    LoadMore
  },
  data() {
    return {
      offset:0, //偏移量
      busy:false, // 开启滚动底部加载
      SingerList:[], //歌手列表
      areacurrent:{index:0,value:-1},
      typecurrent:{index:0,value:-1},
      lettercurrent:{index:0,value:-1},
      area:[         //语种
        {label:'全部',value:-1},
        {label:'华语',value:7},
        {label:'欧美',value:96},
        {label:'日本',value:8},
        {label:'韩国',value:16},
        {label:'其他',value:0}
      ],
      type:[        //音乐类型
        {label:'全部',value:-1},
        {label:'男歌手',value:1},
        {label:'女歌手',value:2},
        {label:'乐队',value:3},
      ]
    }
  },
  created() {
    this.getArtistList()
  },
  methods: {
    getArtistList(limit,offset,type,area,initial){
      this.busy = false
      this.offset = 0
      getArtistList(limit,offset,type,area,initial).then(res => {
        this.SingerList = res.data.artists
      })
    },
    getArtistList2(limit,offset,type,area,initial){
      getArtistList(limit,offset,type,area,initial).then(res => {
        if(res.data.artists.length>0){
          this.SingerList =  this.SingerList.concat(res.data.artists) 
        }else{
          this.$message.warning('没有更多啦~')
        }
        this.busy = false
      })
    },
    areaClick(index,item){  //Languages事件
      this.GoNetwork(this.areacurrent,index,item)
    },
    typeClick(index,item){  //音乐类型事件
      this.GoNetwork(this.typecurrent,index,item)
    },
    letterClick(index,item){  //字母事件
      this.GoNetwork(this.lettercurrent,index,item)
    },
    GoNetwork(obj,index,el){
      if(obj.index === index || obj.value === el.value) return   //如果本次点击与上次点击相同，则返回
      obj.index = index
      obj.value = el.value
      this.getArtistList(40,0,this.typecurrent.value,this.areacurrent.value,this.lettercurrent.value)
    },
    loadMore(){
      console.log("到底啦");
      this.busy = true
      var offset = this.offset+=40
      this.getArtistList2(40,offset,this.typecurrent.value,this.areacurrent.value,this.lettercurrent.value)
    }
  },
  computed: {
    lettercode(){
      let arr = []
      for (let index = 0; index < 26; index++) {
        arr.push(
          {
            value:String.fromCharCode(97 + index),
            label:String.fromCharCode(65 + index)
          }
        )
      }
      arr.unshift({
        value:-1,
        label:'热门'
      })
      arr.push({
        value:0,
        label:'其他'
      })
      return arr
    }
  },
}
</script>

<style scoped>
.selectBox{
  margin-bottom: 30px;
}
.selectBox ul{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  margin: 20px 0;
}
.areaBox li,.typeBox li{
  width: 56px;
  height: 28px;
  line-height: 29px;
  font-size: 13px;
  text-align: center;
  border-radius: 14px;
  cursor: pointer;
  margin-right: 6px;
  transition: all 0.4s;
}
.typeBox li{
  width: auto;
  padding: 0 15px;
}
.letterbox li {
  transition: all 0.4s; 
  width: 28px;
  height: 28px;
  margin-right: 14px;
  text-align: center;
  line-height: 29px;
  border-radius: 50%;
  font-size: 13px;
  color: #333;
  cursor: pointer;
}
.letterbox li:first-child{
  width: 56px;
  border-radius: 14px;
}
.bgcolor{
  background-color:#f2aa0c;
  color: white !important;
  font-weight: 700;
}
.selectBox ul li:hover{
  color: rgb(195, 199, 199);
}
</style>