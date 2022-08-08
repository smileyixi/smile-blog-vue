<template>
  <section class="continer">
    <!-- 侧边栏 -->
    <aside class="sm-aside">
      <!-- 头像栏 -->
      <div class="picbox" ref="picbox">
        <a :href="siteurl"><img class="pic" src="@/assets/img/photo.png"></a>
        <p class="up">{{user.username}}</p>
        <p class="autograph">{{user.autograph}}</p>
      </div>

      <!-- bar -->
      <div class="sm-bar"></div>

      <!-- 导航栏 -->
      <el-menu class="el-menu-vertical-demo sm-menu" :collapse="!isOpen"
        default-active="2"
        text-color="#fff"
        background-color="transparent"
        active-text-color="#447dda">
        <!-- 控制台 -->
        <el-menu-item index="1" @click="toRouter('/frostdock')">
          <i class="el-icon-location"></i>
          <span slot="title">控制台&nbsp;&nbsp;&nbsp;</span>
        </el-menu-item>

        <!-- 快捷操作 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>快捷操作</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="2-1" @click="toRouter('/frostdock/writeblog')">撰写文章</el-menu-item>
            <el-menu-item index="2-2" @click="toRouter('/frostdock/writepage')">新增页面</el-menu-item>
            <el-menu-item index="2-3" @click="toRouter('/frostdock')">新增用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 内容管理 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="3-1" @click="toRouter('/frostdock/manageArticle')">内容文章</el-menu-item>
            <el-menu-item index="3-2" @click="toRouter('/')">独立页面</el-menu-item>
            <el-menu-item index="3-3" @click="toRouter('/')">用户评论</el-menu-item>
            <el-menu-item index="3-4" @click="toRouter('/')">分类管理</el-menu-item>
            <el-menu-item index="3-5" @click="toRouter('/')">标签管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 网站设置 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">网站设置</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="4-1" @click="toRouter('/')">基本设置</el-menu-item>
            <el-menu-item index="4-2" @click="toRouter('/')">评论设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

      <!-- 保留栏 -->
      <div class="sm-func">

      </div>

    </aside>

    <!-- 头部 -->
    <header>
        <div style="display: flex;align-items: center;" :class="{'headeroffset': isOpen, 'headeroffset-rev': !isOpen}">
          <button class="btn-ctrlAside" @click="isOpenAside">
            <i class="el-icon-menu"></i>
          </button>
          <ul class="items">
            <li class="item">{{user.username}}</li>
            <li class="item" @click="loginOut">登出</li>
            <li class="item">
              <a :href="siteurl" target="blank">网站</a>
            </li>
          </ul>
        </div>
        <PlayerBox />
      </header>

    <!-- main -->
    <section :class="{'box':1, 'boxOffset': !isOpen}">
      <!-- 主显示区域 -->
      <Controller v-if="this.$route.name === 'frostdock'" />

      <!-- <section class="sm-card" style="height:300px"></section> -->
      <section class="sm-card">
        <router-view name="frost_view"></router-view>
      </section>
      
    </section>

    <div class="bg" :style="`background: url(${bg})`"></div>
    
  </section>
</template>

<script>
import PlayerBox from '@/components/PlayerBox.vue'
import Controller from '@/components/frostdock/Controller.vue'
import { tokenVerify } from '@/request/userApi'
import anime from 'animejs'
export default {
  components: { PlayerBox, Controller },
  name: 'FrostDock',
  data() {
    return {
      // 图片资源
      bg: require("@/assets/img/bg_main.jpg"),

      siteurl: 'http://localhost:8080',
      user: '',
      isOpen: true,
    }
  },
  methods: {
    toRouter(path) {
      this.$router.push({
        path: path
      })
    },
    loadUser() {
      this.user = JSON.parse(this.$store.state.user) || JSON.parse(localStorage.getItem('_user'))
      if (!this.user) {
        this.user = {
          username: 'whoami',
          autograph: 'just so so..'
        }
      }
    },
    isOpenAside() {
      this.isOpen = !this.isOpen
      // 打开
      if(!this.isOpen) {
        const asideAnime = anime({
          targets: ['.sm-aside'],
          minWidth: 0,
          width: 0,
          duration: 500,
          easing: 'easeInOutQuad',
        })
        this.$refs.picbox.style.display = 'none'
      // 关闭
      } else {
        const asideAnimes = anime({
          targets: ['.sm-aside'],
          minWidth: 250,
          width: 250,
          
        })
        this.$refs.picbox.style.display = 'flex'
      }
    },
    loginOut() {
      this.$store.commit('cleanToken')
      this.$message.info('用户登出')
      this.$router.push({path: '/index'})
    },
  },
  watch: {
    "$route"(to, from) {
      if(/^\/frostdock/.test(to.path)) {
        tokenVerify()
      }
    }
  },
  created() {
    this.loadUser()
    tokenVerify()
  }
}
</script>

