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
        <PlayerBox />
        <div class="logoBox">
          <img src="@/assets/img/photo.png" width="50px" id="logo" />
        </div>
      </div>
    </div>

  </header>
</template>

<script>
import anime from "animejs";
import PlayerBox from './PlayerBox.vue';
export default {
  components: { PlayerBox },
  name: "Header",
  data() {
    return {
      siteUrl: "http://localhost:8080",
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
    // 搜索方法
    search() {
      if(this.searchKeyword !== '') {
        this.$router.push({
          path: '/index',
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
      
    }
  },
  mounted() {
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
  z-index: 1;
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
        background: var(--sm-search-bgcolor);
        color: var(--sm-search-color);
        transition: .3s;
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