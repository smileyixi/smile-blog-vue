<template>
  <footer id="footer">
    <span
      >© 2022 霜冷的秘密基地 -
      <a href="http://localhost:8080/archive" style="cursor: pointer"
        >1 Posts crafted</a
      ></span
    >
    <span>
      ♥ copyRight By
      <a href="http://localhost:8080/" style="cursor: pointer"
        >smilesl</a
      ></span
    >
    <div class="powered_by">
      <a href="http://beian.miit.gov.cn" style="cursor: pointer"
        >渝ICP备202201xxxx号-2</a
      >
    </div>
    <div class="footer_slogan"></div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="less" scoped>
#footer {
  color: #bbb;
  font-size: 14px;
  padding: 50px 0 10px 0;
  text-align: center;
  a {
    color: #bbb;
    text-decoration: none;
  }
}
</style>