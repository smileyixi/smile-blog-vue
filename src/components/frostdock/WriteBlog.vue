<template>
  <div>
    <div class="articleInfoBox">
      <div class="title">
        <input type="text" placeholder="在这里键入标题" v-model="artTitle">
      </div>

      <div class="titleinfo">
        {{siteurl_domain}}/archive/{cid}/
      </div>
    </div>

    <!-- 编辑器 -->
    <div class="mavonEditor">
      <mavon-editor :toolbars="markdownOption" v-model="context"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WriteBlog',
  data() {
    return {
      context: ' ',//输入的数据
      markdownOption: {
        scrollStyle: true, // 滚动条
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录

        previewBackground: 'var(--sm-dark-color)'
      },
      siteurl_domain: 'smilesl.top',
      artTitle: '',
    };
  }
};
</script>

<style lang="less" scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
.v-note-wrapper {
  height: 600px !important;
}

.articleInfoBox {
  color: var(--sm-main-color);
  width: 100%;
  height: 100px;
  padding: 20px 0;
  border-radius: 20px 20px 0 0 ;
  background: var(--sm-dark-color);

  // 输入标题
  .title {
    line-height: 30px;
    input {
      height: 20px;
      width: 200px;
      background: none;
      border: none;
      outline: none;
      border-bottom: var(--sm-comment-line);
      text-align: center;
      transition: .3s;
      color: var(--sm-primary-color);
      font-size: 1.2em;
      padding: 0 20px;
      &:focus {
        color: var(--sm-main-color);
        width: 500px;
      }
    }
  }

  .titleinfo {
    color: var(--sm-secondary-color);
  }
}



</style>