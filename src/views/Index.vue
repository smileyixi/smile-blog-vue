<template>
    <section class="conBox" ref="indexmain" >
      <!-- snow -->
      <canvas id="Snow" width="100%" height="100%"></canvas>

      <!--加载动画 -->
      <div id="loading" v-if="isLoading" class="loading">
        <div class="blur"></div>
        <svg width="128" height="128" viewBox="0 0 128 128" class="svg-loading">
          <filter id="displacementFilter">
            <feTurbulence type="turbulence" baseFrequency="0.047624336107621165" numOctaves="2" result="turbulence" style="transform: scale(1);"></feTurbulence>
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="14.334814110133927" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
          <polygon points="64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100" 
          style="filter: url(&quot;#displacementFilter&quot;); transform: scale(1);stroke:#55e8b2;stroke-width:6;stroke-opacity:0.1" fill="#159969"></polygon>
        </svg>
      </div>

      <!-- toTop -->
      <div id="toTop" @click="toTop">
        <span>△</span>
      </div>

      <Header></Header>
      
      <main>
        <div class="wrapper" id="wrapper">
          <!-- headerBar -->
          <div :style="`background-image: url(${tit_bg})`">
            <header  id="header" :class="{'grass': isChangeNavbg}">
              <!-- 虚幻开关 -->
              <el-switch
                class="swtichPositon"
                v-model="isChangeNavbg"
                active-color="#222"
                inactive-color="#555">
              </el-switch>
              <div class="description" style="float: right">
                <a :href="siteUrl" style="cursor: pointer;">
                  <!-- 博客标题 -->
                  <h1 class="effect_1 font-pic" >
                    {{siteTitle}}
                  </h1>
                </a>
                
                <!-- 个性标签 -->
                <h2 class="autograph">{{siteDescription}}</h2>

                <!-- 导航栏 -->
                <nav class="index-navbar">
                  <div class="bitcron_nav_container">
                    <ul class="site_nav" >
                      <li>
                        <a :href="siteUrl" @click="clearCache" style="cursor: pointer;user-select: none;">首页</a>
                      </li>
                      <li v-for="(item, index) in siteNavBar" :key="index">
                        <a href="javascript:void(0);" @click.stop="toRouter(item.path)" style="cursor: pointer;user-select: none;">{{item.name}}</a>
                      </li>
                      <!-- 自定义页面列表 -->
                      <li>
                        <!-- <a style="cursor: pointer;user-select: none;" class="pagelist">Pages</a> -->
                        <el-dropdown>
                          <el-button type="primary">
                            Pages<i class="el-icon-arrow-down el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                            v-for="(item, index) in pagesList" :key="index"
                            @click.native="toPages(item.page)"
                            >{{item.page}}</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </li>
                    </ul>
                  </div>
                </nav>

              </div>
            </header>
          </div>

          <!-- content -->
          <main class="contents">
            <!-- 文章列表 -->
            <ArticleList v-show="this.$route.name === 'index'" :disLoading="disLoading"/>
            <router-view name="index_view"></router-view>

          </main>
        </div>

        <!-- 聚合列表 -->
        <aside class="aside ">
          <!-- 文章 -->
          <div class="aside-left sidebar">
            <h3>随机文章</h3>
            <ul>
              <li style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
                  :title="asideArt.title"
                  v-for="(asideArt, index) in asideArticleList" :key="index"
                ><a :href="siteUrl+'/article?id='+asideArt._id" style="cursor: pointer;">{{asideArt.title}}</a>
              </li>
            </ul>	
            <div class="clear"></div>
          </div>

          <!-- 标签 -->
          <div class="aside-right sidebar">
            <h3>分门别类</h3>
            <ul>
              <li v-for="(asideCate, index) in asideCategoryList" :key="index">
                <a href="javascript:void(0);" @click.stop="toCategory(asideCate._id)" style="cursor: pointer;">{{asideCate.title}}<span> {{asideCate.count}}篇</span></a></li>
              </ul>
          </div>
        </aside>
      </main>
      <Footer></Footer>
      <div class="bg" :style="`background: url(${bg})`"></div>
    </section>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ArticleList from "../components/ArticleList.vue";
import anime from 'animejs'
import { snow } from '@/plugins/snow'
import { getBlogList } from '@/request/blogApi'
import { getPage } from '@/request/pageApi'
import { getCategoryList, getCategoryCount } from '@/request/categoryApi'


