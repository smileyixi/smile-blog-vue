<template>
  <main>
    <section class="sm-card" style="margin-top: 100px">
        <!-- 全局信息 -->
        <div class="info info-left">
          <div class="sm-data">
            <span><span class="number number_blogs" style="font-size:1.5em;color: var(--sm-frost-color);">{{artCount}}</span> Blogs</span>
          </div>
          <div class="sm-data sm-data-barline">
            <span><span class="number number_cates" style="font-size:1.5em;color: var(--sm-frost-color);">{{cateCount}}</span> Categories</span>
          </div>
          <div class="sm-data">
            <span><span class="number number_comments" style="font-size:1.5em;color: var(--sm-frost-color);">{{commentCount}}</span> Comments</span>
          </div>
        </div>

        <!-- 输出主题信息 -->
        <div class="info info-right sm-main-info">
          <!-- title -->
          <div class="sm-main-title">
            <h3>
              <svg t="1659710201800" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2296" width="32" height="32"><path d="M288 416h192c17.67 0 32-14.33 32-32s-14.33-32-32-32H288c-17.67 0-32 14.33-32 32s14.33 32 32 32zM288 576h352c17.69 0 32-14.31 32-32s-14.31-32-32-32H288c-17.67 0-32 14.31-32 32s14.33 32 32 32zM480 672H288c-17.67 0-32 14.31-32 32s14.33 32 32 32h192c17.67 0 32-14.31 32-32s-14.33-32-32-32zM939.98 645.16L826.84 532.02c-6.25-6.25-14.44-9.37-22.63-9.37s-16.38 3.12-22.63 9.37L553.37 760.24c-6 6-9.37 14.14-9.37 22.63V896c0 17.67 14.33 32 32 32h113.14c8.49 0 16.63-3.37 22.63-9.37l228.21-228.21c12.49-12.5 12.49-32.76 0-45.26zM675.88 864H608v-67.88L804.21 599.9l67.88 67.88L675.88 864z" p-id="2297" fill="#fff"></path><path d="M448 864H192V160h383.86l0.11 128.09c0.06 35.23 28.78 63.91 64 63.91H768v80c0 17.67 14.33 32 32 32s32-14.33 32-32V274.87c0-8.58-3.45-16.8-9.56-22.82L673.09 105.18A32.002 32.002 0 0 0 650.66 96H160c-17.67 0-32 14.33-32 32v768c0 17.67 14.33 32 32 32h288c17.67 0 32-14.33 32-32s-14.33-32-32-32z m319.72-576H639.97l-0.1-125.73L767.72 288z" p-id="2298" fill="#fff"></path></svg>
              最近文章</h3>
            <h3>
              <svg t="1659715970096" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3937" width="32" height="32"><path d="M628.363636 605.090909c-18.618182 0-34.909091-16.290909-34.909091-34.909091S609.745455 535.272727 628.363636 535.272727h41.890909c18.618182 0 34.909091 16.290909 34.909091 34.909091s-13.963636 34.909091-34.909091 34.909091H628.363636z m-325.818181 0c-18.618182 0-34.909091-16.290909-34.909091-34.909091S283.927273 535.272727 302.545455 535.272727h160.581818c18.618182 0 34.909091 16.290909 34.909091 34.909091s-16.290909 34.909091-34.909091 34.909091H302.545455z m0-209.454545c-18.618182 0-34.909091-16.290909-34.909091-34.909091S283.927273 325.818182 302.545455 325.818182h372.363636c18.618182 0 34.909091 16.290909 34.909091 34.909091S693.527273 395.636364 674.909091 395.636364H302.545455z m202.472727 507.345454l-104.727273 69.818182c-48.872727 32.581818-114.036364 18.618182-144.290909-30.254545-2.327273-4.654545-4.654545-6.981818-6.981818-11.636364l-18.618182-39.563636c-111.709091-13.963636-195.490909-107.054545-195.490909-218.763637V272.290909C34.909091 162.909091 116.363636 69.818182 225.745455 53.527273c95.418182-13.963636 190.836364-18.618182 286.254545-18.618182s190.836364 6.981818 286.254545 18.618182c109.381818 16.290909 190.836364 109.381818 190.836364 218.763636v400.290909c0 116.363636-90.763636 214.109091-207.127273 221.090909-90.763636 4.654545-179.2 9.309091-269.963636 9.309091h-6.981818zM474.763636 837.818182c4.654545-4.654545 11.636364-6.981818 18.618182-6.981818h16.290909c88.436364 0 176.872727-2.327273 265.309091-9.309091 79.127273-4.654545 141.963636-72.145455 141.963637-151.272728V269.963636c0-76.8-55.854545-139.636364-130.327273-148.945454-90.763636-9.309091-181.527273-16.290909-274.618182-16.290909s-183.854545 6.981818-276.945455 18.618182c-74.472727 9.309091-130.327273 74.472727-130.327272 148.945454v400.290909c0 79.127273 62.836364 146.618182 141.963636 151.272727h9.309091c11.636364 0 23.272727 6.981818 27.927273 18.618182l27.927272 55.854546c0 2.327273 2.327273 2.327273 2.327273 4.654545 11.636364 16.290909 32.581818 20.945455 48.872727 9.309091l111.709091-74.472727z" fill="#fff" p-id="3938"></path></svg>
              最近评论</h3>
            <h3>
              <svg t="1659716081659" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5343" width="32" height="32"><path d="M544.768 191.317333a42.666667 42.666667 0 0 0-65.536 0L389.76 298.666667h244.48l-89.472-107.349334zM298.965333 384h-0.597333C224.853333 384.128 170.666667 438.869333 170.666667 499.797333v195.072C170.666667 755.882667 224.938667 810.666667 298.666667 810.666667a42.666667 42.666667 0 1 1 0 85.333333c-114.773333 0-213.333333-87.125333-213.333334-201.130667v-195.072c0-107.050667 86.912-190.421333 192.554667-200.192l135.765333-162.901333a128 128 0 0 1 196.693334 0l135.765333 162.901333C851.754667 309.418667 938.666667 392.746667 938.666667 499.797333v195.072c0 99.541333-75.178667 178.645333-170.666667 197.077334L725.333333 896h-256a42.666667 42.666667 0 1 1 0-85.333333h256c73.728 0 128-54.784 128-115.797334v-195.072c0-60.928-54.144-115.626667-127.701333-115.797333h-426.666667zM469.333333 554.666667a42.666667 42.666667 0 1 0 0 85.333333h256a42.666667 42.666667 0 1 0 0-85.333333h-256z m-149.333333 106.666666a64 64 0 1 0 0-128 64 64 0 0 0 0 128z" p-id="5344" fill="#ffffff"></path></svg>
              最新公告</h3>
          </div>

          <!-- content -->
          <div class="sm-main-items">

            <!-- 最新文章 -->
            <div class="sm-main-item"> 
              <ul >
                <li v-for="(item, index) in artList" :key="index">
                  <a :href="`${siteurl}/article?id=${item._id}`">{{item.createAt.split('T')[0]}} {{item.title.slice(0,15)}}{{item.title.length>15?'...':''}}</a>
                </li>
              </ul>
            </div>

            <!-- 最新评论 -->
            <div class="sm-main-item">
              <ul>
                <li v-for="(item, index) in commentList" :key="index">
                  {{item.createAt.split('T')[0]}}
                  <a :href="`${siteurl}/article?id=${item.aid}`">
                    <span style="color: var(--sm-secondary-color)">{{item.author}}</span>
                  </a>
                  {{item.content.slice(0,30)}}{{item.content.length>30?'...':''}}
                </li>
              </ul>
            </div>

            <!-- 最新公告 -->
            <div class="sm-main-item">
              <ul>
                <li v-for="(item, index) in noticeList" :key="index">{{item.title}}</li>
              </ul>
            </div>
          </div>
          
        </div>

        <!-- button -->
        <div class="btn-ctl">
          <button class="btnOffset" @click="toRouter('/frostdock/writeblog')">撰写文章</button>
          <button class="btnOffset" @click="toRouter('')">个人信息</button>
        </div>
    </section>

    <section class="sm-card" style="height: auto">
      <div class="runinfo">
        <p><span style="color: var(--sm-frost-color);">#</span> 时光荏苒，似水流年</p>
        <p> <span style="color: var(--sm-frost-color);">#</span> 霜冷的秘密基地已经运行了 
          <span><span class="number number_days" style="font-size:1.5em;color: var(--sm-frost-color);">{{runtime_day}}</span></span> 天
          <span><span class="number number_hours" style="font-size:1.5em;color: var(--sm-frost-color);">{{runtime_hour}}</span></span> 小时
        </p>
      </div>
    </section>
  </main>
