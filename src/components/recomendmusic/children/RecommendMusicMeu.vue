<template>
  <div class="RecommendMusicMeu">
   <titleCricular><h4>推荐歌单</h4></titleCricular>
  <MeuList  :recommendMuiscLists="recommendMuiscLists" />
  </div>
</template>

<script>
import {getRecommendMusicList} from "@/network/recomand"
import MeuList from '@/components/common/com_meulist/MeuList'
import titleCricular from '@/components/common/animations/title-circular'
export default {
  name: "RecommendMusicMeu",
  components:{
    titleCricular,
    MeuList
  },
  data(){
    return {
      recommendMuiscLists:[]
    }
  },
  created() {
    this.getRecommendMusicList()
  },
  methods: {
     getRecommendMusicList() {
      getRecommendMusicList().then((res) => {
        if(res.data.code !== 200){return this.$message.error('获取推荐歌单数据失败')}
          this.recommendMuiscLists = res.data.result
      })
    }
  }
}
</script>

<style scoped>
.RecommendMusicMeu {
  margin-top: 40px;
  z-index: 999;
}
</style>
