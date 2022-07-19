<template>
  <section class="article-list">
    <!-- 错误信息 -->
      <p>
        {{errMsg}}
      </p>
    <article style="margin-top: 50px;" class="article" 
    v-for="art in articleList" :key="art._id">
      <!-- 标题 -->
      <h2 style="margin: 1em 0">
        <a @click="toRouter(art._id)" class="article_title">{{art.title}}</a>
        <span class="hot">{{art.hot}}度</span>
      </h2>

      <!-- 文章节选 -->
      <div class="excerpt">
        <p >{{(art.content).slice(0, 48)}}<span>{{art.content.length>48?'...':''}}</span></p>
      </div>

      <!-- 文章信息 -->
      <div class="meta">
        <span class="item">
          <i class="iconfont icon-calendar"></i>
          <time :datetime="art.meta.createAt"> {{art.meta.createAt}}</time>
        </span>
        <span class="item">
          <i class="iconfont icon-tag"></i>
          <a href="#" v-for="(item, index) in art.meta.tags" :key="index">
            {{item}}
          </a>
        </span>
        <span class="item">
          <i class="iconfont icon-message "></i>
          <a href="#"> {{art.meta.comments}} 评</a>
        </span>
      </div>
    </article>
  </section>
</template>

<script>
import { getBlogList } from '@/request/api'

export default {
    name: 'ArticleList',
    data() {
      return {
        articleList: [],
        timer: '',
        errMsg: ''
      }
    },
    methods: {
      toRouter(id){
        this.$router.push({
          name: "archive",
          query: {
            id: id
          }
        })
      },

      // 加载数据
      onLoad() {
        getBlogList({}).then(result=>{
          this.articleList = result
        }).catch(err=>{
          // 请求错误
          this.errMsg = err
        })
      }
    },
    mounted() {
      this.onLoad()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
}
</script>

<style lang="less" scoped>
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
</style>