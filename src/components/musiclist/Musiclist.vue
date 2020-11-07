<template>
<div class="Musiclist bystyle">
  <div class="topBox shadow">
     <el-cascader
     :show-all-levels="false"
     placeholder=""
      v-model="value"
      :options="CatList"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChange"></el-cascader>
      <div class="CatHotBox">
        <p>热门标签：</p>
        <ul class="HotList">
          <li v-for="item in CatHost" :class="{fontcolor:currentIndex === item.name}" @click="clicktype(item)">{{item.name}}</li>
        </ul>
      </div>

      <div class="seachtype">
        <div class="typeall" :class="{type_select:seachtype === 0}" @click="changetype(0)">热门</div>
        <div class="typeall" :class="{type_select:seachtype === 1}" @click="changetype(1)">最新</div>
      </div>
  </div>
  <div class="musicListBox  ">
    <MeuList2 :recommendMuiscLists="MusicDetailList" v-loading="loading" />
  </div>
  <div class="page">
     <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currenPage"
      layout="total, prev, pager, next,jumper"
      :page-size="40"
      :total="tatal">
    </el-pagination>
  </div>
</div>
</template>

<script>
import MeuList2 from '@/components/common/com_meulist/MeuList2'
import {getCatList,getCatHot,getCatgoryList} from '@/network/musiclist'
export default {
  name:'Musiclist',
  components:{
    MeuList2
  },
  data() {
    return {
      loading:false,
      currentIndex:'',
      seachtype:0, //搜索模式 0 最热 1 最新
      value:['全部'],
      CatList:[], //全部歌单分类
      CatHost:{}, //热门歌单
      MusicDetailList:[], //歌单列表
      tatal:0, //总量
      currenPage:1 //默认选中页数
    }
  },
  created() {
    this.getCatList()
    this.getCatHot()
    this.getCatgoryList()
  },
  methods: {
    getCatList(){
      getCatList().then(res => {
        if(res.data.code !== 200) return this.$message.error('获取全部歌单分类失败')
        res.data.categories['length'] = 5
        this.CatList = Array.from(res.data.categories).map(item => {
          return {label:item,value:item,children:[]}
        })
        this.CatList.unshift({label:'全部',value:'全部'})
        res.data.sub.filter(item => {
          item['label'] = item.name
          item['value'] = {}
          item['value'] = item.name
          this.CatList[item.category + 1].children.push(item)
        })
      })
    },
    getCatgoryList(order,cat,limit,offset){
      this.loading = true
      getCatgoryList(order,cat,limit,offset).then(res => {
        if(res.data.code !== 200) return this.$message.error('获取全部歌单失败')
        this.MusicDetailList = res.data.playlists
        this.tatal = res.data.total
        this.loading = false
      })
    }, 
    getCatHot(){
      getCatHot().then(res => {
        if(res.data.code !== 200) return this.$message.error('获取热门歌单失败')
        this.CatHost = res.data.tags
      })
    },
    handleChange(value){  //级联选择器切换
      value.length === 1 ? this.currentIndex = value[0] : this.currentIndex = value[1]
      this.getCatgoryList(this.typestr,this.currentIndex,40,0)
      this.currenPage = 1
    },
    clicktype(type){ //点击分类
      if(this.currentIndex === type.name) return 
      this.value = []
      this.currentIndex = type.name
      this.value[0] = this.CatList[type.category+1].label
      this.currenPage = 1
      var bl = this.CatList[type.category + 1].children.some(item => {
        return item.name === type.name
      })
      if(!bl){
        var temp = type
        temp['label'] = temp['value'] = type.name
        this.CatList[type.category+1].children.push(temp)
      }
      this.value[1] = type.name
      this.getCatgoryList(this.typestr,this.currentIndex,40,0)
    },
    changetype(type){ //切换热门/最新
      this.seachtype = type
      this.getCatgoryList(this.typestr,this.currentIndex,40,0)
    },
    handleCurrentChange(offset){ //页数发送改变
      this.getCatgoryList(this.typestr,this.currentIndex,40,(offset-1)*40)
    }
  },
  computed: {
    typestr(){
      return this.seachtype === 0 ? 'hot' : 'new'
    }
  },
}
</script>

<style scoped>

.el-cascader{
  width: 6.8rem;
}
.musicListBox{
  margin-top: 30px;
}
.page{
  display: flex;
  justify-content: center;
}
</style>