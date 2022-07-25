<template>
  <section class="article-detail">
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
        <a class="pre" href="javascript:void(0);"
        @click="toRouter(preArt._id)" 
        v-show="preArt._id">{{preArt.title}}</a>
        <a class="next" href="javascript:void(0);"
        @click="toRouter(nextArt._id)" 
        v-show="nextArt._id">{{nextArt.title}}</a>
    </section>
    <!-- comments -->
    <div class="comments-bg">
        <div class="comments">
            <div class="wrap">
                <div class="adminui">
                    <!-- 基本信息 -->
                    <div class="sheader">
                        <input type="text" class="comInput" placeholder="昵称">
                        <input type="text" class="comInput" placeholder="邮箱">
                        <input type="text" class="comInput" placeholder="网址(http://)">
                    </div>
                    <!-- 编辑评论 -->
                    <div class="sedit">
                        <textarea name="text" id="sediter" cols="30" rows="10"
                        placeholder="说点什么好呢？"
                        ></textarea>
                    </div>
                    <!-- emoji-->
                    <div class="srow">
                        <div class="emoQAQ">
                            <div class="emoQAQ-logo">
                                <span>
                                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16172" width="22" height="22">
                                    <path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z" p-id="16173"></path><path d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z" p-id="16174"></path><path d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z" p-id="16175"></path><path d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z" p-id="16176"></path>
                                </svg>
                                </span>
                            </div>
                            <div class="emoQAQ-box">
                                <ul class="QWQ-items">
                                    <li class="OwO-item" title="目瞪口呆">OωO</li>
                                    <li class="OwO-item" title="Hi">|´・ω・)ノ</li>
                                    <li class="OwO-item" title="开心">ヾ(≧∇≦*)ゝ</li>
                                    <li class="OwO-item" title="星星眼">(☆ω☆)</li>
                                    <li class="OwO-item" title="掀桌">（╯‵□′）╯︵┴─┴</li>
                                    <li class="OwO-item" title="流口水">￣﹃￣</li>
                                    <li class="OwO-item" title="捂脸">(/ω＼)</li>
                                    <li class="OwO-item" title="给跪">∠( ᐛ 」∠)＿</li>
                                    <li class="OwO-item" title="Hi">(๑•̀ㅁ•́ฅ)</li>
                                    <li class="OwO-item" title="斜眼">→_→</li>
                                    <li class="OwO-item" title="加油">୧(๑•̀⌄•́๑)૭</li>
                                    <li class="OwO-item" title="有木有WiFi">٩(ˊᗜˋ*)و</li>
                                    <li class="OwO-item" title="前方高能预警">(ノ°ο°)ノ</li>
                                    <li class="OwO-item" title="我从未见过如此厚颜无耻之人">(´இ皿இ｀)</li>
                                    <li class="OwO-item" title="吓死宝宝惹">⌇●﹏●⌇</li>
                                    <li class="OwO-item" title="已阅留爪">(ฅ´ω`ฅ)</li>
                                    <li class="OwO-item" title="去吧大师球">(╯°A°)╯︵○○○</li>
                                    <li class="OwO-item" title="太萌惹">φ(￣∇￣o)</li>
                                    <li class="OwO-item" title="咦咦咦">ヾ(´･ ･｀｡)ノ"</li>
                                    <li class="OwO-item" title="气呼呼">( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃</li>
                                    <li class="OwO-item" title="我受到了惊吓">(ó﹏ò｡)</li>
                                    <li class="OwO-item" title="什么鬼">Σ(っ °Д °;)っ</li>
                                    <li class="OwO-item" title="摸摸头">( ,,´･ω･)ﾉ"(´っω･｀｡)</li>
                                    <li class="OwO-item" title="无奈">╮(╯▽╰)╭ </li>
                                    <li class="OwO-item" title="脸红">o(*////▽////*)q </li>
                                    <li class="OwO-item" title="">＞﹏＜</li>
                                    <li class="OwO-item" title="">( ๑´•ω•) "(ㆆᴗㆆ)</li>
                                    <li class="OwO-item" title="">(｡•ˇ‸ˇ•｡)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- post -->
                    <div class="srow btn-srow">
                        <div class="s-30">
                            <a alt="Markdown is supported" href="https://guides.github.com/features/mastering-markdown/" class="vicon" target="_blank" style="cursor: url(&quot;http://smilesl.com/usr/plugins/AliceStyle/static/mouse/dew/link.cur&quot;), pointer;"><svg class="markdown" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></a>
                        </div>
                        <div class="s-70">
                            <button>提交</button>
                        </div>
                    </div>
                    <!-- 评论展示 -->
                    <div class="sempty">
                        现在还没有评论呢～
                    </div>
                </div>
            </div>
        </div>
    </div>

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
            const art = JSON.parse(sessionStorage.getItem(`art_${this.$route.query.id}`))
            if(!art) this.onLoad()
            else this.article = art
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
                sessionStorage.setItem(`art_${this.$route.query.id}`, JSON.stringify(this.article))
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
        const art = JSON.parse(sessionStorage.getItem(`art_${this.$route.query.id}`))
        if(!art) {
            console.log(art)
            this.onLoad()
        }
        else this.article = art
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


// 评论
.comments-bg {
    background-color: #f7f7f7;

    .comments {
        max-width: 738px;
        margin: 0 auto;
        padding-top: 1.875rem;
        font-size: 16px;
        text-align: left;
        
        // 包裹面板
        .wrap {
            border-radius: 4px;
            margin-bottom: 10px;
            overflow: hidden;
            position: relative;
            padding: 10px;
            
            // 评论面板UI
            .adminui {
                max-width: 738px;
                // 信息录入
                .sheader {
                    width: 100%;
                    display: flex;
                    justify-content: space-evenly;

                    .comInput {
                        width: 32.5%;
                        background: 0 0;
                        padding: 10px 5px;
                        outline:none;
                        resize: none;
                        border: none;
                        border-bottom: 1px dashed #dedede;
                        color: #b2b2b5;
                    }
                    .comInput:focus {
                        border-bottom: 1px dashed rgb(77, 157, 225);
                    }
                }

                // 编辑评论
                .sedit {
                    width: 100%;
                    padding-top: 10px;
                    #sediter {
                        color: #b2b2b5;
                        width: 100%;
                        min-height: 8.75em;
                        font-size: .875em;
                        background: 0 0;
                        resize: vertical;
                        border: none;
                        outline: none;
                        padding: 10px 5px;
                    }
                    #sediter:focus {
                        border-bottom: 1px solid #e9e9e9;
                    }
                }

                // 表情行
                .srow {
                    width: 100%;
                    font-size: 12px;
                    padding: 20px 0;
                    display: flex;
                    justify-content: flex-end;
                    svg {
                        fill: #b2b2b5;
                    }
                    svg:hover {
                        fill: #767678;
                    }

                    .emoQAQ {
                        margin-top: 20px;
                        width: 100%;
                        display: flex;
                        .emoQAQ-logo {
                            position: relative;
                            display: inline-block;
                            color: #888;
                            border-radius: 4px;
                            font-size: 13px;
                            padding: 2px 5px;
                            cursor: pointer;
                            height: 22px;
                            box-sizing: border-box;
                            z-index: 2;
                            line-height: 13px;
                        }
                        .emoQAQ-box {
                            border: 1px solid #c4c4c487;
                            width: 100%;
                            border-radius: 4px;
                            .QWQ-items {
                                padding: 10px;
                                margin: 0;
                                overflow: scroll;
                                max-height: 197px;
                                transition: .3s;

                                &::-webkit-scrollbar{
                                    width: 0px;
                                    height: 0px;
                                }

                                .OwO-item {
                                    color: #0b0b0b;
                                    list-style-type: none;
                                    background: #e1e1e1;
                                    padding: 5px 10px;
                                    border-radius: 5px;
                                    display: inline-block;
                                    font-size: 12px;
                                    line-height: 14px;
                                    margin: 0 10px 12px 0;
                                    cursor: pointer;
                                    -webkit-transition: .3s;
                                    transition: .3s;
                                }
                            }
                            
                        }
                    }

                    .s-30 {
                        width: 30%;
                    }
                    .s-70 {
                        width: 70%;
                        button {
                            height: 30px;
                            width: 100px;
                            float: right;
                            background: #333;
                            border: none;
                            color: white;
                        }
                    }
                }
                
                // 提交按钮
                .btn-srow {
                    padding: 10px 0;
                    border-bottom: 1px dashed #dedede;
                    button:hover {
                        cursor: pointer;
                    }
                }
                
                // empty
                .sempty {
                    padding: 1.25em;
                    color: #555;
                    text-align: center;
                    overflow: auto;
                }
            }
        }
    }
}
</style>