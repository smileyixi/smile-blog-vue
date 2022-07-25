<template>
  <section style="margin: 0; padding: 0;" class="conBox">
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
    <Header></Header>
    
    <main>
      <div class="wrapper" id="wrapper">
        <!-- headerBar -->
        <header :style="`background-image: url(${tit_bg})`" id="header">
          <div class="description" style="float: right">
            <a :href="siteUrl" style="cursor: pointer;">
              <!-- 博客标题 -->
              <h1 class="effect_1" :style="`background-image: url(${tit_font_bg})`" >
                {{siteTitle}}
              </h1>
            </a>
            
            <!-- 个性标签 -->
            <h2 class="autograph">{{siteDescription}}</h2>

            <!-- 导航栏 -->
            <nav>
              <div class="bitcron_nav_container">
                <ul class="site_nav" >
                  <li>
                    <a :href="siteUrl" @click="clearCache" style="cursor: pointer;user-select: none;">首页</a>
                  </li>
                  <li v-for="(item, index) in siteNavBar" :key="index">
                    <a href="javascript:void(0);" @click.stop="toPages(item.path)" style="cursor: pointer;user-select: none;">{{item.name}}</a>
                  </li>
                </ul>
              </div>
            </nav>

          </div>
        </header>

        <!-- content -->
        <main class="contents">
          <!-- 文章列表 -->
          <ArticleList v-show="this.$route.path == '/'" :disLoading="disLoading"/>
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
  </section>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ArticleList from "../components/ArticleList.vue";
import { getBlogList } from '@/request/blogApi'
import { getCategoryList, getCategoryCount } from '@/request/categoryApi'
import anime from 'animejs'
import { snow } from '@/plugins/snow'

export default {
  name: "MainIndex",
  components: { Header, Footer, ArticleList },
  data() {
    return {
      // source
      tit_bg: require("@/assets/img/tit_bg.jpg"),
      photo: require("@/assets/img/photo.png"),
      tit_font_bg: require("@/assets/img/tit_font_bg.jpg"),
      bg: require("@/assets/img/bg.png"),
      // 主题设置
      siteUrl: 'http://127.0.0.1:8080',
      siteTitle: '霜冷の秘密基地',
      siteDescription: '幽暗让我们向往光明',
      siteNavBar: [   // 导航栏
        {
          name: '关于',
          path: "about",
        },
        {
          name: '归档',
          path: "archive",
        },
        {
          name: '订阅',
          path: '/',
        }
        
      ],
      // 博客数据
      asideArticleList: [], // 聚合文章列表
      asideCategoryList: [  // 聚合分类列表
        {
          title: 'category',
          url: '#',
          count: 0
        }
      ],
      isLoading: true,
      errMsg: '',

    };
  },
    methods: {
      // to pages
      toPages(path) {
        this.$router.push({
          name: path
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
      loadData() {
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
        }, 1200);
      },
      // 清除缓存
      clearCache() {
        sessionStorage.clear()
      },
    },
    watch: {
      // 加载数据后，解除loding状态
      asideArticleList() {
        if(this.errMsg==='' && this.asideArticleList.length < 1) {
          this.disLoading()
          this.loadData()
        }else {
          this.errMsg===''
        }
      },
    },
    mounted(){
      const asideArtList = JSON.parse(sessionStorage.getItem('asideArtList'))
      const asideCateList = JSON.parse(sessionStorage.getItem('asideCateList'))
      
      // 本地不存在加载
      if((!asideArtList || asideArtList.length<1) || (!asideCateList || asideCateList.length<1)) {
        this.loadData()
      }
      else { // 存在从本地加载数据
        this.asideArticleList = asideArtList
        this.asideCategoryList = asideCateList
      } 
      this.$bus.$on('disLoading', this.disLoading)

      // 监听刷新事件,刷新缓存
       window.addEventListener("beforeunload", e => {
          this.clearCache();
      });

      // 插件开关
      snow(true)
      this.loading()
      
    }
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 700px) {
  #wrapper {
    margin-top: 0 !important;
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
#wrapper {
  max-width: 820px;
  background: #fff;
  margin: 0 auto;
  margin-top: 60px;
  box-shadow: 0 10px 20px 0 hsl(0deg 0% 93% / 86%);
  -webkit-transition: all 0.6s ease;
  transition: all 0.6s ease;

  // 标题信息
  header {
    margin: 0 auto;
    min-height: 140px;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 75pt;
    // background-size: cover;

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
      color: #bbb;
      font-weight: 400;
      margin: 0em 0 0.8em;
      float: right;
      line-height: 1em;

    }

    // 导航栏
    nav {
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
      color: #bbb;

      // 单个导航
      li {
        display: inline-block;
        padding-left: .3em;
        a {
          font-size: .8em;
          width: auto;
          display: block;
          padding: 0.5em 0.8em;
          color: rgb(201, 201, 201);
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

.aside {
  overflow: auto;
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
        color: #999;
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

// loading
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