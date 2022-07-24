<template>
  <header id="headerbox">
    <!--头像头部-->
    <div id="header" style="margin-top: 5px">
      <nav id="headerNav">
        <!--LOGO-->
        <a :href="siteUrl">
          <img src="@/assets/img/photo.png" width="50px" id="logo" />
        </a>
        <h1 id="top_tit" onclick="exTheme();">
          NIGHT<span style="color: #52a2e1; border-radius: 5px">DARK</span>
        </h1>
        <!-- 搜索框 -->
        <div class="navbar">
          <input type="text" class="input_search" :placeholder="`搜索（${mainKeyIcon} + K)`" 
          v-model="searchKeyword"
          @blur="disSearch"
          @focus="preSearch"
          @keydown.enter="search"
          ref="inputSearch"
          />
          <button class="btn_search"
          @click="search">
            <span class="icon_search">
              <svg xmlns="http://www.w3.org/2000/svg" style="transform: translateY(1px);" 
              width="13px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
          </button>
        </div>
      </nav>
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
    };
  },
  methods: {
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
      // 恢复默认
      this.$refs.inputSearch.placeholder = `搜索（${this.mainKeyIcon} + K)`
    },
    // 搜索方法
    search() {
      if(this.searchKeyword !== '') {
        this.$router.push({
          path: '/search',
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
    }
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
@media screen and (max-width: 700px) {
  #headerbox {
    display: none;
  }
}

#headerNav {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-top: 2em;
  transition: all 0.6s ease;

  a {
    margin-left: 20px;
  }

  img {
    width: 50px;
    height: 50px;
    float: left;
    transition: 0.5s;

    &:hover {
      transform: rotate((-45deg));
      box-shadow: 0 0 20px 8px rgb(217, 217, 217);
    }
  }

  #top_tit {
    font-size: 1.5em;
    margin: 10px 20px;
    border-top: 3px solid #000;
  }
}

// search
.navbar {
  & > input,
  & > button {
    height: 22px;
  }

  .input_search {
    width: 0px;
    border-radius: 0;
    border-width: 0;
    padding: 1px 20px;
    border-radius: 10px 0 0 10px;
    background: rgba(220, 220, 220, 0.9);
    color: rgb(86, 86, 86);
    outline: none;
    letter-spacing: 1px;

    &:focus {
      box-shadow: 1px 1px 0 rgba(255, 255, 255, 1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
    }
  }

  .btn_search {
    height: 24px;
    width: 50px;
    border-width: 0px;
    color: #fff;
    font-weight: 200;
    background: rgb(88, 88, 88);
    border-radius: 0 10px 10px 0;
    transform: translateY(1px);
    &:hover {
      background: rgb(64, 64, 64);
      cursor: pointer;
    }
  }

  .icon_search {
    height: 12px;
  }

}

</style>