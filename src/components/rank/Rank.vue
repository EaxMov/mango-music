<template>
<div class="Rank bystyle" v-loading="!TopRankListTop4.length && !TopRankList.length">
<RankTopDetail :TopRankListTop4="TopRankListTop4"  />
<GlobalMeu :TopRankList="TopRankList"/>
</div>
</template>

<script>
import RankTopDetail from './children/RankTop4Detail'
import GlobalMeu from './children/GlobalMeu'
import {getTopRankList} from '@/network/rank'
export default {
  name:'Rank',
  components:{
    RankTopDetail,
    GlobalMeu
  },
  data() {
    return {
      TopRankList:[],  //全部歌单
      TopRankListTop4:[], //前4歌单
    }
  },
  created() {
    this.getTopRankList()
  },
  methods: {
    getTopRankList(){
      getTopRankList().then(res => {
        this.TopRankList = res.data.list.slice(4,res.data.list.length)  
        this.TopRankListTop4 = res.data.list.slice(0,4)
        this.PlayListDetail = []
      })
    }
  }
  
}
</script>

<style scoped>

</style>