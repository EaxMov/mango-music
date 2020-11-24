const state =  {
  playing:false,//是否正在播放
  PlayingMusicConfig:{}, //单个歌曲的详细信息，用于底部播放器的显示还有大播放器的使用
  PlayingAblumConfig:{}, //单个歌曲的版权信息，用于底部播放器的显示还有大播放器的使用
  lrcData:null, //单个歌曲的歌词
  lcrArrs:null, //歌词拷贝
  Singerinfo:{}, //单个歌手的信息
  PlayModelList:'',//当前播放的是哪个模块
  model:1,//播放模式
  userId:'', //用户ID
  historyMusicList:[] //历史播放歌曲
}

export default state