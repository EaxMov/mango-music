<template>
  <div class="Progress">
    <a class="currentStartTime">{{currentStartTime | reFormatTime}}</a>
    <div class="progressSlider">
      <div class="progressRun" ref="progressRunRef" @click="Pclick">
        <div class="progressBar">
          <div class="progresscolor" ref="progresscolorRef"></div>
          <div class="progressDot " @mousedown="Pmousedown"></div>
        </div>
      </div>
    </div>
    <a class="durationTime">{{Duration |  showDate}}</a>
  </div>

</template>

<script>
import { formatDate, reFormatTime } from '@/common/js/utils'
export default {
  name: 'Progress',
  data() {
    return {
      currentStartTime: '00:00', //开始的时间累加
      currentTime: 0, //运动时间点
      duration: 0, //总时间
      progressBarLength: 0, //进度条总路程
      leaveTime: 0, //已走运动路程
      isDrop: true, //检测是否为拖拽状态
    }
  },
  props: {
    Duration: Number
  },
  created() {
    this.$bus.$on('getDuration', res => {//接收音乐总时长
      this.duration = parseInt(res)
    })
    this.$bus.$on('timeupdate', res => { //接收运动时间
      this.currentStartTime = res
      // this.progressBarLength = Number(parseInt(this.$refs.progressRunRef.offsetWidth)) - 7  //获取时间的同时每次都获取进度条长度，解决分辨率缩放BUG
      if (this.isDrop) {  //检测是否为拖拽状态
        this.currentTime = Number(res)
        this.leaveTime = Number(parseInt(this.progressBarLength * (this.currentTime / this.duration))) //已走运动路程
        this.$refs.progresscolorRef.style.width = this.leaveTime + 'px'
      }
    })
    window.addEventListener('resize', this.screenChange, false)
  },
  mounted() { //元素挂载完时获取进度条总长度
    this.$nextTick(() => { //下一次渲染完再获取宽度，不然会有偏差
      setTimeout(() => {
        this.progressBarLength = Number(parseInt(this.$refs.progressRunRef.offsetWidth)) - 7 /* 17是滚动条的宽度！！！坑 */
      }, 100);
    })
  },
  methods: {
    Pmousedown() { //拖拽鼠标按下
      this.isDrop = false //进度条按钮被按下时，取消进度条实时更新
      document.onmousemove = (e) => {
        this.ProgressConfig(e) //调用进度条计算配置
        document.onmouseup = () => {  //松开则取消移动效果
          this.currentTime = parseInt((this.leaveTime / this.progressBarLength) * this.duration)  //运动时间点
          console.log(this.currentTime);
          this.$bus.$emit('progressDrap', this.currentTime)
          document.onmousedown = null
          document.onmousemove = null
          document.onmouseup = null
          this.isDrop = true //进度条松开，开启进度条实时更新
        }
      }
    },
    Pclick(e) {
      this.ProgressConfig(e)
      this.currentTime = ((this.leaveTime / this.progressBarLength) * this.duration).toFixed(0)  //运动时间点 
      this.$bus.$emit('progressDrap', this.currentTime)
    },
    ProgressConfig(e) { //进度条计算配置
      this.leaveTime = e.clientX - this.$refs.progressRunRef.offsetLeft  //鼠标点击的X距离 - 进度条距离左边的距离 = 已走的距离
      if (e.clientX - this.$refs.progressRunRef.offsetLeft < 0) { this.leaveTime = 0 } //如果鼠标点击的X距离小于进度条距离左边的记录，则计算的是负值
      if (this.leaveTime > this.progressBarLength) { this.leaveTime = this.progressBarLength } //如果大于最大宽度。则直接返回
      this.$refs.progresscolorRef.style.width = this.leaveTime + 'px'
    },
    screenChange() {
      this.progressBarLength = Number(parseInt(this.$refs.progressRunRef.offsetWidth)) - 7
      this.leaveTime = Number(parseInt(this.progressBarLength * (this.currentTime / this.duration))) //已走运动路程
      this.$refs.progresscolorRef.style.width = this.leaveTime + 'px'
    }
  },
  filters: {
    showDate: value => {
      return formatDate(new Date(value), 'mm:ss')
    },
    reFormatTime: res => {
      return reFormatTime(res)
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.screenChange)
    this.$bus.$off('timeupdate')
    this.$bus.$off('getDuration')
  },

}
</script>

<style scoped>
.Progress {
  display: flex;
  align-items: center;
  width: 500px;
  margin: 0 50px;
  flex: 1;
  height: 60px;
}
.progressSlider {
  width: 100%;
  height: 100%;
  margin: 0 15px;
  display: flex;
  align-items: center;
}
.progressRun {
  width: 100%;
  height: 3px;
  position: relative;
  background-color: rgb(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;
}
.progressBar {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
}
.progresscolor {
  height: 3px;
  background-color: rgb(233, 189, 18, 0.6);
}
.progressDot {
  position: relative;
  cursor: pointer;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 3px 3px rgb(0, 1, 2, 0.03);
  left: -5px;
}
.progressDot::before {
  content: "";
  background-color: rgb(233, 189, 18, 0.6);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>