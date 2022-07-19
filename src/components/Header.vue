<template>
  <el-header id="headerbox">
    <!--头像头部-->
    <div id="header" style="margin-top: 5px;">
      <nav id="headerNav">
        <!--LOGO-->
        <a :href="siteUrl" >
          <img src="@/assets/img/photo.png" width="50px" id="logo">
        </a>
        <h1 id="top_tit" onclick="exTheme();">NIGHT<span style="color: #52a2e1;border-radius: 5px;">DARK</span></h1>
      </nav>
    </div>
  </el-header>
</template>

<script>
import anime from 'animejs'
export default {
  name: 'Header',
  data() {
    return {
      siteUrl: 'http://localhost:8081',
    }
  },
  mounted() {
    // var menuAnime = anime({
    //   targets: '.items',
    //   translateX: 40
    // });
  },
}
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

  a{
    margin-left: 20px;
  }

  img {
    width: 50px;
    height: 50px;
    float: left;
    transition: 0.5s;

    &:hover {
      transform: rotate((-45deg));
      box-shadow:0 0 20px 8px rgb(217, 217, 217);
    }
  }

  #top_tit {
    font-size: 1.5em;
    margin: 10px 20px;
    border-top: 3px solid #000;
  }
}


</style>