<template>
  <section class="article-detail">
    <!-- 文章内容 -->
    <article class="content">
        <h1 style="margin: 1em 0">{{article.title}}</h1>
        <!-- 文章元信息 -->
        <div class="meta">
            <span class="item">
                <i class="iconfont icon-calendar"></i>
                <time :datetime="article.meta.time"> {{article.meta.time}}</time>
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
            <p>{{article.excerpt}}</p>
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
export default {
    name: 'Archive',
    data() {
        return {
            article: {
                title: '欢迎使用 Smile-Blog',
                url: '#',
                excerpt: '东风夜放花千树。更吹落、星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞...',
                hot: 2,
                meta: {
                    time: '2022.07.16',
                    tags: ['默认分类', '日常', '测试'],
                    comments: 1
                }
            },


        }
    },
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