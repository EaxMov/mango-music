<template>
  <div class="historyBox shadow">
    <div class="title">
      播放历史
      <el-popconfirm title="确定清空全部列表吗？" ref="deleteAll" popper-class="deleteOnce" @onConfirm="confirm">
        <i class="iconfont icon-lajitong" title="清空" slot="reference"></i>
      </el-popconfirm>
    </div>
    <ul>
      <li v-for="(item,index) in musicList" @click="handlePlay(item)">
        <span>{{index+1 | padStart}}</span>
        <div class="cover">
          <img :src="item.album.picUrl + '?param=30y30' ">
        </div>
        <div class="name">{{item.name}}</div>
        <i class="iconfont icon-baseline-close-px" @click.stop="handleDelete(index)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HistoryMusicBox',
  data() {
    return {
      musicList: []
    }
  },
  created() {
    this.musicList = this.$store.state.historyMusicList
  },
  computed: {
    localList() {
      return this.$store.state.historyMusicList
    }
  },
  methods: {
    handlePlay(item) {
      this.$bus.$emit('BtPlayisShowEvent', item)
    },
    handleDelete(index) {

      this.localList.splice(index, 1)
      window.localStorage.setItem('PlayHistory', JSON.stringify(this.localList))
    },
    clear() {
      if (this.localList.length === 0) {
        return this.$message.warning('删空气吗，什么都没有呀')
      }
      this.$store.commit('historyMusicList', '')
      window.localStorage.removeItem('PlayHistory')
      this.$message.success('删除成功')
    },
    confirm() {
      console.log(1);
      this.clear()
    }
  },
  watch: {
    localList() {
      this.musicList = this.localList
    }
  },
  filters: {
    padStart(value) {
      return String(value).padStart('2', '0')
    },
  }
}
</script>

<style lang="scss">
.historyBox {
  background-color: rgba(255, 255, 255, 0.95);
  width: 460px;
  height: 580px;
  position: absolute;
  right: 0;
  bottom: 80px;
  border-radius: 3px;
  padding: 30px;
  overflow: hidden;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 30px;
    font-weight: 500;
    font-size: 16px;
    .icon-lajitong:hover {
      color: #fa2800;
    }
    i {
      cursor: pointer;
      font-weight: 400;
      font-size: 18px;
    }
  }
  ul {
    overflow-y: scroll;
    list-style: none;
    margin: 17px 0;
    padding: 0;
    max-height: calc(100% - 70px);
    li {
      display: flex;
      align-items: center;
      height: 40px;
      margin-bottom: 10px;
      &:hover {
        background-color: #c4c2c2;
        border-radius: 5px;
        transition: 0.3s linear;
      }
      span {
        width: 30px;
        margin-right: 20px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #4a4a4a;
      }
      .cover {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        img {
          width: 100%;
          border-radius: 4px;
        }
      }
      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        flex: 1;
        margin-right: 20px;
      }
      .icon-baseline-close-px {
        font-size: 20px;
        padding-right: 5px;
        &:hover {
          color: #fa2800;
        }
      }
    }
  }
}
.deleteOnce {
  z-index: 9999 !important;
}
</style>