export default {
  name: "MainIndex",
  components: { Header, Footer, ArticleList },
  data() {
    return {
      // source
      tit_bg: require("@/assets/img/tit_bg.jpg"), // 个人卡片
      bg: require("@/assets/img/bg_main.jpg"),    // 背景图片
      // 主题设置
      siteUrl: 'http://localhost:8080',
      siteTitle: '霜冷の秘密基地',
      siteDescription: '幽暗让我们向往光明',
      siteNavBar: [   // 导航栏
        {
          name: '关于',
          path: "/about",
        },
        {
          name: '归档',
          path: "/archive",
        },
        {
          name: '友链',
          path: '/pages',
          page: 'flinks',
        },
        {
          name: '登陆',
          path: '/login',
        }
        
      ],
      pagesList: [
        {
          name: '时光',
          page: 'timer',
        },
      ],
      // 博客数据
      asideArticleList: [],   // 聚合文章列表
      asideCategoryList: [],  // 聚合分类列表
      isLoading: true,
      errMsg: '',
      isChangeNavbg: false,

      // 下雪插件
      snow: -1, // 1 开启，0关闭，这里-1表示初始值，不可改动

    };
  },
    methods: {
      toRouter(path) {
        this.$router.push({
          path: path
        })
      },
      // to pages
      toPages(page) {
        this.$router.push({
          path: `/pages/${page}`,
        })
      },
      // 前往分类
      toCategory(cid) {
        this.$router.push({
          path: `/category/${cid}`
        })
        // if(this.$route.path == `/category/${cid}`) {
        //   this.$router.go(0)
        // }
      },
      // 加载聚合列表
      loadAsideData() {
        const asideArtList = JSON.parse(sessionStorage.getItem('asideArtList'))
        const asideCateList = JSON.parse(sessionStorage.getItem('asideCateList'))
      
        if(asideArtList != null) {
          this.asideArticleList = asideArtList
        } else {
          // 随机文章
          for(let i = 0; i < 5; i++) {
              getBlogList({limit: 5, random: 'true', small: 'true'}).then(result=>{
                this.errMsg = ''
                this.asideArticleList.push(result.data)
                
                if (i==4) sessionStorage.setItem('asideArtList', JSON.stringify(this.asideArticleList))

              }).catch(err=>{
                this.errMsg = err
              })
          }
        }

        if (asideCateList != null) {
          this.asideCategoryList = asideCateList
        } else {
          // 分门别类
          getCategoryList({}).then(result=>{
            this.asideCategoryList = result.data
            this.asideCategoryList.forEach(asideCate => {
              // 获取分类数量
              getCategoryCount({cid: asideCate._id}).then(result=>{
                asideCate.count = result.data?result.data:0
              }).catch(err=>{
                this.errMsg = err
              })
              sessionStorage.setItem('asideCateList', JSON.stringify(this.asideCategoryList))
            });
          })
        }
        
 
      },
      // 加载自定义列表
      loadPages() {
        // const tempPages = JSON.parse(sessionStorage.getItem('_tempPages'))
        // console.log(tempPages)
        // if(tempPages != null) {
        //   return this.pagesList = tempPages
        // }

        getPage({}).then(result=>{
          this.pagesList = result.data

          sessionStorage.setItem('_tempPages', JSON.stringify(result.data))
        })

      },
      // 加载动画
      loading() {
        anime({
          targets: ['.svg-loading polygon'],
          points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
          baseFrequency: 0,
          scale: 1,
          loop: true,
          fill: "#57d3eb",
          stroke: "#b4f6f1",
          strokeOpacity: 0.9,
          direction: 'alternate',
          easing: 'easeInOutExpo'
        });
      },
      // 关闭加载动画
      disLoading() {
        anime({
          targets: '.loading',
          opacity: '0',
          duration: 2000,
          easing: 'easeInOutExpo'
        });
        setTimeout(() => {
          this.isLoading=false
        }, 2000);
      },
      // 清除缓存
      clearCache() {
        sessionStorage.clear()
        // localStorage.clear()
      },
      toTop(e) {
        document.documentElement.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        })
        if (document.documentElement.scrollTop > 100) {
          document.getElementById('toTop').classList.add('sm-hide')
        }
      },
    },
    watch: {
      // 加载数据后，解除loding状态
      asideArticleList() {
        if(this.errMsg==='' && this.asideArticleList.length < 1) {
          this.disLoading()
          this.loadAsideData()
        }else {
          this.errMsg===''
        }
      },
      snow(_, oldSnow) {
        if(oldSnow !== -1) {
          localStorage.setItem('_snow', this.snow)
          this.$router.go(0)
        }
      }

    },
    // 发送请求
    created() {
      this.loadAsideData()
      this.loadPages()
      // 存储snow状态
      if(localStorage.getItem('_snow')) {
        this.snow = localStorage.getItem('_snow')
      } else {
        localStorage.setItem('_snow', 1)
      }
    },
    mounted(){
      // 事件总线 - 关闭loading动画
      this.$bus.$on('disLoading', this.disLoading)

      // 监听鼠标滚轮事件
      window.addEventListener('mousewheel', (e)=>{
        const toTop = document.getElementById('toTop')
        if(document.documentElement.scrollTop < 20) toTop.classList.add('sm-hide')
        else toTop.classList.remove('sm-hide')
      })

      // 插件
      this.loading()
      snow()
    },
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 820px) {
  #wrapper {
    margin-top: 0 !important;
    padding-top: 0 !important;
    box-shadow: none !important;
  }
  .conBox {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
  .sidebar ul {
    flex-direction: column;
    margin-left: 0!important;
  }
  
}
@media screen and (max-width: 550px) {
  #header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30pt 5%;
    transition: all 0.6s ease;
  }
  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .index-navbar  {
    margin-top: 1.25em !important;
  }
  #toTop {
    display: none;
  }
  
}


