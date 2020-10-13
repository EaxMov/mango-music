<template>
  <div class="banner" ref="banner">
    <swiper class="swiper" :options="swiperOption" v-if="banners.length > 1">
      <swiper-slide v-for="banner of banners" :key="banner.imageUrl">
        <img :src="banner.imageUrl" />
        <div :class="[{target1:banner.titleColor == 'red'},{target2:banner.titleColor == 'blue'}]">{{banner.typeTitle}}</div>
      </swiper-slide>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
    </swiper>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
export default {
  name: "Banners",
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false, //操作后重新启动轮播
        },
        slidesPerView: 3, //设置一个slider容器同事显示3个图片
        spaceBetween: 30, //slide之间设置距离
        slidesPerGroup: 3, //多少张图片作为一组
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //分页按钮拥有点击效果
        },
        loop: true, //循环切换
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        grabCursor: true, //小手拖拽提示
      },
    }
  },
  props: {
    banners: Array,
  },
}
</script>

<style>
.swiper-wrapper {
  height: 9.8em;
}
.swiper-slide img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
.swiper-container .swiper-button-hidden {
  opacity: 0;
}
.banner {
  position: relative;
  z-index: 98;
}
.swiper-pagination {
  width: 100%;
  height: 25px;
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 0.5em;
}
.swiper-pagination-bullet {
  padding: 5px;
  width: 10px;
  height: 10px;
  display: inline-block;
  background: rgb(0, 0, 0, 0.8);
  border-radius: 50%;
  margin: 0 7px;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
}
.swiper-pagination-bullet-active {
  background-image: url("~@/assets/img/pagination_selected.png");
  background-color: transparent;
  background-size: cover;
  width: 24px;
  height: 24px;
  animation: eat 0.2s;
}
@keyframes eat {
  0%{
    opacity: 0;
    width: 10px;
    height: 10px;
  }
  80%{
    opacity: 1;
    width: 24px;
    height: 24px;
  }
  90%{
    width: 18px;
    height: 18px;
  }
  100%{
    width: 24px;
    height: 24px;
  }
}
.swiper-button-prev,.swiper-button-next{
  color:#ffffff;
}
.swiper-button-prev::after,.swiper-button-next:after{
  font-size: 18px;
}
.target1{
  background-color:#e99b89;
  color: white;
}
.target2{
  background-color:#4a79cc;  
  color: white;
}
.target1,.target2{
  width: 7.1em;
  position: absolute;
  height: 23px;
  right: 0;
  top: 0;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  text-align: center;
  line-height: 23px;  
  font-size: 13px;
}
</style>
