<template>
  <div class="Index">
    <Header />
    <Container />
    <BottomPlay />
    <Footer />
    <Containerplay v-if="$store.state.PlayingMusicConfig.id !== undefined" />
    <div class="mango"></div>
    <div class="bgball bg-animation1"></div>
    <div class="bgball bg-animation2"></div>
    <div class="bgball bg-animation3"></div>
    <div class="bgball bg-animation4"></div>
    <el-backtop target=".Index" :visibility-height="300">
      <div class="iconfont icon-262">
      </div>
    </el-backtop>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import Container from '@/views/Container'
import BottomPlay from '@/components/common/bottomplay/BottomPlay'
import Containerplay from '@/components/common/containerplay/Containerplay'
export default {
  name: 'Index',
  components: {
    Header,
    Container,
    Footer,
    BottomPlay,
    Containerplay
  }
}
</script>

<style scoped>
.Index {
  overflow: scroll;
  height: 100%;
}
.el-backtop {
  bottom: 170px !important;
  /* background-color: transparent !important; */
  /* width: 0;
  height: 0; */
  /* box-shadow: none; */
  right: 2.5% !important;
}
.icon-262{
  font-size: 46px;
}
.bgball {
  pointer-events: none;
  position: fixed;
  z-index: 10;
}
.mango {
  background: url("~@/assets/img/mangocartoon.gif") no-repeat;
  background-size: cover;
  width: 65px;
  height: 65px;
  position: fixed;
  z-index: 999;
  top: 50%;
  transform: translateY(-50%);
  left: 0.5%;
}
.bg-animation1 {
  right: 3%;
  top: 110px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    rgba(240, 155, 233, 0.13) 0,
    rgba(161, 33, 236, 0.07)
  );
  animation: move 2.5s cubic-bezier(0.57, 0, 0.33, 0.97) infinite; /* 自定义贝塞尔曲线，开始结束快中间慢， */
}
.bg-animation2 {
  width: 50px;
  height: 50px;
  left: 3%;
  top: 120px;
  background: linear-gradient(
    180deg,
    rgba(240, 155, 233, 0.07) 0,
    rgba(148, 212, 241, 0.14)
  );
  animation: square 10s linear infinite;
}
.bg-animation3 {
  left: 3%;
  top: 60%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    rgba(100, 84, 239, 0.1) 0,
    rgba(48, 33, 236, 0.04)
  );
  animation: move 3s cubic-bezier(0.57, 0, 0.33, 0.97) infinite;
}
.bg-animation4 {
  width: 120px;
  height: 120px;
  right: 6%;
  bottom: 15%;
  background: linear-gradient(
    180deg,
    rgba(240, 155, 233, 0.1) 0,
    rgba(148, 212, 241, 0.07)
  );
  animation: square2 9s linear infinite;
}
@keyframes move {
  0% {
    transform: translateY(0px);
    opacity: 0.5;
  }

  50% {
    transform: translateY(25px);
    opacity: 1;
  }

  100% {
    transform: translateY(0px);
    opacity: 0.5;
  }
}
@keyframes square {
  0% {
    transform: translateY(0px) rotate(-360deg);
  }
  50% {
    transform: translateY(35px);
  }
  100% {
    transform: translateY(0px) rotate(360deg);
  }
}
@keyframes square2 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
