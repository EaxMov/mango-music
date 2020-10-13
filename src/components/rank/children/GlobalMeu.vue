<template>
<div class="GlobalMeu">
  <h4 class="title">全球媒体榜</h4>
  <MeuList  :recommendMuiscLists="TopRankList"/>
</div>

</template>

<script>
import MeuList from '@/components/common/com_meulist/MeuList2'
export default {
  name:'GlobalMeu',
  components:{
    MeuList
  },
  props:{
    TopRankList:{
      type:Array,
      default:[]
    }
  }
}
</script>

<style scoped>
.GlobalMeu{
  margin-top: 30px;
}
.title{
  padding-left: 15px;
  border-left: 3.5px solid #fcd071;
}
</style>