<template>  
<div class="Volume">
  <div :class="[{volumeicon:!VolumeMuted},{volumeicon2:VolumeMuted}]" @click="onVolumeMuted" title="静音"></div>
  <div class="VolumeSlider" ref="VolumeSliderRef" @click="Vclick">
    <div class="VolumeBar">
      <div class="Volumecolor" ref="VolumecolorRef"></div>
      <div class="VolumeDot" @mousedown="Vmousedown"></div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name:'Volume',
  data(){
    return {
      VolumeMuted:false,
      VolumeBarLength:0,
      leaveTime:0,
      currentVolume:{w:'',v:0}
    }
  },
  mounted() {
    this.$nextTick(() => {
    this.VolumeBarLength = Number(this.$refs.VolumeSliderRef.offsetWidth) 
    this.currentVolume.w = this.$refs.VolumecolorRef.style.width = (this.VolumeBarLength / 2 ) + 'px'
    this.$bus.$emit('volume',0.5) //默认 50的音量
    this.currentVolume.v = 0.5
    })
  },
  methods: {
    onVolumeMuted(){
      this.VolumeMuted = !this.VolumeMuted
      if(this.VolumeMuted){
        this.$refs.VolumecolorRef.style.width = '0px'
      }else{
        this.$refs.VolumecolorRef.style.width = this.currentVolume.w
      }
      this.$bus.$emit('volumeMuted',this.VolumeMuted)
    },
    Vclick(e){
      this.leaveTime = e.clientX - this.$refs.VolumeSliderRef.offsetLeft 
      this.currentVolume.w = this.$refs.VolumecolorRef.style.width = this.leaveTime + 'px'
      var VolumetC =  this.currentVolume.v = Number((this.leaveTime / this.VolumeBarLength).toFixed(2))
      this.$bus.$emit('volume',VolumetC)
    },
    Vmousedown(){
      document.onmousemove = (e) => {
        this.leaveTime = e.clientX - this.$refs.VolumeSliderRef.offsetLeft
        this.currentVolume.w = this.$refs.VolumecolorRef.style.width = this.leaveTime  + 'px'
        if( e.clientX - this.$refs.VolumeSliderRef.offsetLeft < 0 ) {this.leaveTime  = 0 ; this.currentVolume.w = '0px'}
        if( this.leaveTime > this.VolumeBarLength ){this.currentVolume.w = this.$refs.VolumecolorRef.style.width = (this.leaveTime = this.VolumeBarLength) + 'px';}
        var VolumetC = this.currentVolume.v = Number((this.leaveTime / this.VolumeBarLength).toFixed(2))
        this.$bus.$emit('volume',VolumetC)
        document.onmouseup = () => {
          document.onmousedown = null
          document.onmousemove = null
          document.onmouseup = null          
        }
      }
    }
  },
}
</script>

<style scoped>
.Volume{
  width: 180px;
  margin:  0 20px;
  display: flex;
  align-items: center;
}
.volumeicon{
  background: url('~@/assets/img/controls/shengyin1.png') no-repeat;
}
.volumeicon2{

  background: url('~@/assets/img/controls/shengyin2.png') no-repeat;
}
.volumeicon,.volumeicon2{
  width: 26px;
  height: 26px;
  background-size: cover;
  cursor: pointer;
}
.VolumeSlider{
  width: 100%;
  height: 3px;
  position: relative;
  background-color: rgb(0, 0, 0,.1);
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;
  margin: 0 15px;
}
.VolumeBar{
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
}
.Volumecolor{
  height: 3px;
  background-color: rgb(233, 189, 18,.6);
}
.VolumeDot{
  position: relative;
  cursor: pointer;
  width: 13px;
  height: 13px;
  left: -6px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 3px 3px rgb(0, 1, 2,.03);
}
.VolumeDot::before{
  content: '';
  background-color: rgb(233, 189, 18,.6);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  pointer-events: none;
}
</style>