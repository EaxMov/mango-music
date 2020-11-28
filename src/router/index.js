import Vue from "vue"
import VueRouter from "vue-router"
const Index = () => import("@/views/Index")
const RecomendMusic = () => import("@/components/recomendmusic/RecomendMusic")
const Rank = () => import("@/components/rank/Rank")
const Musiclist = () => import("@/components/musiclist/Musiclist")
const Singer = () => import("@/components/singer/Singer")
const Video = () => import("@/components/video/Video")
const Mv = () => import("@/components/mv/Mv")
const songsheet = () => import("@/components/songsheet/SongSheet")
const SingerDetail = () => import("@/components/singerdetail/SingerDetail")
const AblumSheet = () => import("@/components/ablumsheet/AblumSheet")
const Search = () => import("@/components/search/Search")
const Login = () => import("@/components/login/Login")
const VideoDetail = () => import("@/components/videodetail/VideoDetail")
const MvDetail = () => import("@/components/mvdetail/MvDetail")
const Personal = () => import("@/components/personal/Personal")

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "/mango-music"
  },
  {
    path: "/mango-music",
    name: "Index",
    component: Index,
    redirect: "/mango-music/recomendmusic",
    children: [
      {
        path: "/mango-music/recomendmusic",
        component: RecomendMusic
      },
      {
        path: "/mango-music/rank",
        component: Rank,
        beforeEnter: (to, from, next) => {
          if(JSON.parse(window.localStorage.getItem('info'))){
            next()
          }else{
            next('/mango-music/login')
          }
        }
      },
      {
        path: "/mango-music/musiclist",
        component: Musiclist
      },
      {
        path: "/mango-music/singer",
        component: Singer
      },
      {
        path: "/mango-music/video",
        component: Video
      },
      {
        path: "/mango-music/mv",
        component: Mv
      },
      {
        path: "/mango-music/songsheet",
        name: "songsheet",
        component: songsheet
      },
      {
        path: "/mango-music/singer-detail",
        name: "SingerDetail",
        component: SingerDetail
      },
      {
        path: "/mango-music/ablumsheet",
        name: "AblumSheet",
        component: AblumSheet
      },
      {
        path: "/mango-music/search",
        name: "Search",
        component: Search
      },
      {
        path: "/mango-music/video-detail",
        name: "VideoDetail",
        component: VideoDetail
      },
      {
        path: "/mango-music/mv-detail",
        name: "MvDetail",
        component: MvDetail
      },
      {
        path: "/mango-music/personal",
        name: "Personal",
        component: Personal
      }
    ]
  },
  {
    path: "/mango-music/login",
    name: "Login",
    component: Login
  }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  // 路由切换时，更新显示坐标 https://blog.csdn.net/panchang199266/article/details/90524319
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
export default router
