<template>
    <div class="SearchBox">
     <el-popover ref="popover" placement="bottom" title="热搜榜" width="200" trigger="hover" :close-delay="0" @show="ishow(true)" @hide="ishow(false)">
      <ul>
        <li v-for="item in hotSearchList">{{item.first}}</li>
      </ul>
     </el-popover>
      <input type="text" placeholder="Music to search" class="search-txt" v-popover:popover ref="inputRef">
      <a class="search-btn">
      <i class="iconfont icon-search"></i>
      </a>
    </div>
</template>

<script>
import {getSearchHot} from '@/network/search'
export default {
  name:'Search',
  data() {
    return {
      hotSearchList:[], //热搜列表
      hotSearchListDetail:[] //搜索榜详细列表
    }
  },
  created() {
    this.getSearchHot()
  },
  methods: {
    getSearchHot(){
      getSearchHot().then(res => {
        if(res.data.code!==200){return this.$message.error('获取热搜失败')}
        this.hotSearchList = res.data.result.hots
      })
    },
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
    }
  },
}
</script>

<style scoped>
.SearchBox{
  height: 40px;
  cursor: pointer;
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
  transition-delay: 1s;
  line-height: 40px;
  width: 0px;
}
.SearchBox:hover > .search-txt{
  border-bottom: 2px solid #161e27;
  width: 150px;
  padding: 0 6px;
}
.SearchBox i{
  font-size: 18px;
  color: #161e27;
}
</style>