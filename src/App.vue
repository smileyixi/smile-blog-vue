<template>
  <div id="app" >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
    color: #333;
    background: #f7f7f7;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    line-height: 2em;
    text-align: justify;
    word-wrap: break-word;
    background-attachment: fixed;
}
/* 滚动条整体 */
::-webkit-scrollbar {
	width: 6px;
}
/* scroll轨道背景 */
::-webkit-scrollbar-track{ 
	background: transparent;
}
/* 滚动滑块 */
::-webkit-scrollbar-thumb {
	background: #c8c8c8;
	border-radius: 3px;
}
@media screen and (max-width: 820px) {
  ::-webkit-scrollbar {
    width: 0;
  }
}
</style>
