<template>
  <div class="topbar">
    <section class="article-list" ref="articleList">
      <el-skeleton :rows="4" animated v-if="errMsg !== ''" class="skeleton"/>
      <el-skeleton :rows="5" animated v-if="errMsg !== ''" class="skeleton"/>
      <article style="margin-top: 50px;" class="article" 
      v-for="(article, index) in articleList" :key="index">
        <!-- 标题 -->
        <h2 style="margin: 1em 0">
          <a href="javascript:void(0)" @click="toRouter(article._id)" 
          class="article_title">{{article.title}}</a>
          <span class="hot">{{article.hot}}度</span>
        </h2>

        <!-- 文章节选 -->
        <div class="excerpt">
          <p >{{(article.content).slice(0, 48)}}<span>{{article.content.length>48?'...':''}}</span></p>
        </div>

        <!-- 文章信息 -->
        <div class="meta">
          <span class="item">
            <i class="iconfont icon-calendar"></i>
            <time :datetime="article.createAt"> {{article.createAt.slice(0, 10)}}</time>
          </span>
          <span class="item">
            <i class="iconfont icon-tag"></i>
            <a href="javascript: void(0)" @click="toCategory(article.cid)" v-for="item in article.category" :key="item._id">
              {{item.title}}
            </a>
          </span>
          <span class="item">
            <i class="iconfont icon-message "></i>
            <a href="javascript: void(0)" @click="toRouter(article._id, true)" > {{article.comments?article.comments:0}} 评</a>
          </span>
        </div>
      </article>
    </section>
    <!-- 底部分页 -->
    <section class="list-page">
      <el-pagination class="list-page-2"
        background
        layout="prev, pager, next"
        :page-size="6"
        :total="total"
        :current-page.sync="pageNum">
      </el-pagination>
    </section>
  </div>
</template>

<script>
import { getBlogList, getArticleCount } from '@/request/blogApi'
import { getCommnetCount } from '@/request/commentApi'
import anime from 'animejs'

export default {
    name: 'ArticleList',
    data() {
      return {
        siteUrl: 'http://localhost:8080',
        articleList: [],
        errMsg: '',
        next: false,
        pre: false,
        loopLoadDataTimer: '',
        pageNum: parseInt(this.$route.query.page||1),
        total: 0
      }
    },
    methods: {
      toRouter(id, toCommentPosition){
        this.$router.push({
          path: "/article?id="+id
        })
        if(toCommentPosition) {
          setTimeout(() => {
            document.getElementsByClassName('adminui')[0].scrollIntoView({
              block: 'start',
              behavior: 'smooth'
            })
          }, 200);
        }
      },
      // 前往分类
      toCategory(cid) {
        this.$router.push({
          path: `/category/${cid}`
        })
      },
      // 加载数据
      dataLoad(pageNum) {
        let page = this.$route.query.page?this.$route.query.page:1
        if (pageNum) page = pageNum
        var skip = 6*(parseInt(page)-1)
        const tempArtList =JSON.parse(sessionStorage.getItem(`articleList_${page}`))

        if (tempArtList != null) {
          // 判断最后一页是否更新的文章
          return this.articleList=tempArtList
        }

        getBlogList({limit: 6, skip}).then(result=>{
          this.articleList = result = result.data
          
          sessionStorage.setItem(`articleList_${page}`, JSON.stringify(this.articleList) )

          // 获取评论数量
          this.articleList.forEach(i => {
            getCommnetCount({aid: i._id}).then(result=>{
              this.$set(i, 'comments', result.data)
            })
          });
        }).catch(err=>{
          this.errMsg = err
          this.loopLoadDataTimer = setTimeout(() => {
            if (this.errMsg!=='') this.dataLoad()
          }, 3000);
        })

      },
      // 加载文章总数
      artCount() {
        getArticleCount({}).then(count=>{
          this.total = parseInt(count)
        })
      },
    },
    watch: {
      articleList() {
        if(this.errMsg==='' || this.articleList.length > 1) {
          this.$bus.$emit('disLoading')
          clearTimeout(this.loopLoadDataTimer)
          this.errMsg = ''
        }
        
      },
      // 当前页发生变化时加载文章
      pageNum(newPage, oldPage) {
        this.$refs.articleList.style.height='1000px'
        this.dataLoad(newPage)
        if(newPage != oldPage) {
          this.$func.scrollInto('start')
          this.$refs.articleList.style.height='100%'
        }
      }
    },
    created() {
      this.dataLoad()
      this.artCount()
    }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.skeleton {
  margin-top: 40px;
}


// 文章列表块
.article-list {
  padding: 0 20px;
  margin: 0 30px;
  overflow: hidden;

  // 文章标题
  .article_title {
    text-decoration: none;
    color: var(--sm-title-color);
    font-size: .8em;
    cursor: pointer;

    &::before {
      content: "# ";
      color: var(--sm-viceicon-color);
    }

    
  }
  
  // 热度span
  .hot {
    font-size: .5em;
    margin-left: 0.3em;
    color: var(--sm-secondary-color);
    font-weight: 400;
  }

  // 文章节选
  .excerpt {
    p {
      color: var(--sm-primary-color);
      letter-spacing: .2px;
      line-height: 1em;
      text-align: left;
      font-size: .875em;
      margin-bottom: 1em;
    }
  }

  // 文章元信息
  .meta {
    color: var(--sm-secondary-color);
    font-size: .8em;
    padding: 20px 0 40px;
    border-bottom: 1px solid #f3f3f3;

    a {
      text-decoration: none;
      color: var(--sm-secondary-color);
    }
    .item {
      margin-right: 10px;
    }
  }
}

// 底部列表块
.list-page {
  padding: 30px 20px;
  font-size: .875em;
  margin: 0 30px;
  .clear {
    clear: both;
  }
  // .next,.prev {
  //   color: #999;
  //   cursor: pointer;
  // }
  // .next:hover,
  // .prev:hover {
  //   color: #333;
  // }
  // .next {float: right;}
  // .prev {float: left;}
}

.list-page-2 {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}


</style>