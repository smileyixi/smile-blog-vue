<template>
  <el-container>
    <Header></Header>
    <el-main>
      <div class="wrapper">
        wrapper
      </div>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Pages from '../components/Pages.vue'

export default {
    name: 'MainIndex',
    components: { Header, Footer, Pages },
    data() {
      return {
        
      }
    },
}
</script>

<style lang="less" scoped>
.wrapper {
    max-width: 820px;
    background: #fff;
    margin: 0 auto;
    margin-top: 60px;
    box-shadow: 0 10px 20px 0 hsl(0deg 0% 93% / 86%);
    -webkit-transition: all .6s ease;
    transition: all .6s ease;
}
</style>