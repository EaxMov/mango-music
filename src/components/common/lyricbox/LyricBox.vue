<template>
<transition name="slide-fade">
<div class="LyricBox" @mousedown="mousedown" ref="LyricBoxRef" v-show="isshow">
  <p>{{playLyric}}</p>
  <p>{{nextTxt}}</p>
  <div class="hiddlen" @click="hiddlen" title="隐藏"></div>
  <div class="reset" @click="resetbox" title="重置"></div>
</div>
</transition>
</template>

<script>
export default {
  name:'LyricBox',
  data(){
    return {
      playLyric:'芒果音乐欢迎您~',
      nextTxt:'',
      isshow:false
    }
  },
  created() {
    this.$bus.$on('playing-lyric',(txt,nexttxt) => {
      this.playLyric = txt
      this.nextTxt = nexttxt
    })
    this.$bus.$on('isshowLyricBox', () => {
      this.isshow = !this.isshow
    })
  },
  methods: {
    mousedown(event){  //鼠标拖拽功能
      const Dialog = this.$refs.LyricBoxRef
      var sx = event.clientX - Dialog.offsetLeft
      var sy = event.clientY - Dialog.offsetTop
      document.onmousemove = (event) => {
            var x = event.clientX;
            var y = event.clientY;
            event.cancelBubble = true;
            Dialog.style.left = x-sx + "px";     
            Dialog.style.top = y-sy  + "px";  
      }
      document.onmouseup = (event) => {
            document.onmousemove = null
            document.onmouseup = null
      }
    },
    hiddlen(){
      this.isshow = false
    },
    resetbox(){
      const Dialog = this.$refs.LyricBoxRef
      Dialog.style.left ="";     
      Dialog.style.top = ""; 
    }
  },
}
</script>

<style scoped>
.LyricBox{

  width: 40%;
  height: 5rem;
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  transition-property: background-color,border;
  transition-delay: 0.3s;
  cursor: pointer;
  text-align: center;
  border:1px solid rgb(152, 152, 152,0);
  z-index: 9999;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.LyricBox:hover{
background-color: rgb(0, 0, 0,.2);
border:1px solid  rgb(152, 152, 152);
}
.LyricBox:hover::before{
  right: 0;
  top: 0;
  font-family: 'iconfont';
  content: '\e65f';
  position: absolute;
  font-size: 14px;
  color: white;
  pointer-events: none;
}
.LyricBox:hover::after{
  right: 0px;
  top: 25px;
  content: '\e736';
  font-family: 'iconfont';
  position: absolute;
  transform: translateX(1px);
  font-size: 18px;
  color: white;
  pointer-events: none;
}
.LyricBox p{
  font-size: 23px;
  color: #9a9aa1;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow:1px 1px 1px rgba(88, 88, 88, 0.7);
}
.LyricBox p:first-child{
  color: #f8b327;
}
.hiddlen{
  width: 20px;
  height: 20px;
  position: absolute;
  top:0;
  right: 0;
}
.reset{
  width: 20px;
  height: 20px;  
  transform: translateX(2px);
  position: absolute;
  top:25px;
  right: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>