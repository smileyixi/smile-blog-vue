<template>
  <section >
    <div class="articleInfoBox">
      <!-- 输入标题 -->
      <div class="title">
        <input type="text" placeholder="在这里键入标题" v-model="artTitle">
      </div>

      <!-- 文章路径 -->
      <div class="titleinfo">
        <a :href="`${siteurl}/category/${cateCheck}`" target="_blank">
          {{siteurl}}/category/{{cateCheck || '{cid}'}}/
        </a>
      </div>

      <!-- 选择分类 -->
      <div class="category">
          <span class="catebar" 
          v-for="cate in cateList" 
          :key="cate._id"
          @click="cateCheck = cate._id"
          :class="{'cate-foucs': cateCheck==cate._id}"
          :id="cate._id"
          >{{cate.title}}</span>
      </div>

    </div>

    <!-- 编辑器 -->
    <div class="mavonEditor">
      <mavon-editor
      :toolbars="markdownOption" 
      v-model="content"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      ref=md
      />
    </div>

    <!-- 文章信息 -->
    <div class="artinfo">
      <!-- 标签管理 -->
      <div class="tags">
        <!-- 添加tag -->
        <div class="addtag">
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>

        <!-- 标签预览 -->
        <el-tag
          :key="tag"
          v-for="tag in tags"
          class="tag"
          closable
          :disable-transitions="false"
          @click="handleClose(tag)"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>

      </div>

      <!-- 文章元信息 -->
      <div class="meta">
        <!-- 作者 -->
        <div class="metacard">
          <span>文章作者</span>
          <span class="primary-color" style="border-bottom: var(--sm-comment-line);">{{author}}</span>
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
import { getCategoryList } from '../../request/categoryApi'
import { insertArticle, updateArticle } from '../../request/blogApi'
import { imgurl_user } from '@/config/account'
import axios from 'axios'
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
      user: '',       // 用户信息
      cateList: '',   // 分类列表
      cateCheck: '',  // 选中的分类id
      artTitle: '',   // 文章标题
      content: ' ',   // 输入的文字内容
      author: '',     // 作者
      disComment: false,

      // 接受到了要编辑的用户信息
      editArticle: {},

      tags: ['日常'],
      inputVisible: false,
      inputValue: '',

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
      img_file: []
    };
  },
  methods: {
    toRouter(id) {
      this.$router.push({
        path: `/article?id=${id}`
      })
    },
    convert(_, render) {
      this.content = render
    },
    onLoad() {
      getCategoryList({}).then(result=> {
        this.cateList = result.data
      })
    },
    // 移除标签
    handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    },
    // 显示输入标签input
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 添加标签并收起input
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 禁用评论
    checkDis() {
      this.disComment = !this.disComment
    },
    // 发布面板
    open(id) {
      this.$confirm('成功发布文章，是否跳转到文章∠( ᐛ 」∠)＿', 'Tips', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.toRouter(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消跳转'
        });          
      });
    },
    // 发布文章
    submit() {
      // 校验数据
      if(!this.artTitle) {
        return this.$message.warning('请输入文章标题')
      }
      if(!this.cateCheck) {
        return this.$message.warning('请选择分类')
      }
      if(!this.content) {
        return this.$message.warning('内容不能为空')
      }
      if(!this.author) {
        return this.$message.warning('用户信息错误，请返回登陆！')
      }

      // 处于编辑状态
      if(JSON.stringify(this.editArticle) !== '{}') {
        return updateArticle({
          uid: this.editArticle.uid,
          hot: this.editArticle.hot,
          _id: this.editArticle._id,
          tags: this.tags,
          title: this.artTitle,
          cid: this.cateCheck,
          author: this.author,
          content: this.content,
          disComment: this.disComment,
          createAt: this.datetime?this.datetime:Date.now(),
        }).then(result=>{
          this.$message.success(result.msg)
        }).catch(err=>{
          this.$message.error(err.msg)
        })
      }

      // 插入文章
      insertArticle({
        title: this.artTitle,
        cid: this.cateCheck,
        author: this.author,
        uid: JSON.parse(this.$store.state.user)._id,
        content: this.content,
        createAt: this.datetime?this.datetime:Date.now(),
        hot: 3,
        disComment: this.disComment?1:0
      }).then(result=> {
        this.open(result.data)
      }).catch(err=> {
        // this.$message.error('文章发布失败！')
        this.$message.error(err)
      })
    },

    // 更改地址
    changeLocalUrlToOrigin(pos, picurl) {
      // ![5a26106d87444d5597997e2e6a973301.jpeg](1)
      const pattern = /!\[(.*?)\]\((.*?)\)/mg;
      let matcher;

      while ((matcher = pattern.exec(this.content)) !== null) {
        // console.log(matcher);
        if(matcher[2] == pos) {
          this.content = this.content.replace(
            matcher[0], `![5a26106d87444d5597997e2e6a973301.jpeg](${picurl})`
          )

          this.img_file[pos] = `![5a26106d87444d5597997e2e6a973301.jpeg](${picurl})`
        }
      }

    },

    // 图片上传
    $imgAdd(pos, $file) {
      axios.post('/upload', {
            file: $file, 
            token : imgurl_user.token, 
            uid: imgurl_user.uid
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(result=>{
          const data = result.data
          if(data.code == 200) {
            this.$message.success('上传成功')
          }
          this.changeLocalUrlToOrigin(pos, data.data.url)
          // this.img_file.push(`http://test/pic${pos}.png`)
        }).catch(err=>{
            this.$message.error(err)
        })
      
    },

    // 删除图片
    $imgDel(pos) {
      // console.dir(this.img_file[pos[0-1]])
      // this.content = this.content = this.content.replace(
      //   this.img_file[pop[0]],''
      // )
      // delete this.img_file[pos[0-1]]
    }
    
  },
  created() {
    this.onLoad()
    this.author = JSON.parse(this.$store.state.user).username
    // 保存需要更新的文章对象
    this.editArticle = this.$route.params
  },
  mounted() {
    // 设置显式信息
    if(JSON.stringify(this.editArticle) !== '{}') {
      this.author = this.editArticle.author       // 用户信息
      this.cateCheck = this.editArticle.cid  // 选中的分类id
      this.artTitle = this.editArticle.title   // 文章标题
      this.tags = this.editArticle.tags || []  // 标签
      this.datetime = this.editArticle.createAt  // 标签
      this.uid = this.editArticle.uid
      this.$nextTick(()=>{
        this.content = this.editArticle.content   // 输入的文字内容
      })
    }
  }
};
</script>

