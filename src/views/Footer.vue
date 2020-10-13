<template>
<div class="Footer shadow" :class="{playshow:playisshow}">
  <div class="authorinfo">
    <p>Mango-Music</p>
    <h4>By D18C4208</h4>
  </div>
</div>

</template>

<script>
export default {
  name:'Footer',
  data(){
    return {
      playisshow:false
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

<style scoped>
.Footer{
  margin-top: 50px;
  background-color: rgb(255, 255, 255,.7);
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
}
.playshow{
  margin-bottom: 70px;
}
.authorinfo{
  height: 50px;
  max-width: 1380px;
  width: 100%;
  margin:  0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.authorinfo p,h4 {
  color: rgb(0, 0, 0,.5);
  margin: 0;
}
p{
  font-size: 14px;
  border-left: 3px solid #f0c734;
}
</style>