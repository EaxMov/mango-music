<template>
<div class="Controls">
  <div class="ControlsPre" @click="ControlsConfig('pre')" title="上一首"></div>
  <div class="ControlsStart" v-if="musicIsStart === true" @click="ControlMiddle('start')" title="播放"></div>
  <div class="ControlsPause" v-else @click="ControlMiddle('pause')" title="暂停"></div>
  <div class="ControlsNext" @click="ControlsConfig('next')" title="下一首"></div>
  <audio :src="PlayerMusicMP3.url" ref="audio"  @ended="ended"  autoplay="autoplay" @play="isplay" @pause="ispause" @timeupdate="timeupdate" @canplay="getDuration"></audio>
</div>
</template>

<script>
import {notifyToast} from '@/components/common/totast/notify'
export default {
  name:'Controls',
  data(){
    return {
      musicIsStart:true,
      currentIndex:'' //记录当前的Index
    }
  },
  props:{
    PlayerMusicMP3:Object
  },
  created() {
    this.$bus.$on('currentIndex', index => {  //接收点击音乐的索引值
      this.currentIndex = index
    })
    this.$bus.$on('progressDrap',time => {
      this.$refs.audio.currentTime = time
    })
    this.$bus.$on('volumeMuted',res => {
      this.$refs.audio.muted = res
    }),
    this.$bus.$on('volume',res => {
      this.$refs.audio.volume = res
    })
  },
  methods: {
    ControlMiddle(ControlType,from){ //点击按钮播放和暂停
      if(ControlType == 'start'){
        this.$refs.audio.play()
        this.$store.commit('UpdataPlaying',true)
        if(!from){
          this.$bus.$emit('watchlrcplaying')
          console.log("开始触发的中继事件发射");
        }
      }else if('pause'){
        this.$refs.audio.pause()
        this.$store.commit('UpdataPlaying',false)
        console.log("暂停触发的中继事件发射");
        this.$bus.$emit('watchlrcplaying')
      }
    },
    ControlsConfig(type){ //切换逻辑
       
      if(type == 'next'){
        this.currentIndex++
        this.currentIndex %=  this.$store.state.PlayModelList.length
      }else{
        this.currentIndex--
        if(this.currentIndex < 0) {
          this.currentIndex = this.$store.state.PlayModelList.length -1
        }
      }
      this.$bus.$emit('BtPlayisShowEvent',this.$store.state.PlayModelList[this.currentIndex])
    },
    timeupdate(e){  //播放时不断获取当前进度事件发送给进度条组件
      this.$bus.$emit('timeupdate',e.target.currentTime)
    },
    getDuration(){  //当音乐加载完成时给进度条组件发送音乐总时长
      this.$bus.$emit('getDuration',this.$refs.audio.duration)
    },
    isplay(){
      this.musicIsStart = false
      
    },
    ispause(){
      this.musicIsStart = true
    },
    ended(){
      notifyToast(this,'即将开始下一首~','success') //提示框
      setTimeout(() => {
        this.modeGo()
      },3000)
    },
    modeGo(){
        var mode = this.$store.state.model
        if(mode === 1){
          console.log("顺序播放");
          this.ControlsConfig('next')
        }
        else if(mode === 2){
          console.log("单曲循环");
          this.$bus.$emit('musicloopEnd')
          this.$refs.audio.play()
          this.$bus.$emit('isloopStart')
        }else{
          console.log("随机播放");
          this.randomIndex()
          console.log(this.currentIndex);
        }
    },
    randomIndex(){
      var maxindex = parseInt(Math.random() * this.$store.state.PlayModelList.length-1) 
      if(maxindex !== this.currentIndex){
        this.currentIndex = maxindex
        this.$bus.$emit('BtPlayisShowEvent',this.$store.state.PlayModelList[this.currentIndex])
        return 
      }
      return this.randomIndex()
    }
  }
}
</script>

<style scoped>
.Controls{
  display: flex;
  align-items: center;
  margin-left: 40px;
}
.ControlsPre{
  background:url('~@/assets/img/controls/pre.png') no-repeat;
}
.ControlsStart{
  background:url('~@/assets/img/controls/start.png') no-repeat;
}
.ControlsPause{
  background:url('~@/assets/img/controls/pause.png') no-repeat; 
}
.ControlsNext{
  background:url('~@/assets/img/controls/next.png') no-repeat;
}
.ControlsPre,.ControlsNext{
  background-size: cover;
  width: 30px;
  height: 30px;
}
.ControlsStart,.ControlsPause{
  background-size: cover;
  width: 40px;
  height: 40px;  
}
.ControlsPre,.ControlsNext,.ControlsStart,.ControlsPause{
  margin: 0 10px;
  cursor: pointer;
}
.ControlsStart:hover,.ControlsPre:hover,.ControlsNext:hover,.ControlsPause:hover{
  background-color: rgb(0, 0, 0,0.02);
  border-radius: 50%;
}
</style>