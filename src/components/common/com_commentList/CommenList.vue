<template>
  <div class="commen-list">
    <h3>{{title}}</h3>
    <ul>
      <li class="item" v-for="item in commentList" :key="item.commentId">
        <div class="avatar">
          <img :src="item.user.avatarUrl + '?param=60y60'" :title="item.user.nickname">
        </div>
        <div class="info">
          <h2>
            <span>
              {{item.user.nickname}}
              <a>{{item.time | getAgoAt}}</a>
            </span>
            <div class="active">
              <i class="iconfont icon-zan" :style="currentCommentId === item.commentId && isLike || item.liked ? 'color:#fa2800;' : ''" @click="_likeComment(item)"></i>
              <span>({{item.likedCount}})</span>
              <i class="iconfont icon-xiaoxi" @click="handleSendComment(item.commentId)"></i>
            </div>
          </h2>
          <div class="content">
            {{item.content}}
            <div class="beReplied" v-for="reItem in item.beReplied">
              <a>@{{reItem.user.nickname}}</a>：{{reItem.content }}
            </div>
          </div>
          <CommentBox v-if="currentCommentId === item.commentId" :commentType="2" placeholder="评论啥好呢~~" :currentCommentId="currentCommentId" />
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import { getAgoAt } from '@/common/js/utils'
import { likeComment } from '@/network/comment'
import CommentBox from '@/components/common/com_commentBox/CommentBox'
export default {
  name: 'commenList',
  components: {
    CommentBox
  },
  data() {
    return {
      isLike: false
    }
  },
  props: {
    title: {
      type: String
    },
    commentList: {
      type: Array,
      default: () => []
    },
    currentCommentId: {
      type: [String, Number]
    }
  },
  methods: {
    handleSendComment(commendId) {
      const userInfo = JSON.parse(window.localStorage.getItem('info'))
      if (userInfo === null) {
        this.$message.error('没登陆你评论啥？？？')
      }
      this.$bus.$emit('hideNomalComment', false, commendId)
    },
    _likeComment(item) {
      const userInfo = JSON.parse(window.localStorage.getItem('info'))
      const t = item.liked !== true ? 1 : 0
      const pageType = this.$route.path.indexOf('mv-detail') !== -1 ? 1 : 5
      if (!userInfo) return this.$message.error('没登陆点什么👍')
      likeComment(this.$route.query.id, item.commentId, t, pageType).then(res => {
        if (res.data.code === 200 && t === 1) {
          this.isLike = true
          this.$message.success('点赞成功')
        } else {
          this.$message.error('取消点赞')
        }
        this.$emit('reloadZan')
      })
    }
  },
  filters: {
    getAgoAt(time) {
      return getAgoAt(time)
    }
  }
}
</script>

<style lang="scss" scoped>
.commen-list {
  margin-top: 20px;
  h3 {
    margin: 0 0 15px 0;
    font-size: 16px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    .item {
      padding: 10px 0;
      width: 100%;
      display: flex;
      .avatar {
        flex-shrink: 0;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 12px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .info {
        flex: 1;
        h2 {
          margin: 0 5px 10px 0;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          a {
            margin-left: 5px;
            font-size: 12px;
            color: #a5a5c1;
            font-weight: 200;
          }
          .active {
            font-weight: normal;
            display: flex;
            align-items: center;
            i {
              margin-left: 20px;
              cursor: pointer;
            }
            span {
              font-size: 12px;
              margin-top: 2px;
              color: #666;
              position: relative;
              &::before {
                content: "";
                width: 1px;
                height: 13px;
                background: #4a4a4a;
                opacity: 0.7;
                position: absolute;
                right: -12px;
              }
            }
          }
        }
        .content {
          width: 100%;
          font-size: 12px;
          color: #4a4a4a;
          line-height: 1.6;
          padding: 8px 10px;
          background: #f5f5f5;
          margin-top: 5px;
          border-radius: 3px;
          .beReplied {
            margin-top: 10px;
            background: #fff;
            padding: 8px 10px;
            border-radius: 3px;
            color: #666;
            a {
              color: #fa2800;
            }
          }
        }
      }
    }
  }
}
</style>