<template>
<div class="LoadMore">
  <div class="loadicon">
  </div>
  <div class="loading">...Loading...</div>
</div>

</template>

<script>
export default {
  name:'LoadMore',

}
</script>

<style scoped>
.LoadMore{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.loadicon{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background:linear-gradient(45deg,transparent,transparent 40%,#e5f403);
  position: relative;
  animation: animate 2s  linear infinite;
}
.loadicon::before{
  content:'';
  position:absolute;
  top: 3.5px;
  left: 3.5px;
  right: 3.5px;
  bottom: 3.5px;
  background: #fefefe;
  border-radius: 50%;
  z-index: 1000;
}
.loadicon::after{
  content:'';
  position:absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background:linear-gradient(45deg,transparent,transparent 40%,#fefefe);
  border-radius: 50%;
  z-index: 1;
  filter: blur(15px);
}
@keyframes animate {
  0%{
    transform: rotate(0deg);
    filter: hue-rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
.loading{
  margin-top: 15px;
  font-size: 12px;
  color: #c9c7c7;
}
</style>