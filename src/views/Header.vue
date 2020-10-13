<template>
<div class="header shadow">
  <div class="header-container">
    <div class="logo"><img src="~@/assets/img/logo.png" alt="" @click="$router.push('/mango-music/recomendmusic').catch(err => err);currentIndex=0"></div>
    <ul>
      <li v-for="(items,index) in category" @click=" Pushrouter(index)" >
        
        <a :class="[{liisactive:index === currentIndex},{fontcolor:index === currentIndex}]">{{items}}</a>
      </li>
    </ul>
    <Search />
  </div>
</div>
</template>

<script>
import Search from "@/components/common/search/Search";
export default {
  name:'Header',
  components:{
    Search
  },
  data(){
    return {
      category:['发现音乐','排行榜','歌单','歌手','视频','MV'],
      currentIndex:0
    }
  },
  methods: {
    Pushrouter(index){
      this.currentIndex = index
      switch(index){
        case 0 : this.$router.push('/mango-music/recomendmusic');break
        case 1 : this.$router.push('/mango-music/rank');break
        case 2 : this.$router.push('/mango-music/musiclist');break
        case 3 : this.$router.push('/mango-music/singer');break
        case 4 : this.$router.push('/mango-music/vedio');break
        case 5 : this.$router.push('/mango-music/mv');break
      }
    }
  },
  computed: {
    watchpath(){
      return this.$route.path
    }
  },
  watch: {
    watchpath(){
      let _path = this.watchpath
      if(_path.search('songsheet') !== -1 || _path.search('singer-detail') !== -1){
        this.currentIndex = ''
      }
    }
  },

}
</script>

<style scoped>
.header{
   height: 70px;
   width: 100%;
   background-color: #fff;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   z-index: 99;

}
.header-container{
   height: 70px;
   display: flex;
   align-items: center;
   transition: all .4s ease-in-out;
   max-width: 1380px;
   width: 100%;
   padding-right: 15px;
   padding-left: 15px;
   margin-right: auto;
   margin-left: auto;
}
.logo{
  width: 163px;
  cursor: pointer;
}
.logo img{
  background-size: cover;
  width: 100%;
}
ul{
  list-style-type: none;
  display: flex;
  font-size:14px;
  padding: 0;
  margin: 0;
  margin-left:  25px;
  flex: 1;
  align-items: center;
}
ul li a{
  position: relative;
}
ul li{
  height: 100%;
  padding: 0 15px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  font-size: 14px;
  justify-content: center;
}
.liisactive{
  width: 6px;
  height: 4px;
  position: relative;
}
.liisactive::after{
  position: absolute;
  content: '';
  left:0;
  right: 0;
  width: 6px;
  height: 4px;
  border-radius: 2px;
  background-color: #e7be13;
  animation: liisactive .1s linear;
  margin: 0 auto;
  bottom: -7px;
}
@keyframes liisactive {
  0%{
    transform: scaleX(0);
    height: 4px;
  }
  100%{
    transform: scaleX(6px);
    height: 4px;
  }
}
.fontcolor{
  color:  #f5a90b;
  transition: all .2s linear;
}
</style>