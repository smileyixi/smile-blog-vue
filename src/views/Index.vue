<template>
  <el-container style="margin: 0; padding: 0">
    <Header></Header>
    <el-main>
      <div class="wrapper">
        <!-- headerBar -->
        <header :style="`background-image: url(${tit_bg})`">
          <div class="description" style="float: right">
            <a :href="siteUrl" style="cursor: pointer;">
              <!-- 博客标题 -->
              <h1 class="effect_1" :style="`background-image: url(${tit_font_bg})`" >
                {{siteTitle}}
              </h1>
            </a>
            
            <!-- 个性标签 -->
            <h2>{{siteDescription}}</h2>

            <!-- 导航栏 -->
            <nav>
              <div class="bitcron_nav_container">
                <ul class="site_nav" >
                  <li v-for="(item, index) in siteNavBar" :key="index">
                    <a :href="item.href" class="selected active nav__item" style="cursor: pointer;user-select: none;">{{item.name}}</a>
                  </li>
                </ul>
              </div>
            </nav>

          </div>
        </header>

        <!-- content -->
        <main class="content">
          <!-- 文章列表 -->
          <ArticleList></ArticleList>
          
          <!-- 底部列表 -->
          <section class="list-page">
            <div class="clear"></div>
          </section>
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
              ><a :href="asideArt.url" style="cursor: pointer;">{{asideArt.title}}</a>
            </li>
          </ul>	
          <div class="clear"></div>
        </div>

        <!-- 标签 -->
        <div class="aside-right sidebar">
          <h3>分门别类</h3>
          <ul>
            <li v-for="(asideCate, index) in asideCategoryList" :key="index">
              <a :href="asideCate.url" style="cursor: pointer;">{{asideCate.title}}<span> {{asideCate.count}}篇</span></a></li>
            </ul>
        </div>
      </aside>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ArticleList from "../components/ArticleList.vue";

export default {
  name: "MainIndex",
  components: { Header, Footer, ArticleList },
  data() {
    return {
      // source
      tit_bg: require("@/assets/img/tit_bg.jpg"),
      photo: require("@/assets/img/photo.png"),
      tit_font_bg: require("@/assets/img/tit_font_bg.jpg"),
      // 主题设置
      siteUrl: 'http://127.0.0.1:8080',
      siteTitle: '霜冷的秘密基地',
      siteDescription: '幽暗让我们向往光明',
      siteNavBar: [   // 导航栏
        {
          name: '首页',
          href: this.siteUrl,
        },
        {
          name: '关于',
          href: "http://localhost:8080/about",
        },
        {
          name: '归档',
          href: "http://localhost:8080/archive",
        },
        {
          name: '订阅',
          href: this.siteUrl,
        }
        
      ],
      // 博客数据
      
      asideArticleList: [ // 聚合文章列表
        {
          title: '欢迎使用 Smile-Blog',
          url: 'http://smilesl.com/index.php/archives/1/',
        },
        {
          title: '欢迎使用 Smile-Blog',
          url: 'http://smilesl.com/index.php/archives/2/',
        }
      ],
      asideCategoryList: [  // 聚合分类列表
        {
          title: '默认分类',
          url: 'http://smilesl.com/index.php/category/default/',
          count: 1
        },
        {
          title: '日常',
          url: 'http://smilesl.com/index.php/category/daily/',
          count: 1
        },
        {
          title: '测试',
          url: 'http://smilesl.com/index.php/category/test/',
          count: 1
        }
      ],

    };
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.wrapper {
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
        }

        a:hover {
          color: white;
          background-color: #555;
        }
      }
    }
  }

  // 文章内容
  .content {
    

    // 底部列表块
    .list-page {
      padding: 30px 20px;
      font-size: .875em;
      margin: 0 30px;
      .clear {
        clear: both;
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
    }
    ul > li {
      font-size: 9pt;
      float: left;
      width: 50%;
      display: block;

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

</style>