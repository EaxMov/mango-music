<template>
  <div class="bystyle">
    <!-- 轮播图 -->
    <Banners :banners="banners" />
    <!-- 推荐歌单 -->
    <RecommendMusicMeu />
    <!-- 推荐新歌 -->
    <RecommendNewMusic :recommendNewMusic="recommendNewMusic" />
    <!-- 推荐歌手 -->
    <RecommendSinger />
  </div>
</template>

<script>
import Banners from "@/components/common/swiper/Banners"
import RecommendMusicMeu from "./children/RecommendMusicMeu"
import RecommendNewMusic from "./children/RecommendNewMusic"
import RecommendSinger from "./children/RecommendSinger"
import { getBanner,getRecommendMusicList,getRecommendNewMusc,getRecommendSinger } from "@/network/recomand"
export default {
  name: "RecomendMusic",
  components: {
    Banners,
    RecommendMusicMeu,
    RecommendNewMusic,
    RecommendSinger
  },
  data() {
    return {
      banners: [],
      recommendMuiscLists:[], //推荐歌单
      recommendNewMusic:[],//推荐新歌
    }
  },
  created() {
    this.getBanner()
    this.getRecommendNewMusc()
    
  },
  methods: {
    getBanner() {
      getBanner().then((res) => {
        if(res.data.code !== 200){return this.$message.error('获取轮播图数据失败')}
        this.banners = res.data.banners
        if (this.banners.length === 10) {
          this.banners.pop()
        }
      })
    },
    getRecommendNewMusc() {
      getRecommendNewMusc().then(res => {
        if(res.data.code !== 200){return this.$message.error('获取推荐新歌数据失败')}
        this.recommendNewMusic = res.data.result
      })
    }
  },
}
</script>

<style scoped>
</style>
