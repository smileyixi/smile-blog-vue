<template>
  <section class="article-list">
    <article style="margin-top: 50px;" class="article" 
    v-for="(art, index) in articleList" :key="index">
      <!-- 标题 -->
      <h2 style="margin: 1em 0">
        <a @click.stop="toRouter(art.id)" class="article_title">{{art.title}}</a>
        <span class="hot">{{art.hot}}度</span>
      </h2>

      <!-- 文章节选 -->
      <div class="excerpt">
        <p >{{art.excerpt}}</p>
      </div>

      <!-- 文章信息 -->
      <div class="meta">
        <span class="item">
          <i class="iconfont icon-calendar"></i>
          <time :datetime="art.meta.time"> {{art.meta.time}}</time>
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
export default {
    name: 'ArticleList',
    data() {
      return {
        articleList: [  // 文章列表
          {
            id: 1,
            title: '欢迎使用 Smile-Blog',
            excerpt: '东风夜放花千树。更吹落、星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞...',
            hot: 2,
            meta: {
              time: '2022.07.16',
              tags: ['默认分类', '日常', '测试'],
              comments: 1
            }
          },
          {
            id: 2,
            title: '簌簌冰上花，耀耀灿金华',
            excerpt: '落霞与孤鹜齐飞，秋水共长天一色',
            hot: 2,
            meta: {
              time: '2022.07.16',
              tags: ['默认分类', '日常'],
              comments: 1
            }
          }
        ],
      }
    },
    methods: {
      toRouter(id){
        this.$router.push({
          path: "/archive",
          query: {
            id: id
          }
        })
      }
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