<template>
  <div class="RightFunMeu">
    <i class="iconfont2 icon" :title="playMode.title" @click="changePlayMode(playMode.title)">{{playMode.icon}}</i>
    <i class="iconfont2 icon" title="歌词" @click="isshowLyricBox"></i>
    <i class="iconfont2 icon" title="播放列表" @click="showHistoryBox = !showHistoryBox"></i>
    <i class="iconfont2 icon" :title="Esc.title" @click="changeEsc(Esc.title)" style="font-size:25px">{{Esc.icon}}</i>
    <transition name="fade">
      <HistoryMusicBox v-show="showHistoryBox" />
    </transition>
  </div>
</template>

<script>
import { notifyToast } from '@/components/common/totast/notify'
import HistoryMusicBox from '@/components/common/historymusiclist/HistoryMusicBox'
export default {
  name: 'RightFunMeu',
  components:{
    HistoryMusicBox
  },
  data() {
    return {
      playMode: { title: "顺序", icon: '' },
      Esc: { title: '沉浸模式', icon: '' },
      showHistoryBox:false
    }
  },
  methods: {
    changePlayMode(type) {
      switch (type) {
        case '顺序':
          this.typeconfig('单曲循环', '', 2, '切换为循环模式', 'success')
          break
        case '单曲循环':
          this.typeconfig('随机', '', 3, '切换为随机模式', 'success')
          break
        case '随机':
          this.typeconfig('顺序', '', 1, '切换为顺序模式', 'success')
          break
      }
    },
    typeconfig(type, icon, numtype, msg, smgtype) {
      this.playMode.title = type;
      this.playMode.icon = icon;
      this.$store.commit('UpdataModel', numtype);
      notifyToast(this, msg, smgtype, 70);
    },
    changeEsc(type) { //沉浸模式开启
      if (type == '沉浸模式') {
        this.Esc.title = '退出沉浸模式'
        this.Esc.icon = ''
      } else {
        this.Esc.title = '沉浸模式'
        this.Esc.icon = ''
      }
      this.$bus.$emit('bigplayshow')
    },
    isshowLyricBox() {
      this.$bus.$emit('isshowLyricBox')
    }
  },
}
</script>

<style lang="scss" scoped>
.RightFunMeu {
  .icon {
    margin-left: 15px;
    cursor: pointer;
  }
}
.fade-enter,.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-enter-active,.fade-leave-active {
  transition: all 0.5s;
}
</style>