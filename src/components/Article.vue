<template>
  <section class="article-detail">
    <!-- 错误信息 -->
    <!-- <p>
    {{errMsg}}
    </p> -->
    <!-- 文章内容 -->
    <article class="content">
        <h1 style="margin: 1em 0">{{article.title}}</h1>
        <!-- 文章元信息 -->
        <div class="meta">
            <span class="item">
                <i class="iconfont icon-calendar"></i>
                <time > {{(article.createAt)}}</time>
            </span>
            <span class="item">
                <i class="iconfont icon-tag"></i>
                <a href="#" v-for="item in article.category" :key="item._id">
                    {{item.title}}
                </a>
            </span>
            <span class="item">
                <i class="iconfont icon-message "></i>
                <a href="#"> {{article.comments?article.comments:0}} 评</a>
            </span>
            <span class="item"><i class="iconfont icon-eye"></i> {{article.hot}} 度</span>
        </div>
        <!-- post data -->
        <div class="post">
            <p>{{article.content}}</p>
        </div>
    </article>
    <!-- 换页 -->
    <section class="pager">
        <a class="pre" 
        @click="toRouter(preArt._id)" 
        v-show="preArt._id">{{preArt.title}}</a>
        <a class="next" 
        @click="toRouter(nextArt._id)" 
        v-show="nextArt._id">{{nextArt.title}}</a>
        <!-- <a class="pre" 
        :href="`${siteUrl}/article?id=${preArt._id}`" 
        v-if="preArt._id">{{preArt.title}}</a>
        <a class="next" 
        :href="`${siteUrl}/article?id=${nextArt._id}`" 
        v-if="nextArt._id">{{nextArt.title}}</a> -->
    </section>
  </section>
</template>

<script>
import { getArticleById, getPreById, getNextById } from '@/request/blogApi'
export default {
    name: 'Article',
    data() {
        return {
            siteUrl: 'http://localhost:8080',
            article: {},
            errMsg: '',
            nextArt: '',
            preArt: '',
            isReloadData: true, //局部刷新标识
        }
    },
    watch: {
        '$route'(to,from){
            this.onLoad()
            this.bindNextPre()
        } 
    },
    methods: {
        toRouter(id) {
            this.$router.push({
                path: '/article?id=' + id
            })
        },
        onLoad() {
            // 获取文章详情
            getArticleById({id: this.$route.query.id}).then(result=>{
                this.article = result.data
                // 时间格式化
                this.article.createAt = this.article.createAt.slice(0,10)
            }).catch(err=>{
                this.article = {}
                this.errMsg = err
            })
            
        },
        // 分页参数
        bindNextPre() {
            getPreById({id: this.$route.query.id}).then(result=>{
                this.preArt = result.data // 获取id，title，以及是否存在上一篇文章
                if(result.data.title && result.data.title.length > 7) {
                    this.preArt.title = result.data.title.slice(0, 7)+".."
                }
            }).catch(err=>{
                this.errMsg = err
            })
            getNextById({id: this.$route.query.id}).then(result=>{
                this.nextArt = result.data  // 获取id，title，以及是否存在下一篇文章
                if(result.data.title && result.data.title.length > 15) {
                    this.nextArt.title = result.data.title.slice(0, 15)+".."
                }
            }).catch(err=>{
                this.errMsg = err
            })
            
        },
    },
    mounted() {
        this.onLoad()
        this.bindNextPre()
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
        transition: .3s;
    }
    a:hover {
        color: rgb(91, 91, 91);
        background: #eee;
        cursor: pointer;
        user-select: none;
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