<style lang="less" scoped>
// 收起header导航栏
@media screen and (max-width: 860px) {
  .items {
    display: none;
  }
}

// 复写el样式
.el-submenu__title:hover {
  background: #447dda !important;
  color: red !important;
}

.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index:-1
}
body {
  height: 100%;
}
a {
  text-decoration: none;
  color: var(--sm-primary-color);
}
.box {
  right: 0;
  position: absolute;
  width: calc(100vw - 250px);
  overflow: hidden;
}
.headeroffset {
  margin-left: 260px;
  transition: .5s;
}
.headeroffset-rev {
  margin-left: 10px;
  transition: .5s;
}
// box
.boxOffset {
  width: 100% !important;
  left: 0 !important;
}
.continer {
  margin: 0rem;
  padding: 0rem;
  border: 0rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  text-align: center;
  overflow: hidden;
}

header {
  height: 50px;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  z-index: 1;
  background: var(--sm-frost-navbgcolor);
  box-shadow: var(--sm-frost-navshadow);
  backdrop-filter: blur(5px);
  transition: all 0.6s ease;


  // 操作侧边栏按钮
  .btn-ctrlAside {
    width: 40px;
    height: 30px;
    font-size: 1em;
    cursor:pointer;
    background: var(--sm-main-color);
    border: none;
    outline: none;
    border-radius: 5px;
    transition: .3s;
    &:hover {
      background: var(--sm-frost-color);
      color: var(--sm-main-color);
    }
  }

  .items {
    height: 100%;

    .item {
      color: var(--sm-primary-color);
      text-align: center;
      line-height: 50px;
      list-style: none;
      display: inline-block;
      height: 100%;
      width: 100px;
      cursor: pointer;
      position: relative;
      transition: .3s;
      
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        height: 2px;
        width: 100%;
        background: var(--sm-main-color);
        transform: scaleX(0);
        transition: .3s;
      }
      &:hover {
        color: var(--sm-main-color);
      }
      &:hover::before {
        transform: scaleX(1);
      }
    }

  }
}

aside {
  z-index: 2;
  display: flex;
  position: fixed;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  width: 250px;
  min-width: 250px;
  height: 100%;
  max-width: 250px;
  background: var(--sm-dark-color);
  color: var(--sm-main-color);
  backdrop-filter: blur(5px);

  // 头像栏 - 上
  .picbox {
    height: 250px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  
    // username
    .up {
      font-size: 1.4em;
      font-weight: bold;
      color: #447dda;
    }

    .autograph {
      color: var(--sm-primary-color);
    }
    // 头像
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      animation: picanime-rever 1s;
      &:hover {
        animation: picanime 1s;
      }
    }
  }

  @keyframes picanime {
    to {
      transform: rotateZ(0deg);
    }
    from {
      transform: rotateZ(360deg);
    }
  }
  @keyframes picanime-rever {
    to {
      transform: rotateZ(360deg);
    }
    from {
      transform: rotateZ(0deg);
    }
  }

  // 菜单栏 - 中
  .sm-menu {
    flex: 1 1 auto;
    flex-basis: 0;
    overflow: auto;
    background: transparent;
    background: var(--sm-dark-color);
    text-align: left;
    margin-top: 56px;
  }
  .el-menu {
    border: none !important;
  }

  // 功能栏 - 下
  .sm-func {
    color: var(--sm-frost-color);
  }

  // 分隔栏
  .sm-bar {
    height: 1px;
    width: 80%;
    background: rgb(54, 54, 54);
    margin: 0 auto;
  }
}

// 路由区域
.sm-card {
  width: 90%;
  overflow: hidden;
  margin: 60px auto;
  backdrop-filter: blur(10px);
  border-radius: 20px;
}


</style>