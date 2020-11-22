<template>
  <div class="undefined" v-else>
    <div class="bearlogo"><img src="~@/assets/img/undefined.png" alt=""></div>
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  name:'empty',
  props:{
    title:{
      type:String,
      default:'空空如也~~'
    }
  }
}
</script>

<style scoped>
.undefined{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.bearlogo img{
  width: 300px;
  height: auto;
}
</style>