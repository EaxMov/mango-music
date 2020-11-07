<template>
<div class="Container" >
<router-view></router-view>
<LyricBox />
</div>
</template>

<script>
import LyricBox from '@/components/common/lyricbox/LyricBox'
export default {
  name:'Container',
  components:{
    LyricBox
  }
}
</script>

<style scoped>

.Container{
    margin-top: 90px;
    min-height: calc(100vh - 300px);
    min-width: 1380px;
}
</style>