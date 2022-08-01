<template>
  <div>
    <section class="article-list">
      <article style="margin-top: 50px;" class="article" 
      v-for="article in articleList" :key="article._id">
        <!-- 标题 -->
        <h2 style="margin: 1em 0">
          <a @click="toRouter(article._id)" class="article_title">{{article.title}}</a>
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
            <a href="javascript: void(0)" @click="toRouter(article._id, true)"> {{article.comments?article.comments:0}} 评</a>
          </span>
        </div>
      </article>
    </section>
    <!-- 底部分页 -->
    <section class="list-page" v-if="this.$route.path == '/search'">
      <a href="javascript:void(0);" class="next" @click.stop="nextPage" v-show="next">下一页<i class="iconfont icon-right"></i></a>
      <a href="javascript:void(0);" class="prev" @click.stop="prePage" v-show="pre"><i class="iconfont icon-left"></i>上一页</a>
      <div class="clear"></div>
    </section>
  </div>
</template>

<script>
import { getBlogList } from '@/request/blogApi'
import { getCommnetCount } from '@/request/commentApi'

export default {
    name: 'ArticleList',
    data() {
      return {
        articleList: [],
        errMsg: '',
        next: true,
        pre: true,
        loopLoadDataTimer: '',
      }
    },
    methods: {
      toRouter(id){
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
      toPage(page) {
        this.$router.push({
          path: `/search?keyword=${this.$route.query.keyword}&page=${page}`
        })
      },
      // 加载数据
      dataLoad() {
        const page = this.$route.query.page?this.$route.query.page:1
        var keyword = this.$route.query.keyword?this.$route.query.keyword:''
        var skip = 5*(parseInt(page)-1)
        getBlogList({limit: 6, skip, keyword}).then(result=>{
          var next = sessionStorage.getItem('nextSearch')
          var pre = sessionStorage.getItem('preSearch')
          var page = parseInt(this.$route.query.page)
          this.articleList = result = result.data
          // 无下一页
          if (result.length <= 5) {
            this.errMsg = ''
            next = pre = false
            if(page > 1) {
              pre = true
            }
          }
          // 有下一页
          else if (result.length > 5) {
            this.articleList = result.slice(0,5)
            // 主页
            if (!page || page==1) {
              next = true
              pre = false
            }
            // 不是第一页
            else if(page>1) {
              this.loadNext(skip+5)
              // 判断下一页有数据则可点击下一页
              if (JSON.parse(sessionStorage.getItem('tempSearchArticleList')).length > 0) next = true
              else next = false
              pre = true
            }
          }
          this.next = next
          this.pre = pre
          sessionStorage.setItem('nextSearch', this.next)
          sessionStorage.setItem('preSearch', this.pre)

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

      // 加载下一次的数据
      loadNext() {
        const page = this.$route.query.page?this.$route.query.page:1
        var keyword = this.$route.query.keyword?this.$route.query.keyword:''
        var skip = 5*(parseInt(page)-1)
        // 请求6条数据
        getBlogList({limit: 6, skip, keyword}).then(result=>{
          sessionStorage.setItem('tempSearchArticleList', JSON.stringify(result.data))
        }).catch(err=>{
          // 请求错误
          this.errMsg = err
        })
      },
      nextPage() {
        const page = this.$route.query.page?this.$route.query.page:1
        this.toPage(parseInt(page)+1)
      },
      prePage() {
        const page = this.$route.query.page?this.$route.query.page:1
        this.toPage(parseInt(page)-1)
      }
    },
    watch: {
      articleList() {
        if(this.errMsg==='' || this.articleList.length > 1) {
          this.$bus.$emit('disLoading')
          clearTimeout(this.loopLoadDataTimer)
          this.errMsg = ''
        }
      },
      '$route'(to,from){
        this.dataLoad()
        this.loadNext()
        window.scrollTo(0, 0); 
      } 
    },
    mounted() {
      this.dataLoad()
      this.loadNext()
    },
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
// 文章列表块
.article-list {
  padding: 0 20px;
  margin: 0 30px;

  // 文章标题
  .article_title {
    text-decoration: none;
    color: #1f1f1f;
    font-size: .8em;
    cursor: pointer;

    &::before {
      content: "# ";
      color: #555;
    }
  }
  
  // 热度span
  .hot {
    font-size: .5em;
    margin-left: 0.3em;
    color: #bbb;
    font-weight: 400;
  }

  // 文章节选
  .excerpt {
    p {
      color: #333;
      letter-spacing: .2px;
      line-height: 1em;
      text-align: left;
      font-size: .875em;
      margin-bottom: 1em;
    }
  }

  // 文章元信息
  .meta {
    color: #bbb;
    font-size: .8em;
    padding: 20px 0 40px;
    border-bottom: 1px solid #f3f3f3;

    a {
      text-decoration: none;
      color: #bbbbbb;
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
  .next,.prev {
    color: #999;
    cursor: pointer;
  }
  .next:hover,
  .prev:hover {
    color: #333;
  }
  .next {float: right;}
  .prev {float: left;}
}


</style>