import {
  Updata_PlayModelList,
  Updata_PlayingMusicConfig,
  Updata_lrcData,
  Updata_Singerinfo,
  Updata_PlayingAblumConfig,
  Updata_lcrArrs,
  Updata_Playing,
  Updata_Model,
  Updata_UserId
} from "./mutation-types"


export default {
  [Updata_PlayModelList](state,config){
    state.PlayModelList = config
  },
  [Updata_PlayingMusicConfig](state,config){
    state.PlayingMusicConfig = config
  },
  [Updata_lrcData](state,config){
    state.lrcData = config
  },
  [Updata_Singerinfo](state,config){
    state.Singerinfo = config
  },
  [Updata_PlayingAblumConfig](state,config){
    state.PlayingAblumConfig = config
  },
  [Updata_lcrArrs](state,config){
    state.lcrArrs = config
  },
  [Updata_Playing](state,status){
    state.playing = status
  },
  [Updata_Model](state,modetype){
    state.model = modetype
  },
  [Updata_UserId](state,id){
    state.userId = id
  }
}