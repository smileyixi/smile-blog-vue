<template>
  <section class="article-detail">
    <!-- 错误信息 -->
    <p>
    {{errMsg}}
    </p>
    <!-- 文章内容 -->
    <article class="content">
        <h1 style="margin: 1em 0">{{article.title}}</h1>
        <!-- 文章元信息 -->
        <div class="meta">
            <span class="item">
                <i class="iconfont icon-calendar"></i>
                <time > {{article.meta.createAt}}</time>
            </span>
            <span class="item">
                <i class="iconfont icon-tag"></i>
                <a href="#" v-for="(item, index) in article.meta.tags" :key="index">
                    {{item}}
                </a>
            </span>
            <span class="item">
                <i class="iconfont icon-message "></i>
                <a href="#"> {{article.meta.comments}} 评</a>
            </span>
        </div>
        <!-- post data -->
        <div class="post">
            <p>{{article.content}}</p>
        </div>
    </article>
    <!-- 换页 -->
    <section class="pager">
        <a class="pre" href="http://localhost:8080/archive/1/">上一页</a>
        <a class="next" href="http://localhost:8080/archive/2/">下一页</a>
    </section>
  </section>
</template>

<script>
import { getArticleById } from '@/request/api'
export default {
    name: 'Archive',
    data() {
        return {
            article: {},
            errMsg: ''
        }
    },
    methods: {
        onLoad() {
            getArticleById({id: this.$route.query.id}).then(result=>{
                this.article = result
            }).catch(err=>{
                this.article = ''
                this.errMsg = err
            })
            
        }
    },
    mounted() {
        this.onLoad()
    }

}
</script>

<style lang="less" scoped>
// 文章元信息
.meta {
    color: #bbb;
    font-size: .8em;
    padding: 20px 0 40px;

    a {
    text-decoration: none;
    color: #bbbbbb;
    }
    .item {
    margin-right: 10px;
    }
}

// 文章内容
.content {
    font-size: .875em;
    margin-top: 50px;
    h1 {
        font-size: 1.4em;
        padding: 0 5%;
        margin: 1em 0 0.8em;
        text-align: left;
    }
    .meta {
        padding: 20px 0 40px 5%;
    }
    .post p {
        padding: 0 5%;
        color: #333;
    }
}

// 换页
.pager {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    text-align: center;
    overflow: auto;
    margin: 2em 0 0;
    font-size: .875em;

    a {
        padding: 20px 0;
        display: inline-block;
        color: #999999;
        text-decoration: none;
        line-height: 1em;
        text-align: center;
        transition: .5s;
    }
    a:hover {
        background: #eee;
    }
    .pre {
        float: left;
        text-align: left;
        width: 45%;
        padding-left: 5%;
    }
    .pre::before {
        content: "‹";
        font-size: 1.3em;
        padding-right: 5px;
        font-weight: 700;
        line-height: 1em;
    }
    .next {
        float: right;
        padding-right: 5%;
        text-align: right;
        width: 45%;
    }
    .next::after {
        content: "›";
        font-size: 1.3em;
        padding-left: 5px;
        font-weight: 700;
        line-height: 1em;
    }
}
</style>