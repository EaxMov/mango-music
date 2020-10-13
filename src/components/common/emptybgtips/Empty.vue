<template>
  <div class="undefined" v-else>
    <div class="bearlogo"><img src="~@/assets/img/undefined.png" alt=""></div>
    <p>空空如也~~</p>
  </div>
</template>

<script>
export default {
  name:'empty',

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