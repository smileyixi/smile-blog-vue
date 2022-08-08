<template>
  <section class="content">
    <h1 style="display:inline-block">{{pageInfo.title || '请输入标题'}}</h1><span> {{pageInfo.page}}</span>
    <div class="meta primary-color">
        {{pageInfo.meta || 'just so so..'}}
    </div>
    <!-- 内容 -->
    <div class="content-post primary-color">
        <article v-html="pageInfo.content" v-if="!pageInfo.isMark"></article>

        <mavon-editor v-else
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :boxShadow="false"
        :ishljs="true"
        previewBackground="rgb(207 207 207 / 0%)"

        v-model="pageInfo.content"
        />
    </div>
  </section>
</template>

<script>
import { getPage } from '@/request/pageApi'
import "@/assets/theme/markView.css";
export default {
    name: 'TemplatePage',
    data() {
        return {
            pageInfo: {}    // 页面信息
        }
    },
    methods: {
        onLoad() {
            const page = this.$route.path.split('/').pop()
            getPage({page}).then(result=>{
                this.pageInfo = result.data
                console.log(this.pageInfo)
            })
        }
    },
    watch: {
        "$route"(to, from) {
            if(to.path.indexOf('pages')) {
                this.onLoad()
            }
        }
    },
    created() {
        this.onLoad()
    },
    mounted() {
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
        color: var(--sm-main-color);
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

    .content-post {
        color: #333;
        font-size: .875em;
        list-style: square;
        padding: 20px;

        
    }

}

.markdown-body {
    /* padding: 0 5% !important; */
    background: transparent !important;
    border: none !important;
    color: rgb(230, 230, 230);
}

.primary-color {
    color: var(--sm-primary-color) !important;
}
</style>