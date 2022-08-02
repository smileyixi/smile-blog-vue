<template>
  <header id="headerbox" class="font-size-Regular">
    <!-- wind-bell -->
    <div id="windBell">
        <img :src="`${windBell}`" width="90px" height="100%">
        <img :src="`${windBell2}`" width="100px" height="100%">
    </div>

    <!-- 顶部盒子 -->
    <div class="headerNav navgitionBar">
      <!-- 导航和搜索 - left -->
      <div class="leftBox">
        <!-- 导航栏 -->
        <ul class="items" id="#loginMenu">
          <li @click="toRouter('/index')">首页</li>
          <li @click="toRouter('/about')">关于</li>
          <li @click="toRouter('/archive')">归档</li>
          <li @click="toRouter">友链</li>
        </ul>

      </div>

      <!-- 歌词 - center -->
      <div class="centerBox">
        <!-- 搜索框 -->
        <div class="searchInput">
          <el-input v-show="!opensearchLrc"
            placeholder="search.."
            prefix-icon="el-icon-search"
            v-model="searchKeyword"
            @keydown.enter="search">
          </el-input>

        </div>
        <!-- 歌词 -->
          <div class="player-lrc" v-show="opensearchLrc">
            <span class="player-main-lrc">哥穿着复古西装拿着手杖弹着魔法乐章</span>
            <span class="player-vice-lrc">漫步走在莎玛丽丹</span>
          </div>
      </div>

      <!-- 播放音乐和头像 - right -->
      <div class="rightBox">

        <!-- 切换按钮 -->
        <div class="check" title="切换搜索栏/歌词">
          <div class="btn-check" @click="check_searchLrc">
            <div class="radiocircle">
              <svg t="1659446138958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2338" width="20" height="20"><path d="M768 436.906667v53.76a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-11.52a115.626667 115.626667 0 0 0-64-100.693334c-7.68-4.266667-14.506667-9.386667-21.333334-14.08v384A161.28 161.28 0 0 1 426.666667 896a161.28 161.28 0 0 1-170.666667-149.333333 161.28 161.28 0 0 1 170.666667-149.333334 183.04 183.04 0 0 1 85.333333 20.906667V149.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v7.253334a113.92 113.92 0 0 0 61.013334 103.253333A197.12 197.12 0 0 1 768 436.906667z" p-id="2339" fill="#ffffff"></path></svg>
            </div>
          </div>
        </div>

        <!-- 音乐盒子 -->
        <div class="playerBox" style="position: relative">
          <div class="player-pic">
            <img src="@/assets/img/photo.png"/>
          </div>
          <div class="player-info">
            <div class="player-music">
              <span>最伟大的作品 - 周杰伦</span>
            </div>

            <div class="player-ctrl">
              <!-- 左边栏 -->
              <div class="ctrl-left">
                <!-- 前一曲 -->
                <span>
                  <svg t="1659454323694" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8906" width="14" height="14"><path d="M896 304.7v414.6L618.41 512 896 304.7m37.67-101.62c-5.09 0-10.31 1.51-15.04 4.85L536.92 492.98c-12.71 9.49-12.71 28.54 0 38.03l381.72 285.06c4.73 3.34 9.95 4.85 15.04 4.85 13.62 0 26.33-10.8 26.33-26.28V229.36c-0.01-15.48-12.72-26.28-26.34-26.28zM432.62 304.7v414.6L155.03 512l277.59-207.3m37.67-101.62c-5.09 0-10.31 1.51-15.04 4.85L73.53 492.98c-12.71 9.49-12.71 28.54 0 38.03l381.72 285.06c4.73 3.34 9.95 4.85 15.04 4.85 13.62 0 26.33-10.8 26.33-26.28V229.36c0-15.48-12.71-26.28-26.33-26.28z" p-id="8907" fill="#ffffff"></path></svg>
                </span>
                <!-- 中间的暂停播放 -->
                <span style="margin: 0 20px">
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  <!-- <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> -->
                </span>
                <!-- 后一曲 -->
                <span>
                  <svg t="1659454150912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8453" width="14" height="14"><path d="M128 304.7L405.59 512 128 719.3V304.7M90.33 203.08c-13.62 0-26.33 10.8-26.33 26.28v565.28c0 15.48 12.71 26.28 26.33 26.28 5.09 0 10.31-1.51 15.04-4.85l381.72-285.06c12.71-9.49 12.71-28.54 0-38.03L105.37 207.92c-4.73-3.33-9.95-4.84-15.04-4.84zM591.38 304.7L868.97 512 591.38 719.3V304.7m-37.67-101.62c-13.62 0-26.33 10.8-26.33 26.28v565.28c0 15.48 12.71 26.28 26.33 26.28 5.09 0 10.31-1.51 15.04-4.85l381.72-285.06c12.71-9.49 12.71-28.54 0-38.03L568.75 207.92c-4.73-3.33-9.95-4.84-15.04-4.84z" p-id="8454" fill="#ffffff"></path></svg>
                </span>
              </div>
              <!-- 右边栏 -->
              <div class="ctrl-right">
                <!-- 音量控制 -->
                <span style="line-height:16px">
                  <svg t="1659453293498" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4227" width="16" height="16"><path d="M576 256a47.52 47.52 0 0 0-30.256 11.024l-0.16-0.176-162.592 133.04h-159.136v0.128A48 48 0 0 0 176 448v160a48 48 0 0 0 48 48h160.384l163.36 118.816 0.096-0.112c7.936 5.792 17.6 9.296 28.16 9.296a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48z m190.432 46.816l-45.536 45.552C760.32 397.632 784 460 784 528s-23.68 130.368-63.088 179.632l45.536 45.568A350.512 350.512 0 0 0 848 528c0-85.68-30.672-164.16-81.568-225.184z" fill="#ffffff" p-id="4228"></path></svg>
                </span>

                <!-- 歌曲菜单 -->
                <span style="line-height:12px">
                  <svg t="1659453434534" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5559" width="12" height="12"><path d="M892.928 128q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0zM892.928 448.512q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0zM892.928 769.024q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0z" p-id="5560" fill="#ffffff"></path></svg>
                </span>
              </div>
            </div>

            <div class="progressBar"></div>
            
          </div>
        </div>
        <div class="logoBox">
          <img src="@/assets/img/photo.png" width="50px" id="logo" />
        </div>
      </div>
    </div>

  </header>
