<template>
  <div class="personal">
    <div class="personal-wrap">
      <div class="bgPic"></div>
      <div class="personal-container bystyle" v-if="userInfo && Object.keys(userInfo).length > 0">
        <div class="left shadow">
          <div class="background" :style="`backgroundImage:url('${userInfo.profile.backgroundUrl}')`"></div>
          <div class="userInfo">
            <div class="avatar">
              <img :src="userInfo.profile.avatarUrl">
            </div>
            <div class="info">
              <p>{{userInfo.profile.nickname}}</p>
              <div>
                <button class="sign-btn" v-if="$route.query.id !== userId">签到</button>
              </div>
            </div>
          </div>
          <div class="profile">
            <div class="tag">
              等级：
              <i :class="`iconfont lv-icon icon-level-${userInfo.level}`"></i>
            </div>
            <div class="tag">
              音龄：
              <span>{{ userInfo.createDays}}天</span>
            </div>
            <div class="tag">
              年龄：
              <span>{{userInfo.profile.birthday | getAstro}}</span>
              <i :class="`iconfont gender ${userInfo.profile.gender === 1 ? 'icon-CRM_icon_nanxing' : ''}`"></i>
              <i :class="`iconfont gender ${userInfo.profile.gender === 2 ? 'icon-CRM_icon_nvxing' : ''}`"></i>
            </div>
            <div class="tag">
              地区：
              <span>{{ province }} - {{ city }}</span>
            </div>
          </div>
          <ul class="follow">
            <li>动态<span>{{ userInfo.profile.eventCount }}</span></li>
            <li>关注<span>{{ userInfo.profile.newFollows }}</span></li>
            <li>粉丝<span>{{ userInfo.profile.followeds }}</span></li>
          </ul>
        </div>
        <div class="middle shadow">
          <div class="middle-head title-head">
            <p>听歌排行<span> (累计听歌{{userInfo.listenSongs}})</span></p>
            <div class="tab">
              <span :class="{acitve:recordType === 1}" @click="handleChangeRecordType(1)">最近一周</span>
              <span class="line"></span>
              <span :class="{acitve:recordType === 0}" @click="handleChangeRecordType(0)">所有时间</span>
            </div>
          </div>
          <MusicList v-if="musicList.length > 0 " :songsList="musicList" :share="false" :collection="false" />
          <Empty v-else title='这个人有点害羞，不给我们看嗷(＾－＾)' />
        </div>
        <div class="right">
          <div class="meuBox ">
            <div class="meuBox-head title-head">
              <span>Ta创建的歌单</span>
            </div>
            <div class="meuBox-list">
              <MeuItem v-for="item in myList" :key="item.picUrl" :item="item" :width="'max-width:50%'" />
            </div>
          </div>
          <div class="meuBox ">
            <div class="meuBox-head title-head">
              <span>Ta收藏的歌单</span>
            </div>
            <div class="meuBox-list">
              <MeuItem v-for="item in collectList" :key="item.picUrl" :item="item" :width="'max-width:50%'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAstro } from '@/common/js/utils'
import axios from 'axios'
import { getuserDetail, getuserRecord, getuserPlaylist } from '@/network/personal'
import MusicList from '@/components/common/com_musiclist/MusicList'
import MeuItem from '@/components/common/com_meulist/child/MeuItem'
import Empty from '@/components/common/emptybgtips/Empty'
export default {
  name: 'Personal',
  components: {
    MusicList,
    MeuItem,
    Empty
  },
  data() {
    return {
      userInfo: null,
      province: '',
      city: '',
      recordType: 1,
      musicList: [],
      myList: [],
      collectList: []
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.city = ''
      this.province = ''
      this._getuserDetail(this.userId)
      this._getuserRecord(this.userId, this.recordType)
      this._getuserPlaylist(this.userId)
    }
  },
  created() {
    this._getuserDetail(this.userId)
    this._getuserRecord(this.userId, this.recordType)
    this._getuserPlaylist(this.userId)
  },
  computed: {
    userId() {
      const userInfo = JSON.parse(window.localStorage.getItem('info')).profile.userId
      return this.$route.query.id ? this.$route.query.id : userInfo
    },
  },
  methods: {
    _getuserDetail(uid) {
      getuserDetail(uid).then(res => {
        if (res.data.code !== 200) { return this.$message.error('获取用户信息失败') }
        this.userInfo = res.data
        if (this.userInfo.profile.province) {
          this._getArea(this.userInfo.profile.province, 1)
        }
        if (this.userInfo.profile.city) {
          this._getArea(this.userInfo.profile.city, 2)
        }
      })
    },
    _getArea(code, type) {
      axios.get('https://restapi.amap.com/v3/config/district', {
        params: {
          keywords: code,
          subdistrict: 0,
          key: '882f3d59bf54cda81ac9e210bee65859',
          extensions: 'base'
        }
      }).then(res => {
        if (res.data.districts[0]) {
          type === 1 ? this.province = res.data.districts[0].name : this.city = res.data.districts[0].name
        }
      })
    },
    _getuserRecord(uid, type) {
      getuserRecord(uid, type).then(res => {
        if (res.data.code !== 200) { return this.$message.error('获取历史播放列表失败') }
        this.recordType === 1 ? this.musicList = res.data.weekData : this.musicList = res.data.allData
        this.musicList = this.musicList.map(item => item.song)
      }).catch(err => {
        if (err && err.response) {
          this.$message.error(err.response.data.msg)
        }
      })
    },
    _getuserPlaylist(id) {
      getuserPlaylist(id).then(res => {
        if (res.data.code !== 200) { return this.$message.error('获取用户歌单失败') }
        this.myList = []
        this.collectList = []
        res.data.playlist.map(item => {
          if (Number(item.userId) === Number(this.userId)) {
            this.myList.push(item)
          } else {
            this.collectList.push(item)
          }
        })
      })
    },
    handleChangeRecordType(type) {
      this.recordType = type
      this._getuserRecord(this.userId, type)
    }
  },
  filters: {
    getAstro(time) {
      return getAstro(time)
    }
  }
}
</script>