// 自定义页面列表
.el-button--primary {
    color: var(--sm-main-color);
    background-color: transparent;
    border: none;
    border-top: 2px solid #555;
}
.el-dropdown-menu {
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  color: var(--sm-primary-color);
}
.el-dropdown-menu__item:hover {
  background: var(--sm-dark-color);
  color: var(--sm-main-color);
}
// 开关
.swtichPositon {
  position: absolute;
  opacity: 0;
  top: 10px;
  left: 10px;
  transition: .3s;
}
#header {
  position: relative;
}
#header:hover .swtichPositon {
  opacity: 1;
}
// 背景虚幻
.grass {
  // 背景虚化
    backdrop-filter: blur(2px);
    background-color: rgba(0,0,0,.1);
}

// 回到顶部
#toTop {
  height: 35px;
  width: 35px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: var(--sm-dark-color);
  box-shadow: 0 10px 20px 0 hsl(289deg 7% 84%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: pointer;
  span {
    color: #ccc;
  }
}

a {
  text-decoration: none;
}
#Snow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background: rgba(194,199,199,0.1);
    pointer-events: none;
}

.conBox {
  padding-top: 60px;
  transition: .3s;
}
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index:-1
}

// 文章列表包装
#wrapper {
  max-width: 820px;
  // min-height: 800px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  box-shadow: 0px 0 10px #000;
  margin: 0 auto;
  -webkit-transition: all 0.6s ease;
  transition: all 0.6s ease;

  // 背景图片
  .font-pic {
    background-image: url(@/assets/img/tit_font_bg.jpg)
  }

  // 标题信息
  header {
    margin: 0 auto;
    min-height: 140px;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 75pt;
    border-bottom: 10px solid rgb(26, 26, 26);

    // 图片铺满
    // background-size: cover;
    // background-position: center;

    // 标题
    h1 {
      font-weight: 700;
      line-height: 1em;
      color: #333;
      font-size: 1.8em;
      margin: 0.5em;
      margin-right: 0;
      text-align: right;
    }

    .effect_1 {
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 1.8em;
      background-size: cover;
      animation: 15s infinite linear animate;
      animation-direction: alternate;
    }
    .effect_1:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
    @keyframes animate {
      0% {
        background-position: 0;
      }
      100% {
        background-position: -1000px 0;
      }
    }

    // 个性标签
    h2 {
      font-size: .8em;
      color: white;
      font-weight: 400;
      margin: 0em 0 0.8em;
      float: right;
      line-height: 1em;

    }

    // 导航栏
    .index-navbar {
      width: 100%;
      margin-top: 3.5em;
      text-align: right;

    }
    // 导航
    .site_nav {
      padding-left: 0.3em;
      display: inline-block;
      list-style-type: none;
      list-style: square;
      a {color: #fff;}

      // 单个导航
      li {
        display: inline-block;
        padding-left: .3em;
        a {
          font-size: .8em;
          width: auto;
          display: block;
          padding: 0.5em 0.8em;
          line-height: 2em;
          border-top: 2px solid #555;
          transition: .5s;
        }

        a:hover {
          color: white;
          background-color: #555;
        }
      }
    }
  }

}

// 侧边栏
.aside {
  height: 160px;
  padding-top: 20px;
  max-width: 680px;
  margin: 0 auto;
  padding-left: 30px;

  // 底部文章列表
  .sidebar {
    float: left;

    // 文章列表标题
    h3 {
      margin: 1.2em 0 0.8em;
      font-weight: 400;
      font-size: 14px;
      color: var(--sm-main-color);
    }
    .clear {
      clear: both;
    }

    // item
    ul {
      list-style: square;
      margin-left: 1em;
      display: flex;
      flex-wrap: wrap;
    }
    ul > li {
      font-size: 9pt;
      float: left;
      width: 50%;
      display: block;
      flex-shrink: 0;

      a {
        list-style: square;
        margin-left: 1em;
        color: var(--sm-secondary-color);
      }
    }
  }
  .aside-left {
    width: 71%;
  }
  .aside-right {
    width: 29%;
  }
  
}

#loading {
    position: fixed !important;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    background: #000;
    opacity: 0.7;
    filter: alpha(opacity=70);
    display: flex;
    align-items: center;
    justify-content: center;

}
.blur {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -999;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(20px);
}


</style>