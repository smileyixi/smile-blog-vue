<template>
  <section class="content">
    <h1>{{category.title}}</h1>
    <div class="meta">
        {{category.description}}
    </div>
    <!-- 分类文章 -->
    <ul class="archived-posts">
        <li v-for="art in archive_list" :key="art._id">
            <time class="post">{{art.createAt}}</time>
            <a href="#" class="post">{{art.title}}</a>
            <span class="post">{{art.hot}}度</span>
        </li>
    </ul>
  </section>
</template>

<script>
import { getBlogListWithCategory } from '@/request/blogApi'
import { getCategoryByCid } from '@/request/categoryApi'
export default {
    name: 'Category',
    data() {
        return {
            archive_list: [
                {
                    createAt: '2022-07-20',
                    title: '测试文章1',
                    _id: '111',
                    hot: '10'
                },
            ],
            errMsg: '',
            category: {},
        }
    },
    methods: {
        onLoad() {
            // 获取指定分类文章
            getBlogListWithCategory({cid: this.$route.params.cid?this.$route.params.cid:''}).then(result=>{
                this.archive_list = result.data
            }).catch(err=>{
                this.errMsg = err
                console.log(err)
            })

            // 获取分类信息
            getCategoryByCid({cid: this.$route.params.cid?this.$route.params.cid:''}).then(result=>{
                this.category = result.data
            }).catch(err=>{
                this.errMsg = err
            })
        }
    },
    watch: {
        '$route'(to,from){
            this.onLoad()
        } 
    },
    mounted() {
        this.onLoad()
    }
}
</script>

<style lang="less" scoped>
.content {
    padding: 0 40px;

    h1 {
        font-size: 1.8em;
        margin: 1.5em 0 1em;
        display: block;
    }

    .meta {
        color: #bbb;
        font-size: .8em;
        padding: 10px 0 20px;
    }

    .archived-posts, ul {
        color: #bbb;
        font-size: .875em;
        list-style: square;
        padding: 20px;

        li {
            display: list-item;
            text-align: -webkit-match-parent;
            
            a {
                text-decoration: none;
                color: rgb(129, 129, 129);
                cursor: pointer;
            }

            .post{
                margin-right: 10px;
            }
        }
    }
}
</style>