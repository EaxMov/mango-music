<template>
  <transition name="fade">
    <div class="BottomPlay shadow" v-show="BtPlayisShow">
      <Cover :PlayingMusicConfig="$store.state.PlayingMusicConfig" />
      <Controls :PlayerMusicMP3="PlayerMusicMP3" ref="ControlsRef" />
      <Progress v-if="$store.state.PlayingMusicConfig.id" :Duration="$store.state.PlayingMusicConfig.dt" />
      <Volume v-if="$store.state.PlayingMusicConfig.id" />
      <RightFunMeu />
    </div>
  </transition>
</template>

<script>
import { getMusicDetail, getMusicMP3, getMusicLyric, getSingerInfo, getSimilarsongs, getAlbum } from '@/network/playing'

import { DealLrc } from '@/common/js/utils' //手动封装的歌词处理
import Lyric from '@/common/js/Lyric'

import Cover from './childrens/Cover'
import Controls from './childrens/Controls'
import Progress from './childrens/Progress'
import Volume from './childrens/Volume'
import RightFunMeu from './childrens/RightFunMeu'

import { notifyToast } from '@/components/common/totast/notify'
export default {
  name: 'BottomPlay',
  components: {
    Controls,
    Cover,
    Progress,
    Volume,
    RightFunMeu
  },
  data() {
    return {
      lrc: null, //歌词插件对象
      BtPlayisShow: false,
      PlayerMusicMP3: {}, //音乐具体URL -> .MP3
      allKeys: [], //歌词处理完后Push到这个数组里，方便歌词定位区间的使用
    }
  },
  created() {
    this.$bus.$on('BtPlayisShowEvent', (MusicConfig) => {
      if (MusicConfig.fee === 4) { return notifyToast(this, '这首歌是收费的QAQ', 'error', 70, "《" + MusicConfig.name + '》') }  //开始先检测是不是收费歌曲
      if (MusicConfig.fee === 1) { return notifyToast(this, '这首歌是VIP歌曲QAQ', 'error', 70, "《" + MusicConfig.name + '》') }  //开始先检测是不是VIP歌曲
      if (!this.BtPlayisShow) { this.BtPlayisShow = true } //如果底部播放器是显示状态，就不需要再显示出来了
      if (this.$store.state.PlayingMusicConfig.id == MusicConfig.id && this.$store.state.model === 1) { //如果点击播放的歌曲与上一首的id相同，则不再重复获取音乐MP3链接
        notifyToast(this, '播放歌曲重复啦~~~~', 'warning', 70) //提示框
        return
      }

      this.setHistoryList(MusicConfig)

      if (this.lrc) { //每次打开新歌曲如果存在上一个歌词滚动器就清空
        console.log("清空了");
        this.lrc.stop()
      }



      this.$refs.ControlsRef.ControlMiddle('start', 'newmusic') //告诉子组件，用户点击歌曲播放，改变播放按钮状态

      //底部播放器
      this.getMusicDetail(MusicConfig.id) //歌曲的详细信息
      this.getMusicMP3(MusicConfig.id) //获取歌曲MP3链接

      //大播放器

      if (MusicConfig.album) {
        this.getAlbum(MusicConfig.album.id)  //歌曲版权
        this.getSingerInfo(MusicConfig.artists[0].id) //获取歌手信息
      } else {
        this.getAlbum(MusicConfig.al.id)  //歌曲版权
        this.getSingerInfo(MusicConfig.ar[0].id) //获取歌手信息
      }


      this.getMusicLyric(MusicConfig.id)  //获取歌词并二次处理歌词

      this.getSimilarsongs(MusicConfig.id)  //获取相似歌曲 ->大播放器

    }),
      this.$bus.$on('progressDrap', currentTime => {  //进度条被点击或拖拽，调整歌词回弹位置
        this.lrc.seek(currentTime * 1000)
        this.lrc.togglePlay()  //拖拽都触发一次中断，如果是开始状态，就会被下面的判断再触发开始，如果是暂停状态就暂停歌词跳动！
        console.log("拖拽，播放状态：", this.$store.state.playing);
        if (this.$store.state.playing) {  //如果是开始状态，就接着继续歌词跳动
          console.log("播放状态才能触发的拖拽触发");
          this.lrc.togglePlay()
        }

      })
    this.$bus.$on('musicloopEnd', () => {
      this.lrc.seek(0)

    })
    this.$bus.$on('watchlrcplaying', bl => { //开始或者播放触发连接歌词方法，使歌词可以接的上
      console.log(this.$store.state.playing);
      if (this.lrc) {
        console.log("中断触发");
        this.lrc.togglePlay()
      }
    })
  },
  methods: {

    getMusicDetail(id) {
      getMusicDetail(id).then(res => {
        if (res.data.code !== 200) return this.$message.error('获取歌曲详细信息失败')
        this.$store.commit('UpdatePlayingMusicConfig', res.data.songs[0])  //把获取到的歌曲信息发到store
      })
    },
    getMusicMP3(id) {  //音乐的MP3播放链接
      getMusicMP3(id).then(res => {
        if (res.data.code !== 200) return this.$message.error('获取歌曲详细MP3链接失败')
        this.PlayerMusicMP3 = res.data.data[0]
      })
    },
    getMusicLyric(id) {   //歌词
      getMusicLyric(id).then(res => {
        if (res.data.code !== 200) return this.$message.error('获取歌曲歌词失败')
        // var lrc = DealLrc(res.data.lrc.lyric)  //歌词处理js -> 手动封装

        if (res.data.nolyric) { //判断有没有歌词
          console.log("无歌词");
          this.lrc = new Lyric('[00:00.000]暂无歌词，请您欣赏', this.lyricHandle)
          this.$bus.$emit('playing-lyric', '暂无歌词，请您欣赏', '')
        } else {
          this.lrc = new Lyric(res.data.lrc.lyric, this.lyricHandle)
        }
        if (this.$store.state.playing) {
          this.lrc.play()
          console.log("开始重新播放了");
        }
        this.$store.commit('UpdatelrcData', this.lrc)

        if (this.lrc.lines.length > 0 && !res.data.nolyric) { //当歌词回调还未执行时，先行引用默认歌词
          this.$bus.$emit('playing-lyric', this.lrc.lines[0].txt, this.lrc.lines[1].txt)
        } else {
          this.$bus.$emit('playing-lyric', '暂无歌词', '')
        }
        // this.getAllkeys(this.lrc)
      })
    },
    getSingerInfo(id) {   //获取歌手信息
      getSingerInfo(id).then(res => {
        if (res.data.code !== 200) return this.$message.error('获取歌手信息失败')
        this.$store.commit('UpdateSingerinfo', res.data.artist) //把歌手信息发到store仓库中

      })
    },
    getSimilarsongs(id) {
      getSimilarsongs(id).then(res => {
        if (res.data.code !== 200) return this.$message.error('获取相似歌曲失败')
        this.$bus.$emit('similardata', res.data.songs)
      })
    },
    getAlbum(id) {
      getAlbum(id).then(res => {
        if (res.data.code !== 200) return this.$message.error('获取歌曲专辑失败')
        this.$store.commit('UpdataPlayingAblumConfig', res.data.album)
      })
    },

    // getAllkeys(lrcArr){ //拷贝处理好的歌词放到数组
    //   this.allKeys = [] //清空
    //   for(var key in lrcArr){
    //     this.allKeys.push(key)
    //   }
    //   this.allKeys.push(9999)
    //   this.$store.commit('UpdatalcrArrs',this.allKeys)
    // },

    lyricHandle({ lineNum, txt }) { //歌词插件回调函数
      this.$bus.$emit('LightNum', lineNum, txt)  //滚动
    },
    setHistoryList(music) { //设置本地播放历史
    console.log(music);
      let musicObj = {}
      const album = {}
      musicObj.id = music.id
      musicObj.name = music.name
      album.album = {}
      album.album.id = music.album ? music.album.id : music.al.id
      album.album.picUrl = music.album ? music.album.picUrl : music.al.picUrl
      // album.album.picUrl = music.album ? music.album.picUrl : music.al.picUrl
      musicObj.artists = [{ id: music.artists && music.artists[0] ? music.artists[0].id : music.ar[0].id }]
      Object.assign(musicObj, album)

      musicObj = musicObj
      const localMusic = JSON.parse(window.localStorage.getItem('PlayHistory'))
      let tempArr = []
      if (!localMusic) {
        tempArr.unshift(musicObj)
      } else {
        tempArr = localMusic.filter(item => item.id !== musicObj.id)
        tempArr.unshift(musicObj)
        if(tempArr.length > 100){
          tempArr.shift()
        }
      }
      this.$store.commit('historyMusicList',tempArr)
      window.localStorage.setItem('PlayHistory', JSON.stringify(tempArr))

    }
  },
  watch: {
    BtPlayisShow() {
      if (this.BtPlayisShow) {
        this.$bus.$emit('BtPlayisShow', this.BtPlayisShow)  //如何播放器显示，则Container内容margin-bottom 60px
      }
    }
  }
}
</script>

<style scoped>
.BottomPlay {
  height: 70px;
  width: 100%;
  position: fixed;
  background-color: rgb(255, 255, 255);
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 30px;
  z-index: 9999;
}
.BigPlayContent audio {
  width: 100%;
  outline: none;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, 50px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
</style>