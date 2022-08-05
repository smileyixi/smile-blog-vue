<template>
  <div class="playerBox" style="position: relative">
    <!-- 歌曲图片 -->
    <div class="player-pic player-init" :class="{'player-pause': !playState}">
        <img src="@/assets/img/photo.png"/>
    </div>
    <!-- 歌曲信息 -->
    <div class="player-info">
    <div class="player-music">
        <span>最伟大的作品 - 周杰伦</span>
    </div>

    <div class="player-ctrl">
        <!-- 左边栏 -->
        <div class="ctrl-left">
        <!-- 前一曲 -->
        <span class="ctl-icon">
            <svg t="1659454323694" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8906" width="14" height="14"><path d="M896 304.7v414.6L618.41 512 896 304.7m37.67-101.62c-5.09 0-10.31 1.51-15.04 4.85L536.92 492.98c-12.71 9.49-12.71 28.54 0 38.03l381.72 285.06c4.73 3.34 9.95 4.85 15.04 4.85 13.62 0 26.33-10.8 26.33-26.28V229.36c-0.01-15.48-12.72-26.28-26.34-26.28zM432.62 304.7v414.6L155.03 512l277.59-207.3m37.67-101.62c-5.09 0-10.31 1.51-15.04 4.85L73.53 492.98c-12.71 9.49-12.71 28.54 0 38.03l381.72 285.06c4.73 3.34 9.95 4.85 15.04 4.85 13.62 0 26.33-10.8 26.33-26.28V229.36c0-15.48-12.71-26.28-26.33-26.28z" p-id="8907" fill="#ffffff"></path></svg>
        </span>
        <!-- 中间的暂停播放 -->
        <span class="ctl-icon" style="margin: 0 20px;">
            <!-- play -->
            <svg v-show="!playState" @click="clickPlay"
            viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <!-- pause -->
            <svg v-show="playState" @click="clickPlay"
            viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        </span>
        <!-- 后一曲 -->
        <span class="ctl-icon">
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
</template>

<script>
export default {
    name: 'PlayerBox',
    data() {
        return {
            playState: false,   // 音乐播放状态,默认关闭状态
        }
    },
    methods: {
        // 暂停 / 播放
        clickPlay() {
            this.playState = !this.playState
        }
    }

}
</script>

<style lang="less" scoped>
// 旋转
@keyframes picAnime {
    to {
        transform: rotateZ(0deg);
    }
    from {
        transform: rotateZ(360deg);
    }
}

.player-init {
    animation: picAnime 3s linear infinite;
    -webkit-animation: picAnime 3s linear infinite;
}
// .player-play {
//     animation-play-state: running;
//     -webkit-animation-play-state: running;
// }
.player-pause {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
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
</style>