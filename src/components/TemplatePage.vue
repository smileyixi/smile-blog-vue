<template>
  <section class="content">
    <h1 style="display:inline-block">{{title}}</h1><span> {{ltitle}}</span>
    <div class="meta">
        {{meta}}
    </div>
    <!-- 文章归档 -->
    <div class="content-post">
        这里是内容
    </div>
  </section>
</template>

<script>
export default {
    name: 'TemplatePage',
    data() {
        return {
            title: '自定义页面',
            ltitle: 'Page',
            meta: '只是个描述罢了...',
        }
    },
    methods: {
        
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
</style>