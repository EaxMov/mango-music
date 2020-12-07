<template>
  <div id="app" ref="app" class="app">
    <router-view v-if="isRouterAlive" />
        <el-backtop target=".app" :visibility-height="300" :bottom="190">
      <div class="iconfont icon-262">
      </div>
    </el-backtop>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  watch: {
    $route: function (to, from) {
      this.$refs.app.scrollTop = 0
    },
  },
}
</script>
<style>
@import "~@/assets/css/global.css";
html,
body {
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.el-backtop {
  right: 2.5% !important;
}
.icon-262 {
  font-size: 46px;
}
::-webkit-scrollbar {
  width: 0;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
