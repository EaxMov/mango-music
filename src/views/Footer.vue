<template>
  <div>
    <div class="Footer shadow">
      <div class="authorinfo">
        <p>Mango-Music</p>
        <h4>By D18C4208</h4>
      </div>
      <div class="contact">
        <el-popover placement="top" width="200" trigger="hover" popper-class="qq-Popover">
          <div class="qqDiv"><img src="https://file.moetu.org/images/2020/12/01/_20201201200419b67a18d192ec6a69.jpg"></div>
          <a slot="reference"><i class="iconfont icon-qq"></i></a>
        </el-popover>
        <el-popover placement="top" width="200" trigger="hover" popper-class="vx-Popover">
          <div class="vxDiv"><img src="https://file.moetu.org/images/2020/12/01/_202012012004277ebf57224fd1b93d.jpg"></div>
          <a slot="reference"><i class="iconfont icon-logo-wechat"></i></a>
        </el-popover>
        <a href="https://github.com/MoveAXS/mango-music" target="_blank"><i class="iconfont icon-github"></i></a>
      </div>
    </div>
    <div :class="{playshow:playisshow}"></div>
  </div>

</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      playisshow: false
    }
  }
  ,
  created() {
    this.$bus.$on('BtPlayisShow', booln => {
      this.playisshow = booln
    })
  },
}
</script>

<style lang="scss">
.Footer {
  margin-top: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .authorinfo {
    height: 50px;
    max-width: 1380px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .contact {
    width: 100%;
    max-width: 1380px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    a {
      display: block;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: #eceaea;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      cursor: pointer;
      text-decoration: none;
      transition: 0.5s linear;
      &:hover {
        background-color: #c3c0c0;
      }
      i {
        color: rgb(255, 255, 255);
        font-size: 20px;
      }
    }
  }
  .authorinfo p,
  h4 {
    color: rgba(0, 0, 0, 0.5);
    margin: 0;
  }
  p {
    font-size: 14px;
    border-left: 3px solid #f0c734;
  }
}
.playshow {
  width: 100%;
  height: 70px;
}
.qq-Popover,
.vx-Popover {
  width: 200px;
  img {
    width: 100%;
  }
}
</style>