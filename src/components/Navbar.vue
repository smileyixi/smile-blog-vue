<template>
  <div class="navbox">
    <div class="panel">
111
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            windBell: require("@/assets/img/windBell.png"),
        }
    },
}
</script>

<style lang="less" scoped>
.navbox {
    position: fixed;
    height: 100vh;
    display: flex;
    align-items: center;
}
.panel {
    width: 30px;
    height: 100vh;
    background-color: rgb(86, 86, 86);
    border-radius: 12px;
}

</style>