<template>
  <div class="videoDetail bystyle">
    <div class="left-box shadow" v-if="videoDetail && Object.keys(videoDetail).length > 0">
      <div class="video-box">
        <video :src="videoUrl" controlslist="nodownload" controls="controls" autoplay></video>
      </div>
      <div class="video-info">
        <h2 class="name">{{videoDetail.title}}</h2>
        <div class="tag">
          <a v-for="item in videoDetail.videoGroup">#{{item.name}}</a>
        </div>
        <p class="time">
          <span>发布：{{videoDetail.publishTime | formatDate}}</span>
          <span>播放次数：{{videoDetail.playTime | playCount}}</span>
        </p>
        <div class="follow">
          <div><i class="iconfont icon-Like"></i>{{videoDetail.praisedCount}}</div>
          <div><i class="iconfont icon-Star"></i> {{videoDetail.subscribeCount}}</div>
          <div><i class="iconfont icon-Share-"></i> {{videoDetail.shareCount}}</div>
        </div>
      </div>
      <div class="video-comment">
        <div class="title">
          <i class="iconfont icon-comment"></i>Comments |
          <span>
            <a>{{videoDetail.commentCount}}</a> 条评论
          </span>
        </div>
        <CommentBox v-show="showNomalCommentBox" />
        <CommentList title="热门评论" :commentList="hotCommentsList" :currentCommentId="currentCommentId" />
        <CommentList title="最新评论" :commentList="nalMalCommentsList" :currentCommentId="currentCommentId" />
      </div>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" hide-on-single-page layout="total, prev, pager, next,jumper" :total="commentTotal">
        </el-pagination>
      </div>
    </div>
    <div class="right-box">
      <div class="profile profileBox shadow">
        <div class="profile-head">
          <span>视频简介</span>
        </div>
        <div class="profile-content" v-if="videoDetail && Object.keys(videoDetail).length > 0">
          <div class="avatar">
            <div class="cover">
              <img :src="videoDetail.creator.avatarUrl + '?param=60y60'">
            </div>
            <p>{{videoDetail.creator.nickname}}</p>
          </div>
          <p v-if="videoDetail.description">{{ videoDetail.description }}</p>
          <p v-else>视频暂无简介</p>
        </div>
      </div>
      <div class="related profileBox shadow">
        <div class="profile-head">
          <span>相关推荐</span>
        </div>
        <ul>
          <li v-for="item in relateList">
            <div class="avatar" @click="handleRelated(item.vid)">
              <img v-lazy="item.coverUrl + '?param=320y180'" :title="item.title">
            </div>
            <div class="info">
              <h3>{{ item.title }}</h3>
              <h3>by：{{ item.creator[0].userName }}</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import { getVideoUrl, getVideoMp3Detail, getVideoComment, getVideoRelated } from "@/network/video";
