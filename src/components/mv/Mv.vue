<template>
  <div class="Mv bystyle">
    <div class="tagsBOX">
      <ul class="tags-items">
        <li v-for="item in areaList" :class="item === area ? 'active' : ''" @click="handleSelect('area',item)">{{item}}</li>
      </ul>
      <ul class="tags-items">
        <li v-for="item in classifyList" :class="item === classify ? 'active' : ''" @click="handleSelect('classify',item)">{{item}}</li>
      </ul>
      <ul class="tags-items">
        <li v-for="item in orderList" :class="item === order ? 'active' : ''" @click="handleSelect('order',item)">{{item}}</li>
      </ul>
    </div>
    <div class="mvBox" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-throttle-delay="3000" infinite-scroll-immediate-check="false">
      <MvList :mvlistArr="mvlistArr" :showPublishTime="false"/>
    </div>
    <LoadMore v-show="!busy"/>
  </div>

</template>

<script>
import { getAllMv } from "@/network/mv";
import  MvList from '@/components/common/com_mvlist/MvList'
import LoadMore from '@/components/common/loadmore/LoadMore'
export default {
  name: "Mv",
  components:{
    MvList,
    LoadMore
  },
  data() {
    return {
      busy:false, // 开启滚动底部加载
      area: "全部",
      areaList: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      classify: "全部",
      classifyList: ["全部", "官方版", "原生", "现场版", "网易出品"],
      order: "上升最快",
      orderList: ["上升最快", "最热", "最新"],
      offset: 0,
      mvlistArr:[]
    };
  },
  created() {
    this.getAllMv();
  },
  methods: {
    getAllMv() {
      getAllMv(this.area, this.classify, this.order, this.offset).then(res => {
          if(res.data.code!==200){return this.$message.error('获取MV数据失败')}
          if(res.data.data.length < 0) return this.$message.warning('没有更多啦~')
          this.mvlistArr = this.mvlistArr.concat(res.data.data.map(item => {
            return {
              imgurl16v9:item.cover,
              playCount:item.playCount,
              artistName:item.artists[0].name,
              duration:item.duration,
              name:item.name,
              id:item.id
            }
          }))
          this.busy = false
        }
      );
    },
    handleSelect(type, val) {
      this.busy = false
      this.offset = 0
      this.mvlistArr = []
      switch (type) {
        case "area":
          this.area = val;
          break;
        case "classify":
          this.classify = val;
          break;
        case "order":
          this.order = val;
          break;
      }
      this.getAllMv()
    },
    loadMore(){
      console.log("到底啦");
      this.busy = true
      this.offset+=12
      this.getAllMv()
    }
  },
};
</script>

<style lang="scss" scoped>
.Mv {
  .tagsBOX {
    .tags-items {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      margin: 10px 0 15px;
      li {
        width: auto;
        font-size: 13px;
        text-align: center;
        padding: 8px 15px;
        margin-right: 6px;
        cursor: pointer;
        border-radius: 14px;
      }
      .active {
        background-color: #f1a90c;
        color: white;
        font-weight: 700;
        transition: 0.3s linear;
      }
    }
  }
  .mvBox{
    margin:20px -15px 0;
  }
}
</style>