</template>

<script>
import anime from "animejs";
export default {
  name: "Header",
  data() {
    return {
      siteUrl: "http://localhost:8080",
      os: '', // 系统
      mainKeyIcon: '',  // 搜索主图标
      mainKey: '',      // 搜索主键
      searchKeyword: '',// 关键词
      opensearchLrc: false,  // 开lrc，关search

      windBell: require("@/assets/img/windBell.png"),
      windBell2: require("@/assets/img/windBell2.png"),
    };
  },
  methods: {
    toRouter(path) {
      this.$router.push({
        path: path
      })
    },
    loadSearch(len) {
      var searchAnime = anime({
        targets: '.input_search',
        duration: 2000,
        width: len
      });
    },
    // 推出搜索栏
    preSearch(){
      this.loadSearch(200)
      this.$refs.inputSearch.focus()
      // 推荐搜索
      this.$refs.inputSearch.placeholder = '阁下需要看的什么呢？'
    },
    // 关闭搜索栏
    disSearch() {
      this.loadSearch(90)
      this.$refs.inputSearch.blur()
    },
    // 搜索方法
    search() {
      if(this.searchKeyword !== '') {
        this.$router.push({
          path: '/archive',
          query: {
            keyword: this.searchKeyword,
            date:new Date().getTime()
          }
        })
      }
      if(this.$route.path == '/search') {
        this.$router.go(0)
      }
      this.disSearch()
    },
    // 控制台输出
    consoleGura() {
      // console.clear();
      console.log("%c%s",
          "color: skyblue;",
          "  ________                            _________      __   .__   ._.\n /  _____/ __ ______________         /   _____/__ __|  | _|__|  | |\n/   \\  ___|  |  \\_  __ \\__  \\        \\_____  \\|  |  \\  |/ /  |  | |\n\\    \\_\\  \\  |  /|  | \\// __ \\_      /        \  |  /    <|  |    \\|\n \\______  /____/ |__|  /____  / /\\  /_______  /____/|__|_ \\__|   __\n        \\/                  \\/  \\/          \\/           \\/      \\/");
      console.log(`%c グラちゃんは世界で一番いい女の子! | ${this.siteUrl}`,`opacity: .9;color:#fff;background: linear-gradient(to right , #03baff, #9ba5ff);padding:5px;border-radius: 10px;`);
    },
    // 判断操作系统
    detectOS() {
      var sUserAgent = navigator.userAgent;
      var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
      var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
      

      if (isWin) {
        this.os = 'windows'
        this.mainKey='Control'
        this.mainKeyIcon = 'ct'
      }else if (isMac) {
        this.os = 'macos'
        this.mainKey='Meta'
        this.mainKeyIcon = '⌘'
      }else {
        this.os = 'others'
        this.mainKey='Control'
        this.mainKeyIcon = 'null'
      }

    },
    // 键盘事件
    keyDown() {
      document.onkeydown = (e) => {
        const event = e || window.event || arguments.callee.caller.arguments[0]
        
        // 搜索栏
        if(event.keyCode == 91 && event.key == this.mainKey) {
          this.preSearch()
        }
        // 关闭
        else if(event.key == 'Escape') {
          this.disSearch()
        }
      }
    },
    // check
    check_searchLrc () {
      this.opensearchLrc = !this.opensearchLrc
      
      if(this.opensearchLrc) {
        const open = anime({
          targets: '.radiocircle',
          translateX: 50
        })
        const open_bg_open = anime({
          targets: '.btn-check',
          background: 'var(--check-selected-bgcolor)'
        })
      } else {
        const close = anime({
          targets: '.radiocircle',
          translateX: 0
        })

        const open_bg_close = anime({
          targets: '.btn-check',
          background: 'var(--check-bgcolor)',
        })
      }
      
    },
  },
  mounted() {
    this.loadSearch(90)
    this.keyDown()
    this.detectOS()
    this.consoleGura()
  }
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 1100px) {
  .player-lrc {
    display: none !important;
  }
}
@media screen and (max-width: 800px) {
  #headerbox {
    display: none;
  }
}