import { playCount, formatDate } from "@/common/js/utils";
import CommentBox from '@/components/common/com_commentBox/CommentBox'
import CommentList from '@/components/common/com_commentList/CommenList'
export default {
  name: "videoDetail",
  components: {
    CommentBox,
    CommentList
  },
  data() {
    return {
      videoUrl: "",
      videoDetail: null,
      nalMalCommentsList: [],
      hotCommentsList: [],
      relateList: [],
      showNomalCommentBox: true,
      currentCommentId: '',
      currentPage: 0,
      offset: 0,
      commentTotal: 0
    };
  },
  created() {
    const id = this.$route.query.id
    this._getVideoUrl(id)
    this._getVideoMp3Detail(id)
    this._getVideoComment(id)
    this._getVideoRelated(id)

    this.$bus.$on('hideNomalComment', (bl, id) => { //切换全部评论盒子和个别评论id的显示
      if (this.currentCommentId === id) { return }
      this.showNomalCommentBox = bl  //如果传过来的事件为真，则代表不需要个别评论盒子，清空id，隐藏个别评论盒子
      this.currentCommentId = ''
      if (id) {
        this.currentCommentId = id
      }
    })
    this.$bus.$on('reloadCommend', () => {
      this._getVideoComment(id)
      this.currentCommentId = ''
    })
  },
  methods: {
    async _getVideoUrl(id) {
      await getVideoUrl(id).then((res) => {
        if (res.data.code !== 200) { return this.$message.error('获取音乐链接失败') }
        this.videoUrl = res.data.urls[0].url
      })
    },
    async _getVideoMp3Detail(id) {
      await getVideoMp3Detail(id).then(res => {
        if (res.data.code !== 200) { return this.$message.error('获取音乐详情失败') }
        this.videoDetail = res.data.data
        this.videoDetail.videoGroup = this.videoDetail.videoGroup.map(item => {
          if (item.name.indexOf('#') !== -1) {
            item.name = item.name.replace(/#/g, '')
          }
          return {
            name: item.name,
            id: item.id
          }
        })
      })
    },
    async _getVideoComment(id, offset) {
      await getVideoComment(id, offset).then(res => {
        if (res.data.code !== 200) { return this.$message.error('获取评论数据失败') }
        this.nalMalCommentsList = res.data.comments
        if (res.data.hotComments) {
          this.hotCommentsList = res.data.hotComments
        }
        this.commentTotal = res.data.total
      })
    },
    async _getVideoRelated(id) {
      await getVideoRelated(id).then(res => {
        if (res.data.code !== 200) { return this.$message.error('获取相关推荐数据失败') }
        this.relateList = res.data.data
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * 20
      this._getVideoComment(this.$route.query.id, this.offset)
    },
    handleRelated(id) {
      this.$router.push({
        path: '/mango-music/video-detail',
        query: {
          id
        }
      })
    }
  },
  computed: {
    idchange() { //监听id变化，重载刷新数据
      return this.$route.query.id
    }
  },
  watch: {
    idchange() {
      const id = this.$route.query.id
      this._getVideoUrl(id)
      this._getVideoMp3Detail(id)
      this._getVideoComment(id)
      this._getVideoRelated(id)
    }
  },
  filters: {
    playCount(count) {
      return playCount(count);
    },
    formatDate(value) {
      return formatDate(new Date(value), "yyyy-MM-dd");
    },
  },
};
</script>

<style lang="scss" scoped>
.videoDetail {
  display: flex;
  .left-box {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    .video-box {
      position: relative;
      padding-top: 56.25%;
      video {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        background-color: #000;
        outline: none;
      }
    }
    .video-info {
      margin-top: 8px;
      .name {
        padding: 0;
        margin: 0 0 10px 0;
        font-size: 16px;
      }
      .tag {
        margin-block: 8px;
        a {
          color: #fa2800;
          font-size: 12px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .time {
        margin: 0;
        padding: 0;
        span {
          margin-right: 30px;
          font-size: 12px;
          color: #999;
        }
      }
      .follow {
        display: flex;
        margin-top: 10px;
        div {
          width: auto;
          border-radius: 15px;
          padding: 5px 15px;
          background: #f2f2f2;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #161e27;
          cursor: pointer;
          font-size: 13px;
          i {
            font-size: 16px;
            color: #161e27;
            margin-right: 5px;
          }
        }
      }
    }
    .video-comment {
      margin-top: 25px;
      .title {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        border-radius: 3px;
        padding: 0 3px;
        border-bottom: 1px solid #f1f1f1;
        font-size: 14px;
        i {
          margin-right: 10px;
        }
        span {
          margin-left: 5px;
        }
      }
    }
    .pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      .el-pagination {
        .el-pager li.active {
          color: #f82800 !important;
        }
      }
    }
  }
  .right-box {
    width: 350px;
    flex-shrink: 0;
    .profile {
      .profile-content {
        .avatar {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          .cover {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin-right: 15px;
            cursor: pointer;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          p {
            padding: 0;
            margin: 0;
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
          }
        }
        p {
          flex: 1;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.4em;
          padding: 0;
          margin: 0;
        }
      }
    }
    .related {
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          position: relative;
          &:hover .avatar::before {
            font-family: "iconfont";
            content: "\e609";
            font-size: 50px;
            color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-60%, -50%);
          }
          .avatar {
            width: 100%;
            margin-right: 15px;
            flex-shrink: 0;
            position: relative;
            cursor: pointer;
            img {
              width: 100%;
            }
          }
          .info {
            h3 {
              padding: 0;
              margin: 7px 0 0 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 14px;
              &:last-child {
                margin-top: 5px;
                font-size: 12px;
                color: #a5a5c1;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
    .profileBox {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
      .profile-head {
        border-left: 3px solid #fa2800;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: 700;
        font-size: 14px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>