<template>
  <div class="Video bystyle">
    <div class="topBox shadow">
      <el-popover placement="bottom-start" width="500" trigger="click" popper-class="video-Popover">
        <ul class="video-all-tags">
          <li v-for="(item,index) in categoryAll" :class="{activeBg:item.id === currenId}" :key="index" @click="handelSelect(item)">{{ item.name }}</li>
        </ul>
        <div class="categoryBox" slot="reference">
          <span>{{currenName}}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
      </el-popover>
      <div class="CatHotBox">
        <p>分类：</p>
        <ul class="HotList">
          <li v-for="(item,index) in videoCategory" :key="index" :class="{activeFfont:item.id === currenId}" @click="handelSelect(item)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="seachtype">
        <div class="typeall" :class="{ type_select: isgetall === '推荐' }" @click="clickall('推荐')">推荐</div>
        <div class="typeall" :class="{ type_select: isgetall === '全部' }" @click="clickall('全部')">全部</div>
      </div>
    </div>
    <div class="videoBox" v-loading="!videoData">
      <MvList :mvlistArr="videoData" :showPublishTime="false" />
    </div>
    <div class="btnBox">
      <button :disabled="currenPage === 0 ? 'disabled' : null" @click="handleChangePage('pre')">上一页</button>
      <button @click="handleChangePage('next')">下一页</button>
    </div>
  </div>
</template>

<script>
import {
  getVideoCategory,
  getVideoCategoryAll,
  getVideoRecommend,
  getVideoAll,
  getVideoDetail,
} from "@/network/video";
import MvList from "@/components/common/com_mvlist/MvList";
export default {
  name: "Video",
  components: {
    MvList,
  },
  data() {
    return {
      videoCategory: [], //分类列表
      categoryAll: [], // 全部分类
      isgetall: "推荐", //推荐或最新
      currenId: -1,
      currenName: "推荐",
      videoData: null,
      currenPage: 0, //页数
    };
  },
  created() {
    this.getVideoCategory();
    this.getVideoCategoryAll();
    this.getVedieoData();
  },
  methods: {
    getVideoCategory() {
      //获取展示的部分标签
      getVideoCategory().then((res) => {
        if (res.data.code !== 200)
          return this.$message.error("获取分类列表失败");
        this.videoCategory = res.data.data.filter((item) => item.name !== "MV");
      });
    },
    getVideoCategoryAll() {
      //全部分类标签
      getVideoCategoryAll().then((res) => {
        if (res.data.code !== 200)
          return this.$message.error("获取全部分类列表失败");
        this.categoryAll = res.data.data;
      });
    },
    clickall(type) {
      this.currenName = this.isgetall = type;
      this.currenPage = 0
      this.getVedieoData();
    },
    handelSelect(item) {
      //分类点击事件
      this.currenPage = 0
      this.isgetall = "";
      this.currenId = item.id;
      this.currenName = item.name;
      this.getVedieoData();
    },
    getVedieoData() {
      //判断类型获取数据 有推荐 - 全部 - 其他分类
      if (this.currenName === "推荐") {
        getVideoRecommend(this.currenPage).then((res) => {
          if (res.data.code !== 200)
            return this.$message.error("获取推荐数据失败");
          this.videoData = this.dataUpdate(res.data.datas);
        });
      } else if (this.currenName === "全部") {
        getVideoAll(this.currenPage).then((res) => {
          if (res.data.code !== 200)
            return this.$message.error("获取全部数据失败");
          this.videoData = this.dataUpdate(res.data.datas);
        });
      } else {
        getVideoDetail(this.currenId, this.currenPage).then((res) => {
          if (res.data.code !== 200) return this.$message.error("获取其他失败");
          this.videoData = this.dataUpdate(res.data.datas);
        });
      }
    },
    handleChangePage(type) {
      if (type === "next") {
        this.currenPage++;
      } else {
        this.currenPage--;
      }
      this.getVedieoData();
    },
    dataUpdate(arr) {
      //处理MV数据
      return arr
        .map((item) => {
          if (item.type === 1) {
            return {
              imgurl16v9: item.data.coverUrl,
              playCount: item.data.playTime,
              artistName: item.data.creator.nickname,
              duration: item.data.durationms,
              name: item.data.title,
              vid: item.data.vid,
            };
          }
        })
        .filter((item) => item !== undefined);
    },
  },
};
</script>

<style lang="scss" scoped>
.Video {
  .topBox {
    .categoryBox {
      line-height: 40px;
      border-radius: 4px;
      width: auto;
      background: #f2aa0c;
      color: white;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      span {
        margin: 0 8px;
      }
      i {
        margin-right: 8px;
      }
    }
  }
  .videoBox {
    margin: 30px -15px;
  }
  .btnBox {
    display: flex;
    justify-content: center;
    button {
      margin: 0 15px;
      outline: none;
      border: none;
      background-color: #fa2800;
      color: white;
      border-radius: 3px;
      padding: 9px 10px;
      font-size: 14px;
      cursor: pointer;
      &:disabled {
        background-color: #fab6b6;
      }
    }
  }
}
.video-all-tags {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  li {
    background-color: #f7f7f7;
    margin: 0 10px 10px 0;
    font-size: 12px;
    padding: 8px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s linear;
    &:hover {
      background-color: #fbda91;
      color: white;
    }
  }
}
.activeBg {
  background-color: #fa2800 !important;
  color: white;
}
.activeFfont {
  color: red;
}
</style>
