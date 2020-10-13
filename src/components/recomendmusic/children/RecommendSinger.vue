<template>
<div class="RecommendSinger" v-loading="!recommendSinger.length">
<titleCricular><h4>推荐歌手</h4></titleCricular>
  <SingerList :recommendSinger="recommendSinger" />
</div>  
</div>
</template>

<script>
import {getRecommendSinger } from "@/network/recomand"
import SingerList from '@/components/common/com_singerlist/SingerList'
import titleCricular from '@/components/common/animations/title-circular'
export default {
  name:'RecommendSinger',
  components:{
    titleCricular,
    SingerList
  },
  data() {
    return {
       recommendSinger:[],//推荐歌手
    }
  },
  created() {
    this.getRecommendSinger()
  },
  methods: {
    getRecommendSinger(){
      getRecommendSinger().then(res => {
        if(res.data.code !== 200){return this.$message.error('获取推荐歌手数据失败')}
        this.recommendSinger = res.data.artists
      })
    }
  },
}
</script>

<style scoped>
.RecommendSinger{
  margin-top: 30px;
}
</style>