</template>
<script>
import { getArticleCount, getBlogList } from '../../request/blogApi'
import { getCategoryList } from '../../request/categoryApi'
import { getCommnetCount, getCommentListByaid } from '../../request/commentApi'
import anime from 'animejs'
export default {
  data() {
    return {
      // data
      artCount: 0,
      cateCount: 0,
      commentCount: 0,
      runtime_day: 1,
      runtime_hour: 20,
      siteurl: 'http://localhost:8080',

      // 博客信息
      artList: [],
      commentList: [],
      noticeList: [
        {
          title: '欢迎来到霜冷博客系统'
        },
        {
          title: '快去创建第一个博客吧'
        }
      ]
    }
  },
  methods: {
    toRouter(path) {
      this.$router.push({path})
    },
    transformNumber(cls, number) {
      anime({
        targets: cls,
        innerHTML: [0, number==0?1:number],
        easing: 'linear',
        round: 10 // Will round the animated value to 1 decimal
      });
    },
    onLoad() {
      // 博客总数 | 分类总数 | 评论总数
      getArticleCount({}).then(result=> {
        this.artCount = result || 0
      })
      getCategoryList({}).then(result=> {
        this.cateCount = result.data.length || 0
      })
      getCommnetCount({}).then(result=> {
        this.commentCount = result.data || 0
      })

      // 最近文章 | 最近评论 | 最新公告
      getBlogList({limit:3}).then(result=>{
        this.artList = result.data
      })

      getCommentListByaid({limit:3}).then(result=>{
        this.commentList = result.data
      })

    },
  },
  created() {
    this.onLoad()
  },
  watch: {
    commentCount() {
      setTimeout(() => {
        this.transformNumber('.number_blogs', this.artCount)
        this.transformNumber('.number_cates', this.cateCount)
        this.transformNumber('.number_comments', this.commentCount)
        this.transformNumber('.number_days', this.runtime_day)
        this.transformNumber('.number_hours', this.runtime_hour)
      }, 100);
    }
  },
  mounted() {
    // clearTimeout('t1')
  },
}
</script>

