<template>
  <transition name="slide-fade">
    <div class="LyricBox" @mousedown="mousedown" ref="LyricBoxRef" v-show="isshow" @mouseover="LyricBoxMouseover" @mouseleave="LyricBoxMouseleave">
      <p id="p_1">{{playLyric}}</p>
      <p>{{nextTxt}}</p>
      <div class="tools">
        <div class="hiddlen iconfont icon-ico-hidden" @click="hiddlen" title="隐藏" v-show="showtools"></div>
        <div class="reset iconfont icon-refresh01" @click="resetbox" title="重置" v-show="showtools"></div>
        <div class="setColor iconfont icon-shezhi" @click="setColor" title="设置" v-show="showtools">
          <div class="colorBox shadow" v-show="showColorSet" @mouseover="isshow = true">
            <div class="red colorLayout" @click="itemSetColor('#fa3333')" title="淡雅红"></div>
            <div class="yellow colorLayout" @click="itemSetColor('#f8b327')" title="土豪金"></div>
            <div class="green colorLayout" @click="itemSetColor('#8dca60')" title="淡雅绿"></div>
            <div class="pink colorLayout" @click="itemSetColor('#ff5895')" title="可爱粉"></div>
            <div class="black colorLayout" @click="itemSetColor('#24242a')" title="炫酷黑"></div>
            <div class="blue colorLayout" @click="itemSetColor('#368ae9')" title="天际蓝"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LyricBox',
  data() {
    return {
      playLyric: '芒果音乐欢迎您~',
      nextTxt: '',
      isshow: false,
      showtools: false,
      showColorSet: false,
      InterTimeId: ''
    }
  },
  created() {
    this.$bus.$on('playing-lyric', (txt, nexttxt) => {
      this.playLyric = txt
      this.nextTxt = nexttxt
    })
    this.$bus.$on('isshowLyricBox', () => {
      this.isshow = !this.isshow
    })
  },
  methods: {
    mousedown(event) {  //鼠标拖拽功能
      const Dialog = this.$refs.LyricBoxRef
      var sx = event.clientX - Dialog.offsetLeft
      var sy = event.clientY - Dialog.offsetTop
      document.onmousemove = (event) => {
        var x = event.clientX;
        var y = event.clientY;
        event.cancelBubble = true;
        Dialog.style.left = x - sx + "px";
        Dialog.style.top = y - sy + "px";
      }
      document.onmouseup = (event) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    hiddlen() {
      this.isshow = false
    },
    LyricBoxMouseover() {
      clearTimeout(this.InterTimeId)
      const box = document.getElementsByClassName('LyricBox')[0]
      box.style.backgroundColor = 'rgb(0, 0, 0, 0.2)'
      box.style.border = '1px solid rgb(152, 152, 152)'
      this.showtools = true
    },
    resetbox() {
      const Dialog = this.$refs.LyricBoxRef
      Dialog.style.left = "";
      Dialog.style.top = "";
    },
    setColor() {
      this.showColorSet = !this.showColorSet
    },
    itemSetColor(color) {
      const p = document.getElementById('p_1')
      p.style.color = color
    },
    LyricBoxMouseleave() {
      this.InterTimeId = setTimeout(() => {
        this.showtools = false
        const box = document.getElementsByClassName('LyricBox')[0]
        box.style.backgroundColor = ''
        box.style.border = ''
      }, 1500);
    }
  },
  destroyed() {
    if(this.InterTimeId){
      clearInterval(this.InterTimeId)
    }
  },
}
</script>

<style scoped>
.LyricBox {
  width: 40%;
  height: 5rem;
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  transition-property: background-color, border;
  transition-delay: 0.3s;
  text-align: center;
  border: 1px solid rgb(152, 152, 152, 0);
  z-index: 9999;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.LyricBox p {
  font-size: 23px;
  color: #9a9aa1;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 1px 1px 1px rgba(88, 88, 88, 0.7);
}
.LyricBox p:first-child {
  color: #f8b327;
}
.hiddlen {
  margin-right: 5px;
}
.reset {
  margin-right: 5px;
}

.setColor {
  margin-right: 5px;
}
.tools {
  position: absolute;
  display: flex;
  top: 0;
}
.colorBox {
  position: absolute;
  width: 120px;
  height: 80px;
  top: -85px;
  left: 50%;
  transform: translateX(-28%);
  background-color: rgb(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
.colorLayout {
  width: 25px;
  height: 25px;
  margin: 0 3px;
  border-radius: 5px;
  cursor: pointer;
}
.red {
  background-color: #fa3333;
}
.yellow {
  background-color: #f8b327;
}
.green {
  background-color: #8dca60;
}
.blue {
  background-color: #368ae9;
}
.pink {
  background-color: #ff5895;
}
.black {
  background-color: #24242a;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>