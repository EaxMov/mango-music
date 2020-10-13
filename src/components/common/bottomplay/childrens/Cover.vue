<template>
<div class="cover" v-if="PlayingMusicConfig.name">
      <div class="coverimg">
        <img :src="PlayingMusicConfig.al.picUrl + '?param=80y80' ">
      </div>
      <div class="covername">
        <h5>{{PlayingMusicConfig.name}}</h5>
        <p v-if="PlayingMusicConfig.ar">{{PlayingMusicConfig.ar[0].name}}</p>
      </div>
</div>

</template>

<script>
export default {
  name:'Cover',
  data(){
    return {
    }
  },
  props:{
    PlayingMusicConfig:{}
  }
}
</script>

<style scoped>
.cover{
  display: flex;
  align-items: center;
}
.cover .coverimg{
  width: 50px;
  height: 50px;
}
.cover .coverimg img{
  width: 100%;
  border-radius: 50%;
}
.covername{
  width: 100px;
  height: 60px;
  margin:  0 20px;
  position: relative;
}
.covername::before{
  top: 50%;
  transform: translateY(-50%);
  right: -20px;
  position: absolute;
  content: '';
  width: 1px;
  height: 20px;
  background-color: #e5e5e5;
}
.covername p ,.covername h5{
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin:7px 0;
}
.covername p{
  font-size: 12px;
  color: rgb(0, 0, 0,.5);
}
</style>