<template>
  <section class="content">
    <h1 style="display:inline-block">{{title}}</h1><span> About</span>
    <div class="meta">
        {{meta}}
    </div>
    <!-- 文章归档 -->
    <div class="content-post">
        只是个霜冷的博客罢了...
    </div>
  </section>
</template>

<script>
export default {
    name: 'About',
    data() {
        return {
            title: '关于',
            meta: '只是个博客罢了...',
        }
    },
}
</script>

<style lang="less" scoped>
.content {
    padding: 0 40px;
    h1 {
        font-size: 1.8em;
        margin: 1.5em 0 1em;
        display: block;
        color: var(--sm-title-color);
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
        color: var(--sm-comment-color);
        font-size: .875em;
        list-style: square;
        padding: 20px;

        
    }

}
</style>