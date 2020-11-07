<template>
    <div class="list" v-loading="!recommendMuiscLists.length">
      <MeuItem v-for="item in recommendMuiscLists" :key="item.picUrl" :item="item" :width="'max-width:12.5%'" />
    </div>
</template>

<script>
import MeuItem from './child/MeuItem'
import {playCount} from '@/common/js/utils'
export default {
  name: "RecommendMusicMeu",
  components:{
    MeuItem
  },
  data(){
    return {
      loadingShow:true
    }
  },
  methods: {
  },
  props: {
    recommendMuiscLists: {
      type: Array,
      dafault() {
        return []
      },
    },
  }
}
</script>

<style scoped>
h4{
  margin: 0;
}
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

</style>
