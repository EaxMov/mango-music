<template>
<transition name="fade">
<div class="Containerplay" v-show="bigplayshow">
  <div class="Container">
    <div class="leftcover">
      <div class="leftcove-inner">

        <div class="covepic"><img :src="$store.state.PlayingAblumConfig.picUrl+ '?param=205y205'"></div>

        <div class="info-panel  paneltop" v-if="$store.state.PlayingAblumConfig.name">
          <div class="panel-name">所属专辑</div>
          <div class="panel-content">{{$store.state.PlayingAblumConfig.name}}</div>
        </div>

        <div class="info-panel" v-if="$store.state.PlayingAblumConfig.company">
          <div class="panel-name">厂牌</div>
          <div class="panel-content" >{{$store.state.PlayingAblumConfig.company}}</div>
        </div>

        <div class="info-panel" v-if="$store.state.PlayingAblumConfig.subType">
          <div class="panel-name">类型</div>
          <div class="panel-content">{{$store.state.PlayingAblumConfig.subType}}</div>
        </div>

      </div>
    </div>
    <div class="rightcontainer">

      <div class="Cone">
        <div class="Cleft">
          <div class="titleinfo">
            <div class="titleinfo-name">{{$store.state.PlayingAblumConfig.name}}</div>
            <div class="titleinfo-singerinfo">
              <div class="singerinfo-img"><img :src="$store.state.Singerinfo.picUrl + '?param=30y30'" alt=""></div>
              <p>{{$store.state.Singerinfo.name}}</p>
            </div>
            <div class="type" ><span>#{{$store.state.PlayingAblumConfig.type}}</span></div>
            
            <div class="singerintroduce">
              <div class="singertitle">歌手介绍</div>
              <div class="singerintroducecontent" v-if="$store.state.Singerinfo.briefDesc">{{$store.state.Singerinfo.briefDesc}}</div>
              <div class="singerintroducecontent" v-else>暂无介绍</div>
            </div>

            <div class="similar">
              <div class="singertitle">相似歌曲</div>
              <div class="similarsongs">
                <div class="songsitem" v-for="(items,index) in similardata" @dblclick="DBselect(index)">
                  <div class="songsitemimg"><img :src="items.album.blurPicUrl + '?param=40y40' " alt=""></div>
                  <div class="songsitemname">{{items.name}}</div>
                  <div class="songsitemname">{{items.artists[0].name}}</div>
                  <div class="songsitemtime">{{items.duration | showDate}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>      

        <div class="Cringht">
          <div class="singertitle solid">歌词</div>
          
          <Scroll class="content" ref="scroll" v-if="$store.state.lrcData">
            <!-- currenTime > key && currenTime <下一次的key  -->
          <!-- <div id="lrcDiv" v-for="(item,key,index) in $store.state.lrcData" :class="{ lrccolor:currenTime > key && currenTime < $store.state.lcrArrs[index+1] }" v-html="ifnull(item)"></div> -->
          <div id="lrcDiv" v-for="(item,index) in $store.state.lrcData.lines" :class="{ lrccolor:index === currentLineNum}"><p ref="lyricline">{{item.txt}}</p></div>
          </Scroll>
          <div class="singertitle" v-else><p style="font-size:14px">暂无歌词，请您欣赏</p></div>
        </div>

      </div>

      <!-- <div class="hha">123</div> -->
    </div>  
  </div>
</div>
</transition>
</template>

<script>
import {formatDate} from '@/common/js/utils'
import Scroll from '@/components/common/scroll/Scroll'
export default {
  name:'Containerplay',
  components:{
    Scroll
  },
  data(){
    return {
      bigplayshow:false,
      currenTime:'', //存储aduio播放时的timeupdate事件
      allkeys:[], //拷贝歌词数组
      similardata:[], //相关音乐数据
      currentLineNum:0 //当前歌词高亮所在行
    }
  },
  created() {
    this.$bus.$on('similardata',(res) => {
      this.similardata = res
    })
    this.$bus.$on('bigplayshow',() => {
      console.log("我触发了大播放器的隐藏显示切换");
      this.bigplayshow = !this.bigplayshow
      if(this.bigplayshow){  //阻止滚动穿透
        document.body.style.overflow = 'hidden'
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
      else{
        document.body.style.overflow = ''
      }
    })
    // this.$bus.$on('timeupdate',(time) => {
    //   this.currenTime = time
    // })

    this.$bus.$on('LightNum',(line,txt) => {  //滚动歌词小于5不滚动
      this.currentLineNum = line
      if(line > 6) { 
        let lineEl = this.$refs.lyricline[line - 6]
        this.$refs.scroll.scrollToElement(lineEl,1000)
      }
      if(this.$refs.lyricline[line+1]){
        this.$bus.$emit('playing-lyric',txt,this.$refs.lyricline[line+1].innerHTML) //歌词单行显示
      }else{
        this.$bus.$emit('playing-lyric',txt,'') 
      }
    })

    this.$bus.$on('isloopStart', () => {  //循环播放结束，滚到顶部
      this.$refs.scroll.scrollTo(0,0,1000)
    })
  },  
  methods: {
    DBselect(index){
      this.$bus.$emit('BtPlayisShowEvent',this.similardata[index])
      this.$bus.$emit('currentIndex',index) //发送当前点击的index索引

      var temp = this.$store.state.ModelList
      if((temp &&temp[0].id === this.similardata[0].id) && temp.length === this.similardata.length) return
      this.$store.commit('UpdatePlayModelList',this.similardata) //记录当前播放的是哪个模块到仓库中  //Store
    },
    ifnull(value){
      return value === '' ? '<p>&nbsp;&nbsp;&nbsp;</p>' : `<p>${value}</p>`
    }
  },
  computed: {
    lrcchange(){
      return this.$store.state.lrcData
    }
  },
  watch: {
    lrcchange(){
      if(this.$store.state.lrcData){
        setTimeout(() => {
          this.$refs.scroll.refresh()
          this.$refs.scroll.scrollTo(0,0,20)
        }, 20);
      }
    }
  },
  filters:{
    showDate:value =>{
      return formatDate(new Date(value),'mm:ss')
    }
  },
  destroyed() {
    document.body.style.overflow = ''
    this.$bus.$off('similardata')
    this.$bus.$off('bigplayshow')
    this.$bus.$off('LightNum')
    this.$bus.$off('isloopStart')
    this.$bus.$off('playing-lyric')
  },
}
</script>

<style scoped>
.Containerplay{
  width: 100%;
  overflow: hidden;
  top: 70px;
  bottom: 70px;
  background-color:#ffffff;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;
}
.Container{
  width: 100%;
  max-width: 1380px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.leftcover{
  /* background-color: red; */
  width: 325px;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 60px 60px 30px 30px;

}
.rightcontainer{
  width: 84%;
  height: 100%;
  /* overflow-y: scroll; */
}
.Cone{
  display: flex;
  width: 100%;
  height: auto;
}
.Cleft{
  font-size: 20px;
  width: 60%;
  height: auto;
  /* background-color: yellow; */
}
.Cringht{
  width: 40%;
  height:calc(100vh - 80px - 80px);
  overflow: hidden;
  padding-left: 65px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.covepic{
  width: 205px;
  height: 205px;
  position: relative;
  border-radius: 7px;
}
.covepic img{
  width: 100%;
  border-radius: 7px;
}
.covepic::before{
  content: '';
  top: 7%;
  left: 7%;
  width: 196px;
  height: 196px;
  background-color: rgb(143, 142, 142,.3);
  position: absolute;
  border-radius: 7px;
  z-index: -1;
}
.info-panel{
  font-size: 14px;
  display: flex;
  margin-bottom: 15px;
}
.paneltop{
  margin-top: 30px;
}
.panel-name{
  min-width: 56px;
  margin-right: 15px;
  font-weight: 300;
  color: grey;
}
.panel-content{
  color: #165aa6;
  cursor: pointer;
}
.titleinfo{
  padding-top: 60px;
}
.titleinfo-name{
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.titleinfo-singerinfo{
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.titleinfo-singerinfo p{
  margin: 0 0 0 10px;
  font-size: 16;
  font-weight: 400;
}
.singerinfo-img{
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.singerinfo-img img{
  width: 100%;
  border-radius: 50%;
}
.type{
  color: white;
  font-size: 12px;
  margin-top: 15px;
  
}
.type span{
  background-color: rgb(143, 142, 142);
  display: inline-block;
  border-radius: 15px;
  padding: 4px 12px;
  font-size: 12px;
}
.singerintroduce{
  margin-right: 15px;
  margin-top: 30px;
  width: 98%;
  max-height: 235px;
  height: auto;
}
.singerintroducecontent{
  margin-top: 15px;
  padding: 10px 10px 10px 0;
  width: 100%;
  max-height: 200px;
  height: auto;
  overflow: hidden;
  overflow-y: scroll;
  font-size: 14px;
  line-height: 25px;
  text-indent: 2em;
}
.singertitle{
  height: 20px;
  font-size: 20px;
}
.solid{
  border-left: 3px solid #f0ca35;
}
.singerintroducecontent::-webkit-scrollbar {
  width: 7px;
  height: 1px;
}
/*滚动条滑块*/
.singerintroducecontent::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #c2c0c0;
}
.similar{
  margin-top: 30px;
  margin-right: 15px;
}
.similarsongs{
  margin-top: 15px;
  background-color: #f7f7f7;
  width: 100%;
  height: auto;
  padding: 15px 0;
}
.songsitem{
  height: 50px;
  padding: 5px  15px;
  display: flex;
  align-items: center;
  margin: 0 15px;
  cursor: pointer;
}
.songsitem:hover{
  background-color: #ffffff;
}
.songsitem:hover .songsitemimg::before{
  content: '';
  position: absolute;
  background-image: url("~@/assets/img/music-player.png");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50%;
  background-color: rgb(15, 1, 1,.6);
  width: 40px;
  height: 40px;
  top: 0;
  left: 0;
}
.songsitemimg{
  width: 40px;
  height: 40px;
  position: relative;
}
.songsitemimg img{
  width: 100%;
}
.songsitemname,.songsitemtime{
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  margin-left: 30px;
}
.songsitemname{
  flex: 1;
  max-width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.songsitemtime{
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  margin-left: 30px;
  flex: .5;
  text-align: center;
}
.content{
  height: 65vh;
  overflow: hidden;
  margin-top: 30px;
  cursor: grab;
}
.lrccolor{
  color: #f7a80a;
}
</style>