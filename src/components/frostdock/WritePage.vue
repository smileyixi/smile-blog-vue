<template>
  <section >
    <div class="articleInfoBox">
      <!-- 输入标题 -->
      <div class="title">
        <input type="text" placeholder="在这里键入标题" v-model="artTitle">
      </div>

      <!-- page路径 -->
      <div class="titleinfo">
        <span>{{siteurl}}/pages/</span>
        <input type="text" v-model="page" class="input-page" placeholder="page">
      </div>

      <!-- 是否转换html -->
      <div class="convertbox">
        <el-switch
          v-model="isMark"
          active-color="#222"
          inactive-color="#555"
          title="convertToHtml"
          >
        </el-switch>
      </div>

    </div>

    <!-- 编辑器 -->
    <div class="mavonEditor">
      <mavon-editor v-show="!isMark"
      :toolbars="markdownOption" 
      @change="convert"
      />
      <mavon-editor v-show="isMark"
      :toolbars="markdownOption" 
      v-model="content"
      />
    </div>

    <!-- 文章信息 -->
    <div class="artinfo">

      <!-- 元信息 -->
      <div class="meta">
        <!-- 作者 -->
        <div class="metacard">
          <span>页面描述</span>
          <input type="text" v-model="meta" class="input-page primary-color" placeholder="meta..">
        </div>

        <!-- 选择时间 -->
        <div class="metacard">
          <span>发布时间</span>
          <el-date-picker
            class="input-checkbox"
            v-model="datetime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>

        <div class="metacard meta-flex">
          <span
          @click="checkDis"
          class="disComText"
          style="cursor:pointer; margin-right: 10px"
          >禁止回复</span>
          <svg t="1659772206738" class="icon" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2281" width="32" height="32"><path d="M1228.8 819.451443C1228.8 875.866522 1182.468198 921.6 1126.422784 921.6L605.945088 921.6C577.657958 921.6 532.837274 929.851648 506.804634 939.665101L300.419021 1017.465805C247.610112 1037.373082 204.8 1007.375002 204.8 950.875341L204.8 921.6 102.4 921.6C45.846067 921.6 0 875.897702 0 819.451443L0 102.148557C0 45.733478 45.927731 0 102.653286 0L1126.146714 0C1182.840576 0 1228.8 45.702298 1228.8 102.148557L1228.8 819.451443ZM204.8 819.2C261.353933 819.2 307.2 864.762522 307.2 896L460.660787 837.400525C486.984704 827.348634 531.055104 819.2 559.95817 819.2L1074.766336 819.2C1103.28279 819.2 1126.4 796.162611 1126.4 767.649536L1126.4 153.950464C1126.4 125.479936 1103.088333 102.4 1075.619686 102.4L153.180314 102.4C125.135104 102.4 102.4 125.437389 102.4 153.950464L102.4 767.649536C102.4 796.120064 125.099674 819.2 154.079693 819.2L204.8 819.2ZM307.2 563.2C307.2 534.923008 330.534963 512 358.526618 512L870.273382 512C898.620262 512 921.6 534.725888 921.6 563.2 921.6 591.476992 898.265037 614.4 870.273382 614.4L358.526618 614.4C330.179738 614.4 307.2 591.674112 307.2 563.2ZM307.2 358.4C307.2 330.123008 330.534963 307.2 358.526618 307.2L870.273382 307.2C898.620262 307.2 921.6 329.925888 921.6 358.4 921.6 386.676992 898.265037 409.6 870.273382 409.6L358.526618 409.6C330.179738 409.6 307.2 386.874112 307.2 358.4Z" p-id="2282" 
          :fill="disComment?'#1296db':'var(--sm-primary-color)'"></path></svg>
        </div>

        <!-- 发布按钮 -->
        <div class="metacard">
          <button class="submit" @click="submit">发布</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { createPage } from '@/request/pageApi'
export default {
  name: 'WriteBlog',
  data() {
    return {
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
      siteurl: 'http://localhost:8080',
      // data
      artTitle: '',   // 标题
      content: ' ',   // 内容
      page: '',       // 页面name
      meta: '',       // 描述

      disComment: false,  // 禁止评论
      isMark: false,   // 转化为html

      // date
      datetime: '',
      pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
      },
    };
  },
  methods: {
    toRouter() {
      this.$router.push({
        path: `/pages/${this.page}`
      })
    },
    convert(_, render) {
      this.content = render
    },

    // 禁用评论
    checkDis() {
      this.disComment = !this.disComment
    },
    // 发布面板
    open(page) {
      this.$confirm(`成功创建自定义页面 - ${this.page}，是否跳转到页面∠( ᐛ 」∠)＿`, 'Tips', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.toRouter(page)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消跳转'
        });          
      });
    },
    // 发布
    submit() {
      // 校验数据
      if(!this.artTitle) {
        return this.$message.warning('请输入页面标题')
      }
      if(!this.page) {
        return this.$message.warning('请输入页面路径')
      }
      if(!this.content) {
        return this.$message.warning('内容不能为空')
      }

      createPage({
        page: this.page,
        title: this.artTitle,
        meta: this.meta,
        isMark: this.isMark,
        content: this.content,
        createAt: this.datetime,
        disComment: this.disComment?1:0
      }).then(result=>{
        // 页面路径重复，返回错误信息
        if(result.error == -1) {
          return this.$message.error(result.msg)
        }
        this.open(result.data)
        
      }).catch(err=>{
        this.$message.error(err)
      })

    }
    
  },
  created() {
  },
};
</script>

<style lang="less" scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}

// click cate
.cate-foucs {
  border-left: 2px solid var(--sm-frost-color);
  background: var(--sm-dark-color);
}

.primary-color {
  color: var(--sm-frost-color);
  margin-left: 10px;
}

.articleInfoBox {
  color: var(--sm-main-color);
  width: 100%;
  padding: 20px 0;
  border-radius: 20px 20px 0 0 ;
  background: var(--sm-dark-color);
  position: relative;

  // 转换html按钮
  .convertbox {
    position: absolute;
    top: 10px;
    right: 10px;
  }

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
  
  // page路径
  .titleinfo {
    color: var(--sm-primary-color);

    .input-page {
      margin-left: 2px;
      outline: none;
      background: transparent;
      border: none;
      border-bottom: var(--sm-comment-line);
      color: var(--sm-main-color);
      width: 80px;
    }
  }

}

.artinfo {

  // 文章元信息
  .meta {
    display: flex ;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    background: var(--sm-dark-color);
    border-top: 1px solid rgb(44, 44, 44);

    // 布局
    .metacard {
      color: var(--sm-primary-color);
      line-height: 35px;

      // 提交按钮
      .submit { 
        height: 30px;
        width: 120px;
        background: var(--sm-dark-color);
        color: var(--sm-primary-color);
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
          background: var(--sm-frost-color);
          color: var(--sm-main-color);
          box-shadow: 2px 1px 20px var(--sm-frost-color);
        }
      }

      // date input
      /deep/ input {
        background: none;
        height: 35px;
        border: none;
        color: var(--sm-frost-color);
        border-bottom: var(--sm-comment-line);
        outline: none;
      }
    }

    .meta-flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }


  }
}



</style>