<template>
<div class="Video bystyle">
  <div class="topBox shadow">
    <div class="categoryBox">
      <span>全部</span>
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="CatHotBox">
      <p>分类：</p>
      <ul class="HotList">
        <li v-for="item in videoCategory">{{item.name}}</li>
      </ul>
    </div>
    <div class="seachtype">
      <div class="typeall" :class="{type_select:isgetall===1}" @click="clickall(1)">推荐</div>
      <div class="typeall" :class="{type_select:isgetall===2}" @click="clickall(2)">全部</div>
    </div>
  </div>
  
</div>

</template>

<script>
import {getVideoCategory,getVideoCategoryAll,getVideoRecommend,getVideoAll,getVideoDetail} from '@/network/video'
export default {
  name:'Video',
  data() {
    return {
      videoCategory:[], //分类列表
      isgetall:1
    }
  },
  created() {
    this.getVideoCategory()
  },
  methods: {
    getVideoCategory(){
      getVideoCategory().then(res => {
        if(res.data.code !== 200) return this.$message.error('获取分类列表失败')
        this.videoCategory = res.data.data
      })
    },
    clickall(type){
      this.isgetall = type
    }
  },
}
</script>

<style scoped>
.categoryBox{
  line-height: 40px;
  border-radius: 4px;
  width: 5rem;
  background: #f2aa0c;
  color: white;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.categoryBox span{
  margin: 0 8px;
}
</style>