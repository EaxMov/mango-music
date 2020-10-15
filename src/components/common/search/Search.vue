<template>
    <div class="SearchBox">
     <el-popover ref="popover" placement="bottom"  width="350" trigger="hover" :close-delay="500" @show="ishow(true)" @hide="ishow(false)">
      <div class="SearchHistory">
        <h4 class="toptile" :class="{toptileselect:changemeu}" @click="changemeu = true"><i class="iconfont icon-re"></i>热搜榜</h4>
        <h4 class="toptile" :class="{toptileselect:!changemeu}" @click="changemeu = false"><i class="iconfont icon-zuji"></i>历史搜索</h4>
      </div>
      <ul class="SearchList" v-show="changemeu">
        <li v-for="(item,index) in hotSearchListDetail" @click="selectKeyWord(item.searchWord)">
          <div class="top" :class="{topthree:index<3}">{{index+1}}</div>
          <div class="content">
            <div class="titleAndInfo">
              <span class="musicname">{{item.searchWord}}</span>
              <span class="score">{{item.score}}</span>
              <span :class="[{'icon-hot topthree':item.iconType===1},{'icon-top ascending':item.iconType===5},{'icon-new newcolor':item.iconType===2},'iconfont']"></span>
            </div>
            <div class="dsec">{{item.content}}</div>
          </div>
        </li>
      </ul>
      <div v-show="!changemeu" >
         <div class="historytagsbox">
           <div class="historyitem" v-for="(item,index) in historytags" @click="selectTags(item)">{{item}}<i class="iconfont icon-close" @click="clearAll(2,index)"></i></div>
         </div>
         <h4 class="clear" @click="clearAll(1)" v-show="historytags.length>0">清空</h4>
      </div>
     </el-popover>
      <input type="text" placeholder="Music to search" v-model="inputcontent" class="search-txt" v-popover:popover ref="inputRef" @keydown="enterSearch">
      <a class="search-btn">
      <i class="iconfont icon-search"></i>
      </a>
    </div>
</template>

<script>
import {getSearchHotDetail} from '@/network/search'
export default {
  name:'Search',
  data() {
    return {
      hotSearchList:[], //热搜列表
      hotSearchListDetail:[], //搜索榜详细列表
      changemeu:true,
      inputcontent:'',
      historytags:[]  //历史搜索标签
    }
  },
  created() {
    this.getSearchHotDetail()
    var history = window.localStorage.getItem('SearchHistory')
    if(history){
      this.historytags = history.split(',')
    }
  },
  methods: {
    getSearchHotDetail(){
      getSearchHotDetail().then(res => {
        if(res.data.code!==200){return this.$message.error('获取热搜详细列表失败')}
        this.hotSearchListDetail = res.data.data
      })
    },
    ishow(bl){
      if(bl){
        this.$refs.inputRef.style.width = '150px'
      }else{
        this.$refs.inputRef.style.width = ''
      }
    },
    selectKeyWord(keyword){   //搜索跳转时间
      this.savehistoy(keyword)
      this.jumprouter(keyword) //跳转路由
    },
    enterSearch(e){ //回车搜索
      if (e.keyCode == 13) {
        this.savehistoy(this.inputcontent) //保存历史
        this.jumprouter(this.inputcontent) //跳转路由
      }
    },
    savehistoy(keyword){ //保存历史记录
      var history = window.localStorage.getItem('SearchHistory')
      if(history === null){
        history = []
      }else{
        history = history.split(",")
      }
      history.unshift(keyword)
      history = Array.from(new Set(history))
      if(history.length>15){
        history.pop()
      }
      window.localStorage.setItem('SearchHistory',history)
      this.historytags =  window.localStorage.getItem('SearchHistory').split(',')
    },
    selectTags(keyword){ //点击单个标签事件搜索
      this.jumprouter(keyword)
    },
    clearAll(del,index){ //删除事件
      if(del === 1){
        this.historytags = []
        window.localStorage.clear()
      }else{
        this.historytags.splice(index,1)
        window.localStorage.setItem('SearchHistory',this.historytags)
      }
    },
    jumprouter(keyword){ //跳转路由
      this.$router.push({
          name:'Search',
          query:{
            keyword
          }
      })
    }
  },
}
</script>

<style scoped>
.SearchBox{
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-btn{
  color: black;
  float: right;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-txt{
  border: none;
  border-bottom: 2px solid #161e27;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: black;
  font-size: 14px;
  transition: 0.4s;
  transition-delay: .3s;
  height: 30px;
  width: 0px;
}
.SearchBox:hover > .search-txt{
  border-bottom: 2px solid #161e27;
  width: 150px;
}
.SearchBox i{
  font-size: 18px;
  color: #161e27;
}
.SearchList{
  max-height: 400px;
  margin:0;
  padding: 0;
  list-style-type: none;
  overflow: hidden;
  overflow-y: scroll;
}
.SearchList li{
  display: flex;
  padding: 10px 0;
  cursor: pointer;
}
.SearchList li:hover{
  background-color: rgb(153, 153, 153,.1);
  border-radius: 5px 0px 0 5px;
  transition: all .3s linear;
}
.SearchList li .top{
  flex: 0 0 15%;
  max-width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight:  700;
  color: #999999;
}
.topthree{
  color: #ff3a3a !important;
}
.SearchList li .content{
  flex: 0 0 85%;
  max-width: 85%;
}
.titleAndInfo{
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}
.musicname{
  font-weight: 700;
}
.titleAndInfo span{
  margin-right: 15px;
}
.titleAndInfo span:nth-child(2),.dsec{
  color: #999999;
  font-size: 12px;
}
.SearchList::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.SearchList::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: hsl(240, 2%, 88%);
}
.SearchList::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 0;
}
.newcolor{
  color: #2aba2a;
  font-size: 25px;
  line-height: 0px;
}
.ascending{
  color: #999999;
  font-size: 25px;
}
.toptile{
  padding: 5px 10px;
  margin: 10px 0;
  font-weight: normal;
  border-radius: 2px;
  cursor: pointer;
}
.toptile:hover{
  background-color: rgb(153, 153, 153,.1);
  transition: all .3s linear;
}
.toptile i{
  font-size: 14px;
  margin-right: 5px;
}
.SearchHistory{
  display: flex;
}
.toptileselect{
  color: red;
}
.historytagsbox{
  max-height: 400px;
  margin:0;
  padding: 0;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
}
.historyitem{
  padding: 3px 5px;
  margin: 5px;
  border-radius: 5px;
  background-color:#f4f4f5;
  cursor: pointer;
}
.historyitem i{
  margin-left: 5px;
  color: #c1c1c4;
}
.historyitem:hover{
  background-color: #dbdbdd;
  transition: all .3s linear;
}
.historyitem:hover i{
  color: #727274;
  transition: all .3s linear;
}
.clear{
  text-align: right;
  font-weight: normal;
  cursor: pointer;
  color: #c1c1c4;
}
</style>