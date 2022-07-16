<template>
  <el-header>
    <!--头像头部-->
    <div id="header" style="margin-top: 5px;">
      <nav id="headerNav">
        <!--LOGO-->
        <a :href="siteUrl" ><img src="@/assets/img/photo.png" width="50px" id="logo"></a>
        <h1 id="top_tit" onclick="exTheme();">NIGHT<span style="color: #52a2e1;border-radius: 5px;">DARK</span></h1>

      </nav>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      siteUrl: 'http://localhost:8081',
    }
  },
}
</script>

<style lang="less" scoped>
#headerNav {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-top: 2em;

  img {
    width: 50px;
    height: 50px;
    float: left;
    margin-left: 20px;
    transition: 0.5s;
  }

  #top_tit {
    font-size: 1.5em;
    margin: 10px 20px;
    border-top: 3px solid #000;
}
}
</style>