<style lang="less" scoped>
@media  screen and (max-width: 900px) {
  .icon {
    display: none;
  }
  .sm-card {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  // 分类聚合
  .info-left {
    flex-direction: column;
    align-items: flex-center !important;
    min-width: 200px
  }

  // 最新聚合
  .info-right {
    flex-direction: column;
    height: auto !important;
    transform: translateY(0px) !important;
  }
  .sm-main-item {
    margin: 15px;
  }
  .sm-main-items {
    flex-direction: column;
  }

  .sm-data-barline {
    border-left: none !important;
    border-right: none !important;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  }

  .sm-data {
    margin: 20px 0;
  }

  // button
  .btnOffset {
    margin-bottom: 20px !important;
  }

}

* {
  color: var(--sm-main-color);
}
a {
  text-decoration: none;
  color: var(--sm-primary-color);
  cursor: pointer;
}
main {
  --sm-frost-color: #447dda;
  overflow: hidden;
  overflow: auto;
  .sm-card {
    width: 90%;
    margin: 60px auto;
    background: var(--sm-dark-color);
    backdrop-filter: blur(10px);
    border-radius: 20px;

    // 统计数据
    .info {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;

      .sm-data {
        width: 33%;
        // min-width: 200px;
      }

      .sm-data-barline {
        border-left: 1px solid #000;
        border-right: 1px solid #000;
      }
    }

    // 最新数据
    .sm-main-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      min-width: 200px;
      height: 300px;

      // 分区
      .sm-main-item {
        text-align: left;
        overflow: hidden;
        // 标题
        h3 {
          font-size: 1.5em;
        }

        ul {
          display: block;
          list-style: none;
          overflow: hidden;
          // 内容
          li {
            color: var(--sm-primary-color);
          }
        }
      }

      // 标题
      .sm-main-title {
        margin: 30px 0;
        width: 100%;
        h3 {
          display: inline-block;
          width: 33%;
          text-align: center;

          .icon {
            transform: translateY(10px);
          }
        }
      }

      // 内容
      .sm-main-items {
        width: 100%;
        display: flex;

        .sm-main-item {
          flex: 1;
          margin-left: 20px;
          text-align: center;
        }
      }
    }
    
    // 底部按钮
    .btn-ctl {
      padding: 20px 0;
      button {
        position: relative;
        height: 40px;
        width: 100px;
        margin: 0 20px;
        border-radius: 5px;
        border: none;
        outline: none;
        color: var(--sm-main-color);
        font-weight: bold;
        background: rgba(22, 22, 22, .3);
        box-shadow: 2px 1px 20px rgb(42, 42, 42);
        cursor: pointer;
        transition: .3s;

        &::before {
          content: '';
          position: absolute;
          left: 5px;
          height: 20px;
          width: 5px;
          background: rgb(40, 40, 40);
        }

        &:hover {
          background: var(--sm-frost-color);
          box-shadow: 2px 1px 20px var(--sm-frost-color);
        }
      }
    }

    // 运行时间
    .runinfo {
      padding: 20px 0;
    }
  }
}


// 运行时长 / 写文章

</style>