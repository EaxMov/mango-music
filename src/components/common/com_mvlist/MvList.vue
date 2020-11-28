<template>
  <div class="MvListBox">
    <ul class="mvlist" v-if="mvlistArr  && mvlistArr.length>0">
      <li v-for="item in mvlistArr" @click="goDetail(item)">
        <div class="cover">
          <div class="publishitime" v-if="showPublishTime">{{item.publishTime}}</div>
          <div class="image">
            <img v-lazy="item.imgurl16v9 + '?param=325y197'" alt="">
          </div>
          <div class="count">
            <i class="iconfont icon-bofangsanjiaoxing"></i>
            <span>{{item.playCount | playCount}}</span>
          </div>
          <div class="duration">
            <div class="name">{{item.artistName}}</div>
            <div class="time">{{item.duration | formatDate}}</div>
          </div>
        </div>
        <div class="info" :title="item.name">{{item.name}}</div>
      </li>
    </ul>
    <Empty v-else />
  </div>
</template>

<script>
import Empty from "@/components/common/emptybgtips/Empty";
import { playCount, formatDate } from "@/common/js/utils";
export default {
  name: "MvList",
  components: {
    Empty,
  },
  props: {
    mvlistArr: {
      type: Array,
      default: [],
    },
    showPublishTime: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    goDetail(item) {
      // if (!window.localStorage.getItem('info')) {
      //   this.$message.error('请先登录')
      //   return
      // }
      if (item.vid) {
        this.$router.push({
          path: "/mango-music/video-detail",
          query: {
            id: item.vid,
          },
        });
      } else {
        this.$router.push({
          path: "/mango-music/mv-detail",
          query: {
            id: item.id,
          },
        });
      }
    },
  },
  filters: {
    playCount(count) {
      return playCount(count);
    },
    formatDate(value) {
      return formatDate(new Date(value), "mm:ss");
    },
  },
};
</script>

<style scoped>
.mvlist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.mvlist li {
  margin: 0 15px 30px;
  flex: 0 0 calc(25% - 30px);
  max-width: calc(25% - 30px);
  cursor: pointer;
  padding: 0;
}
.cover {
  position: relative;
  z-index: 2;
  padding-top: 56%;
  border-radius: 2px;
}
.mvlist li:hover .cover::before {
  font-family: "iconfont";
  content: "\e609";
  color: white;
  position: absolute;
  font-size: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.image {
  /* width: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.image img {
  height: 100%;
  width: 100%;
  border-radius: 2px;
  display: block;
}
.count {
  position: absolute;
  right: 16px;
  top: 1px;
  height: 24px;
  padding-left: 9px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
    no-repeat 0;
  background-size: cover;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.count i {
  font-size: 12px;
  margin-right: 3px;
}
.count::before {
  content: "";
  position: absolute;
  right: -14px;
  top: 0;
  width: 14px;
  height: 24px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
    no-repeat 100%;
  background-size: cover;
}
.duration {
  position: absolute;
  background-color: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 35px;
  left: 0;
  right: 0;
  bottom: 0;
}
.duration {
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.info {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
}
.publishitime {
  position: absolute;
  color: white;
  top: 0;
  left: 0;
  font-size: 12px;
  background-color: #110f0d;
  border-radius: 2px;
  padding: 3px;
}
</style>