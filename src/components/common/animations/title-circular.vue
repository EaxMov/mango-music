<template>
<div id="titleCircular">
  <div class="title"><div class="titlecontent"><slot><h4>推荐歌单</h4></slot><i></i></div></div>
</div>
</template>

<script>
export default {
  name:'titleCircular',

}
</script>

<style scoped>
.title {
  padding: 0;
  margin: 0 0 15px 0;
}
.titlecontent{
  display: flex;
  align-items: center;
}
.titlecontent i{
  width: 7.2px;
  height: 7.2px;
  border-radius: 50%;
  background-color: #e9bd12;
  margin-left: 5px;
  animation: circular 3s infinite linear;
}
h4{
  padding: 0;
  margin: 0;
}
@keyframes circular{
  0%{
    opacity: 0.5;
    transform: scale(1.2);
  }
  50%{
    transform: scale(0.5);
    opacity: 1;
  }
  100%{
    transform: scale(1.2);
    opacity: 0.5;
  }
}
</style>