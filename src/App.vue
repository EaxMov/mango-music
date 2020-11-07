<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
}
</script>
<style>
@import "~@/assets/css/global.css";
#app {
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  width: 0 ;
}
::-webkit-scrollbar {
  width: 0 ;
  height: 0;
}
</style>
