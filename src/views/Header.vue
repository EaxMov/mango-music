<template>
  <div class="header shadow">
    <div class="header-container">
      <div class="logo"><img src="~@/assets/img/logo.png" alt="" @click="$router.push('/mango-music/recomendmusic');currentIndex=0"></div>
      <ul class="meulist">
        <li v-for="(items,index) in category" @click=" Pushrouter(index)">
          <a :class="[{liisactive:index === currentIndex},{hfontcolor:index === currentIndex}]">{{items}}</a>
        </li>
      </ul>
      <Search />
      <div class="space"></div>
      <div class="login" @click="goLogin" v-if="userinfo===true">登录</div>
      <div class="user" v-else>
        <div class="avator"><img :src="userinfo.profile.avatarUrl + '?param=50y50'" alt=""></div>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <a class="nickname">{{userinfo.profile.nickname}}</a>
            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" command="0">个人主页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-off" command="1">我的等级</el-dropdown-item>
            <el-dropdown-item icon="el-icon-setting" command="2">个人设置</el-dropdown-item>
            <el-dropdown-item divided icon="el-icon-circle-close" command="3">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/common/search/Search";
export default {
  inject: ['reload'],
  name: 'Header',
  components: {
    Search
  },
  data() {
    return {
      category: ['发现音乐', '排行榜', '歌单', '歌手', '视频', 'MV'],
      currentIndex: 0
    }
  },
  methods: {
    Pushrouter(index) {
      this.currentIndex = index
      switch (index) {
        case 0: this.$router.push('/mango-music/recomendmusic'); break
        case 1: this.$router.push('/mango-music/rank'); break
        case 2: this.$router.push('/mango-music/musiclist'); break
        case 3: this.$router.push('/mango-music/singer'); break
        case 4: this.$router.push('/mango-music/video'); break
        case 5: this.$router.push('/mango-music/mv'); break
      }
    },
    goLogin() {
      this.$router.push({
        name: 'Login'
      })
    },
    handleCommand(index) {
      switch (index) {
        case '0': this.$router.push({ path: "/mango-music/personal" }); break;
        case '3': window.localStorage.removeItem('cookie'); window.localStorage.removeItem('info'); this.reload();
          this.$router.push({
            path: '/mango-music/recomendmusic'
          })
            ; break
      }
    }
  },
  computed: {
    watchpath() {
      return this.$route.path
    },
    userinfo() {
      if (window.localStorage.getItem('info')) {
        return JSON.parse(window.localStorage.getItem('info'))
      } else {
        return true
      }
    }
  },
  watch: {
    watchpath() {
      let _path = this.watchpath
      if (_path.indexOf('login') === -1 && _path.indexOf('recomendmusic') === -1 && _path.indexOf('rank') === -1 && _path.indexOf('musiclist') === -1 && _path.indexOf('singer') === -1 && _path.indexOf('video') === -1 && _path.indexOf('mv') === -1) {
        this.currentIndex = ''
      }
    }
  }

}
</script>

<style scoped>
.header {
  height: 70px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.header-container {
  height: 70px;
  display: flex;
  align-items: center;
  transition: all 0.4s ease-in-out;
  max-width: 1380px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}
.logo {
  width: 163px;
  cursor: pointer;
}
.logo img {
  background-size: cover;
  width: 100%;
}
.meulist {
  list-style-type: none;
  display: flex;
  font-size: 14px;
  padding: 0;
  margin: 0;
  margin-left: 25px;
  flex: 1;
  align-items: center;
}
.meulist li a {
  position: relative;
}
.meulist li {
  height: 100%;
  padding: 0 15px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  font-size: 14px;
  justify-content: center;
}
.liisactive {
  width: 6px;
  height: 4px;
  position: relative;
}
.liisactive::after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  width: 6px;
  height: 4px;
  border-radius: 2px;
  background-color: #e7be13;
  animation: liisactive 0.1s linear;
  margin: 0 auto;
  bottom: -7px;
}
@keyframes liisactive {
  0% {
    transform: scaleX(0);
    height: 4px;
  }
  100% {
    transform: scaleX(6px);
    height: 4px;
  }
}
.hfontcolor {
  color: #f5a90b;
  transition: all 0.2s linear;
}
.login {
  cursor: pointer;
  padding-left: 15px;
  font-size: 14px;
}
.login:hover {
  color: #f43f29;
}
.user {
  margin-left: 15px;
  display: flex;
  align-items: center;
  height: 70px;
  cursor: pointer;
}
.avator {
  width: 45px;
  height: 45px;
}
.avator img {
  border-radius: 50%;
  width: 100%;
  display: block;
}
.space {
  width: 1px;
  height: 15px;
  background-color: rgb(214, 213, 213);
}
.nickname {
  margin: 0 15px;
  font-size: 14px;
}
</style>