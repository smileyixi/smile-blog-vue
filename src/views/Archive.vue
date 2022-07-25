<template>
  <section class="content">
    <h1 style="display:inline-block">{{title}}</h1><span> Archive</span>
    <div class="meta">
        {{meta}}
    </div>
    <el-skeleton :rows="6" animated v-if="!archive_Group.length" class="skeleton"/>
    <!-- 文章归档 -->
    <div v-for="(archive_list, index) in archive_Group" :key="index" style="padding-bottom:20px">
        <h2 class="hrBox" >{{(archive_list[0].year).length>30?(archive_list[0].year).slice(0,30):archive_list[0].year}}</h2>
        <ul class="archived-posts archiveBar" v-infinite-scroll="load" style="overflow:auto"> 
            <li v-for="art in archive_list" :key="art._id">
                <time class="post">{{art.month}}.{{art.day}}</time>
                <a href="javascript:void(0);" @click="toRouter(art._id)" class="post">{{art.title}}</a>
                <span class="post cate" v-for="cate in art.category" :key="cate._id">
                    <a href="javascript:void(0);" @click="toCategory(cate._id)">{{cate.title}}</a>
                </span>
            </li>
        </ul>
    </div>
  </section>
</template>

<script>
import { getBlogList } from '@/request/blogApi'
export default {
    name: 'Archive',
    data() {
        return {
            archive_Group: [],
            title: '归档',
            meta: '回首前尘,尽是可耻的过往',
            count: 0,
            loopLoadDataTimer: '',
        }
    },
    methods: {
        toRouter(id) {
            this.$router.push({
                path: `/article?id=${id}`
            })
        },
        toCategory(id) {
            this.$router.push({
                path: `/category/${id}`
            })
        },
        // 按照数组中对象的year分组
        sortClass(sortData){
        const groupBy = (array, f) => {
            let groups = {};
            array.forEach((o) => {
            let group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
            });
            return Object.keys(groups).map((group) => {
            return groups[group];
            });
        };
        const sorted = groupBy(sortData, (item) => {
            return item.year; // 返回需要分组的对象
        });
        return sorted;
        },
        onLoad() {
            // 获取指定分类文章
            getBlogList({all: 1, small: 1}).then(result=>{
                let data = result.data
                data.forEach(i => {
                    // 处理时间
                    let timeList = i.createAt.slice(0, 10).split("-")
                    i.year = timeList[0]
                    i.month = timeList[1]
                    i.day = timeList[2]
                });
                // 分组
                this.archive_Group = this.sortClass(data)
                this.errMsg = ''
                sessionStorage.setItem('artGroup', JSON.stringify(this.archive_Group))
            }).catch(err=>{
                this.errMsg = err
                this.loopLoadDataTimer = setTimeout(() => {
                    if (this.errMsg!=='') this.onLoad()
                }, 3000);
            })
        },
        load () {
            this.count += 2
        }
    },
    watch: {
        errMsg(oldV, newV) {
            if(newV === '') clearTimeout(this.loopLoadDataTimer)
        }
    },
    mounted() {
        const artGroup = JSON.parse(sessionStorage.getItem('artGroup'))
        
        if(!artGroup || artGroup.length == 0) this.onLoad() // 不存在加载数据
        else this.archive_Group = artGroup // 存在从本地加载数据
    }
}
</script>

<style lang="less" scoped>
.skeleton {
    padding: 20px 0;
}
.content {
    padding: 0 40px;
    h1 {
        font-size: 1.8em;
        margin: 1.5em 0 1em;
        display: block;
    }

    .archiveBar {
        border-left: 1px solid #bbb;
        margin-left: 40px;
    }

    .meta {
        color: #bbb;
        font-size: .8em;
        padding: 10px 0 20px;
    }
    h2 {
        color: #333;
        font-size: 1.2em;
        padding: 1em 0 0.8em;
        &::before {
            content: '# ';
            color: rgb(100, 100, 100);
        }
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
            // 分类span
            .cate {
                margin-left: 10px;
                background: rgb(169, 169, 169);
                padding: 3px;
                a {
                  text-decoration: none;
                  color: #fff;
                  font-size: .8em;
                }
            }
        }
    }

    .hrBox {
        border-bottom: 1px solid rgb(241, 241, 241);
    }
}
</style>