.headerNav {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: all 0.6s ease;

  // 左边栏
  .leftBox {
    display: flex;
    align-items: center;
  }

  // 中栏
  .centerBox {
    display: flex;
    align-items: center;
    // 搜索框
    .searchInput {
      margin-left: 40px;
      /deep/ input {
        height: 30px;
        width: 300px;
        line-height: 30px;
        padding: 0 30px;
        border-radius: 15px;
        border: none;
        outline: none;
        background: var(--sm-main-color);
      }

      /deep/ i {
          line-height: 30px !important;
      }
    }
  }

  // 右边栏
  .rightBox {
    display: flex;
    align-items: center;

    // 切换
    .check {
      margin-left: 10px;
      float: right;
      user-select: none;
      cursor: pointer;

      // 切换按钮
      .btn-check {
        height: 26px;
        width: 80px;
        border-radius: 20px;
        border: var(--check-border);
        background: var(--check-bgcolor);
        display: flex;
        align-items: center;
        position: relative;

        // 内部圆
        .radiocircle {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: var(--check-radioCircle);
          position: absolute;
          left: 3px;
        }
      }
    }

    // music player
    .playerBox {
      border-radius: 20px;
      // background: rgba(96, 96, 96, 0.333);
      box-shadow: 1px 1px 2px rgb(134, 134, 134);
      width: 220px;
      height: 45px;
      margin: 0 20px;
      display: flex;
      align-items: center;
      overflow: hidden;

      // 歌曲图片
      .player-pic {
        // background: rgb(33, 33, 46);
        height: 45px;
        width: 45px;

        img {
          border-radius: 50%;
          height: 39px;
          border: 3px solid rgb(130, 130, 130);
        }
      }

      // 显示歌曲名和歌手
      .player-info {
        margin-top: 15px;
        margin-left: 10px;
        height: 50px;
        width: 140px;
        overflow: hidden;
        font-size: var(--player-fontsize);
        line-height: var(--player-fontsize);
        color: var(--player-color);

        .player-music {
          padding: 0;
          margin-bottom: 5px;
        }

        // 控制图标栏
        .player-ctrl {
          display: flex;
          justify-content: space-between;

          .ctrl-right {
            display: flex;
            align-items: center;
          }
        }

        // 进度条
        .progressBar {
          width: 100%;
          height: 3px;
          background: var(--sm-main-color);
        }
      }
    }

    // 头像
    .logoBox {
      height: 50px;
    }
  }

// 歌词
.player-lrc {
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  span {
    margin: 5px 0
  }

  .player-main-lrc {
    margin-top: 10px;
    font-size: var(--player-lrc-fontsize);
    line-height: var(--player-lrc-fontsize);
  }

  // 副词
  .player-vice-lrc {
    font-size: var(--player-vicelrc-fontsize);
    line-height: var(--player-vicelrc-fontsize);
    color: var(--player-vicelrc-color)
  }
}

  
}

#windBell {
    position: fixed;
    right: 0;
    transform: translateY(-15px);
    display: flex;
}

.items {
  display: flex;
}
.items li {
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: var(--sm-navgition-color);
  position: relative;
  cursor: pointer;
  list-style-type: none;
  transition: 1s;
}
.items li:before {
  content: "";
  height: 2px;
  background-color: var(--sm-navgition-bgcolor);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: scaleX(0);
  transition: 0.3s;
}
.items li:hover:before {
  transform: scaleX(1);
}


</style>