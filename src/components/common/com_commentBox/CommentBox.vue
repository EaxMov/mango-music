<template>
  <div class="comment-box" v-if="userInfo && Object.keys(userInfo).length > 0">
    <p v-if="commentType === 1"><span><i class="iconfont icon-renbudaiwaiquan"></i>{{userInfo.profile.nickname}}，你好</span></p>
    <p v-if="commentType === 2"><span><i class="iconfont icon-renbudaiwaiquan"></i>{{userInfo.profile.nickname}}，发表评论</span></p>
    <div class="comment-form">
      <div class="avatar">
        <img :src="userInfo.profile.avatarUrl  + '?param=60y60' ">
      </div>
      <div class="comment-area">
        <textarea v-model="commentContent" :placeholder="placeholder" cols="50" rows="5"></textarea>
      </div>
    </div>
    <div class="comment-btn">
      <span v-if="commentType === 2" @click="handleCencle">取消评论</span>
      <button @click="handleComment">评论</button>
    </div>
  </div>
</template>

<script>
import { sendComment } from '@/network/comment'
export default {
  name: 'CommentBox',
  data() {
    return {
      userInfo: '',
      commentContent: ''
    }
  },
  props: {
    commentType: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String,
      default: "看了不回？哼! 白嫖怪"
    },
    currentCommentId: {
      type: [String, Number]
    }
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('info'))
  },
  methods: {
    handleComment() {
      if (this.commentContent === '') {
        this.$message.error('哥，你什么都没写呀，评论个屁！')
      }
      if (this.commentType === 1 && this.$route.query.id) {
        sendComment(1, 5, this.$route.query.id, this.commentContent,).then(res => {
          console.log("全体评论", res);
          if (res.data.code !== 200) { return this.$message.error('评论失败') }
          this._reload()
        })
      } else if (this.commentType === 2 && this.currentCommentId) {
        console.log("22222",this.currentCommentId);
        sendComment(2, 5, this.$route.query.id, this.commentContent, this.currentCommentId).then(res => {
          if (res.data.code !== 200) { return this.$message.error('评论失败') }
          this._reload()
        })
      }
    },
    handleCencle() {
      this.$bus.$emit('hideNomalComment', true) //告诉video详情页，可以清空id，隐藏个别评论的盒子了
    },
    _reload() {
      this.$message.success('评论成功')
      this.$bus.$emit('reloadCommend')
      this.commentContent = ''
    }

  },
}
</script>

<style lang="scss" scoped>
.comment-box {
  margin-top: 20px;
  p {
    margin: 0;
    padding: 0;
    span {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 14px;
      i {
        margin-right: 10px;
        font-size: 14px;
        margin-top: -4px;
        font-weight: 700;
      }
    }
  }
  .comment-form {
    display: flex;
    margin-top: 1.5em;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 3px;
      margin-right: 20px;
      position: relative;
      flex-shrink: 0;
      img {
        width: 100%;
      }
    }
    .comment-area {
      flex: 1;
      textarea {
        width: 100%;
        outline: none;
        background: #f8f9ff;
        resize: none;
        padding: 6px 12px;
        color: #666;
        border: 1px solid #eaebff;
        border-radius: 3px;
        font-size: 13px;
        height: 80px;
      }
    }
  }
  .comment-btn {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
      font-size: 0.75rem;
      margin-right: 40px;
      color: rgb(187, 184, 184);
      cursor: pointer;
    }
    button {
      color: #fff;
      padding: 10px 30px;
      font-size: 0.75rem;
      border-radius: 3px;
      border: none;
      cursor: pointer;
      outline: none;
      background-image: linear-gradient(-45deg, #ffc796 0%, #ff6b95 100%);
      &:active {
        background-image: linear-gradient(240deg, #f77062 0%, #fe5196 100%);
      }
    }
  }
}
</style>