<style lang="scss" scoped>
.personal {
  .personal-wrap {
    margin-top: -20px;
    .bgPic {
      position: relative;
      width: 100%;
      height: 350px;
      background: url("https://file.moetu.org/images/2020/11/25/personal_bg720fdeeb63132785.jpg");
      background-position: 100% 100%;
      background-size: cover;
      background-attachment: fixed;
      &::before {
        content: "";
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
        opacity: 0.2;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .personal-container {
      display: flex;
      align-items: flex-start;
      .left {
        width: 350px;
        position: relative;
        top: -60px;
        margin-right: 20px;
        border-radius: 5px;
        .background {
          width: 100%;
          height: 140px;
          position: relative;
          border-radius: 5px 5px 0 0;
          background-size: cover;
          &::before {
            background-image: linear-gradient(
              to left,
              #a6c0fe 0%,
              #f68084 100%
            );
            content: "";
            width: 100%;
            height: 100%;
            opacity: 0.3;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        .userInfo {
          margin-top: -20px;
          padding: 0 15px 0 30px;
          width: 100%;
          z-index: 2;
          position: relative;
          display: flex;
          .avatar {
            width: 64px;
            height: 64px;
            flex-shrink: 0;
            img {
              width: 100%;
              border-radius: 3px;
            }
          }
          .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding-top: 20px;
            margin-left: 15px;
            p {
              font-weight: 600;
              font-size: 16px;
              padding: 0;
              margin: 0;
            }
            .sign-btn {
              background: #fa2800;
              cursor: pointer;
              border: none;
              padding: 5px 15px;
              font-size: 12px;
              color: #fff;
              border-radius: 30px;
              outline: none;
            }
          }
        }
        .profile {
          padding: 0 40px;
          margin-top: 10px;
          .tag {
            position: relative;
            font-size: 13px;
            padding-left: 15px;
            display: flex;
            align-items: center;
            margin-bottom: 7px;
            &:first-child {
              margin-bottom: 3px;
            }
            .lv-icon {
              font-size: 22px;
              position: relative;
              top: 1px;
            }
            .gender {
              font-size: 14px;
              margin-left: 5px;
              font-weight: 700;
            }
            .icon-CRM_icon_nanxing {
              color: #1f91f2;
            }
            .icon-CRM_icon_nvxing {
              color: #f4606c;
            }
            &::before {
              content: "";
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #fa2800;
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
            }
          }
        }
        .follow {
          list-style: none;
          display: flex;
          margin-top: 15px 30px 0;
          padding: 15px 0 0;
          border-top: 1px solid #f9f9ff;
          li {
            width: 33%;
            text-align: center;
            font-size: 14px;
            color: #958ebb;
            span {
              display: block;
            }
          }
        }
      }
      .middle {
        width: 640px;
        background: #fff;
        position: relative;
        margin-top: 40px;
        margin-right: 20px;
        border-radius: 5px;
        padding: 15px;
        .middle-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            margin: 0;
            padding: 0;
            font-size: 14px;
            span {
              font-size: 12px;
              font-weight: 100;
              color: #666;
              margin-left: 5px;
            }
          }
          .tab {
            display: flex;
            .acitve {
              color: #fa2800;
              transition: 0.1s linear;
            }
            .line {
              width: 1px;
              height: 13px;
              background: #999;
              display: block;
              margin: 0 10px;
            }
            span {
              font-size: 12px;
              cursor: pointer;
              font-weight: 100;
              color: #666;
            }
          }
        }
      }
      .right {
        width: 350px;
        flex-shrink: 0;
        border-radius: 5px;
        position: relative;
        padding-bottom: 30px;
        margin-top: 40px;
        .meuBox {
          padding: 15px;
          width: 100%;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 5px 38px -1px rgba(3, 11, 19, 0.1);
          .meuBox-head {
            font-size: 14px;
            display: flex;
            align-items: center;
          }
          .meuBox-list {
            display: flex;
            flex-wrap: wrap;
          }
        }
      }
    }
  }
  .title-head {
    border-left: 3px solid #fa2800;
    height: 20px;
    padding-left: 1rem;
    margin-bottom: 15px;
    font-weight: 700;
  }
}
</style>