<style lang="less" scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}

// 固定editer高度
// .v-note-wrapper {
//   height: 600px !important;
// }

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
  
  // 文章路径
  .titleinfo {
    color: var(--sm-primary-color);
  }

  // 分类
  .category {
    margin-top: 10px;
    cursor: pointer;
    .catebar {
      height: 30px;
      width: 100px;
      display: inline-block;
      line-height: 30px;
      color: var(--sm-primary-color);
      margin: 0 20px;
      transition: .3s;

      input[type="radio"] {
        -webkit-appearance: none;
      }
      input[type="radio"]:checked{
        border-left: 2px solid var(--sm-frost-color);
        background: #000;
      }

      &:hover {
        background: var(--sm-frost-color);
        color: var(--sm-main-color);
      }
    }
  }

}

.artinfo {
  // 标签
  .tags {
    padding: 20px 20px;
    display: flex;
    background: var(--sm-dark-color);
    justify-content: flex-start;
    align-items: center;

    // 每个标签
    .tag {
      flex: 1;
      display: inline-block;
      margin: 10px 1.8em;
      max-width: 200px;
      background: var(--sm-dark-color);
      color: var(--sm-primary-color);
      border: none;
      cursor: pointer;
      &:hover {
        background: var(--sm-frost-color);
        color: var(--sm-main-color);
        box-shadow: 2px 1px 20px var(--sm-frost-color);
      }
    }
    
    // 添加标签的盒子
    .addtag {
      width: 20%;
    }
  }

  // 文章元信息
  .meta {
    display: flex ;
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