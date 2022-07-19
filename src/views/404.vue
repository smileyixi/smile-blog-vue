<template>
  <div id="box">
    <button type="button" class="buttonCy">WARNNING</button>
    <div
      class="text"
      style="background-image: url(https://smilesl.top/uploads/404Bg.png)"
    >
      <div id="one">
        <span style="color: #ff0000; border-right: 3px solid #f7f7f7"
          >君子</span
        >
        不可欺之以方
      </div>

      <!--小标题 -打字机-->
      <div class="lTit" id="text">
        <span class="lTitWord"></span>
        <span class="lTitCursor">|</span>
      </div>

      <div class="sun"></div>
      <div class="clouds">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="birds"></div>
      <div class="sea">
        <div class="wave w-1"></div>
        <div class="wave w-2"></div>
        <div class="fish"><span></span><span></span><span></span></div>
      </div>
      <div class="bottom">
        <div class="grass"><span> </span><span> </span><span> </span></div>
        <div class="grass"><span> </span><span> </span><span> </span></div>
        <div class="grass"><span> </span><span> </span><span> </span></div>
        <div class="grass"><span> </span><span> </span><span> </span></div>
        <div class="circle">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="circle">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="circle">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="circle">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="grass_tw"></div>
        <div class="grass_tw"></div>
        <div class="grass_tw"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import url("https://fonts.googleapis.com/css?family=Libre+Franklin");
#box {
  z-index: -9999;
  margin: 0;
  min-height: 100vh;
  overflow: hidden;
  font-family: "Libre Franklin", sans-serif;
  font-size: 62.5%;
  /* background-image: linear-gradient(0deg, #f8e3eb, #fff4bd, #f49454, #ff6f27);
     */
  background-image: url(http://smilesl.com/background2.png);

  /*content的小标题打字机*/
  .lTit {
    margin-top: 5%;
  }
  .lTitWord {
    color: #ffffff;
    font-weight: bold;
    font-size: 15px;
  }
  .lTitCursor {
    font-weight: bold;
    color: #fefefe;
    animation: flash 0.5s linear infinite;
  }
  /*打字机光标闪烁动画*/
  @keyframes flash {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  /* ===前置=== */
  .text {
    color: #e6e6e6;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 10%;
    width: 30%;
    cursor: default;
    border-radius: 20px;
    box-shadow: 10px 6px 10px #595959;
  }
  /* 大标题 */
  #one {
    padding: 3px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3%;
    font-size: 30px;
    font-weight: 900;
    width: 320px;
    position: relative;
    background-color: #2f2f2f;
    box-shadow: 6px 3px 3px #595959;
    opacity: 0.9;
  }
  #one::after,
  #one::before {
    position: absolute;
    content: "";
    box-sizing: content-box;
    width: 40%;
    height: 12px;
    background-color: #f80a1a;
    border-radius: 10px;
    box-shadow: 3px 5px 10px #ff0000;
    opacity: 0.8;
    transition: 0.3s;
  }
  #one::after {
    float: right;
    bottom: -15px;
    right: -15px;
    animation: titAfterMove 3s infinite;
  }
  #one::before {
    float: left;
    top: -15px;
    left: -15px;
    animation: titBeforeMove 3s infinite;
  }
  /* 标题装饰框动画 */
  @keyframes titBeforeMove {
    from {
      transform: translateX(61px);
    }
    75% {
      transform: translateX(0);
    }
    50% {
      transform: translateY(61px);
    }
    25% {
      transform: translateX(-61px);
    }
    to {
      transform: translateX(61px);
    }
  }
  @keyframes titAfterMove {
    from {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(-61px);
    }
    to {
      transform: translateY(10px);
    }
  }
  /* 故障按钮 */
  .buttonCy,
  .buttonCy::after {
    font-size: 18px;
    font-weight: bold;
    padding: 0.5125rem;
    background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
    border: 0;
    color: #ffffff;
    letter-spacing: -2px;
    /* 文字间距 */
    box-shadow: 5px 0 0 #00ffff;
    outline: transparent;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .buttonCy::after {
    /* 储存切割参数 */
    --slice-0: inset(50% 50% 50% 50%);
    --slice-1: inset(80% -6px 0 0);
    --slice-2: inset(50% -6px 30% 0);
    --slice-3: inset(10% -6px 85% 0);
    --slice-4: inset(40% -6px 43% 0);
    --slice-5: inset(80% -6px 5% 0);
    content: "NOTFOUND";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000;
    background: linear-gradient(
      45deg,
      transparent 3%,
      #00e6f6 3%,
      #00f6f6 5%,
      #ff013c 5%
    );
    text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
    /* 切割第二层 */
    clip-path: var(--slice-0);
  }
  .buttonCy:hover::after {
    animation: 1s cyMove steps(2, end);
  }
  /* 故障动画 */
  @keyframes cyMove {
    from {
      clip-path: var(--slice-1);
      transform: translate(-20px, -10px);
    }
    10% {
      clip-path: var(--slice-3);
      transform: translate(10px, 10px);
    }
    20% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 10px);
    }
    30% {
      clip-path: var(--slice-5);
      transform: translate(0px, 5px);
    }
    40% {
      clip-path: var(--slice-2);
      transform: translate(-10px, 0px);
    }
    50% {
      clip-path: var(--slice-3);
      transform: translate(-20px, -10px);
    }
    60% {
      clip-path: var(--slice-4);
      transform: translate(10px, -15px);
    }
    70% {
      clip-path: var(--slice-2);
      transform: translate(5px, 10px);
    }
    80% {
      clip-path: var(--slice-5);
      transform: translate(-10px, -10px);
    }
    90% {
      clip-path: var(--slice-4);
      transform: translate(20px, -10px);
    }
    to {
      clip-path: var(--slice-1);
      transform: translate(0);
    }
  }
  /*浏览器宽度小于1120px时自适应*/
  @media screen and (max-width: 1120px) {
    .text {
      margin-top: 10%;
    }
    .lTit {
      margin-top: 10%;
    }
  }
  /* ===背景=== */
  .sun {
    position: absolute;
    top: 4em;
    left: 4em;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: radial-gradient(circle at 50%, #ffffff 50%, #fa833f);
    box-shadow: 0px 0px 40px #f8e3eb, inset 0px 0px 100px #fdf0a3;
    animation: sun 5s linear infinite;
  }
  .clouds {
    position: absolute;
    right: 0;
    bottom: 35vh;
    left: 0;
    opacity: 0.5;
  }
  .clouds div {
    position: relative;
    left: -30%;
    width: 220px;
    height: 80px;
    border-radius: 50%;
    background-color: #ffffff;
    background-image: radial-gradient(
      ellipse at 50%,
      transparent,
      #fcfcfc,
      #f7f7f7
    );
    filter: blur(3px);
    animation: clouds 60s linear infinite, cloud 8s linear infinite;
  }
  .clouds div::before,
  .clouds div::after {
    position: absolute;
    content: "";
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background-color: #35eff2;
    background-image: radial-gradient(
      ellipse at 50%,
      transparent,
      #f2f2f2,
      #f7f7f7
    );
    filter: blur(3px);
    animation: cloud 3s linear infinite;
  }
  .clouds div::after {
    background-color: #e6e6e6;
  }
  .clouds div:nth-child(2) {
    animation-delay: 5s;
  }
  .clouds div:nth-child(3) {
    animation-duration: 40s;
  }
  .birds {
    position: absolute;
    right: -10%;
    top: 30px;
    width: 10px;
    height: 10px;
    background-color: #070000;
    clip-path: polygon(
      70% 59%,
      100% 54%,
      64% 68%,
      48% 83%,
      81% 86%,
      55% 90%,
      0 92%,
      19% 76%,
      0 60%,
      33% 71%
    );
    animation: birds 30s linear infinite, fly 1s linear infinite;
  }
  .sea {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    height: 25vh;
    background-color: lightblue;
  }
  .fish {
    position: relative;
  }
  .fish span {
    position: relative;
    top: 10%;
    left: 110%;
    display: block;
    width: 50px;
    height: 16px;
    background-color: #3a9fc0;
    background-image: linear-gradient(to top, #92cbde, #3a9fc0);
    border-radius: 52% 48% 51% 49% / 51% 56% 44% 49%;
    animation: fish 15s linear infinite;
  }
  .fish span::before,
  .fish span::after {
    position: absolute;
    content: "";
  }
  .fish span::before {
    left: 95%;
    top: calc(50% - 8px);
    width: 16px;
    height: 16px;
    background-color: inherit;
    background-image: linear-gradient(90deg, #3a9fc0, #2b758d);
    clip-path: polygon(100% 0%, 84% 49%, 100% 100%, 0 66%, 0% 50%, 0 35%);
  }
  .fish span::after {
    width: 10px;
    height: 10px;
    top: 50%;
    left: 30%;
    background-image: linear-gradient(135deg, #3a9fc0, #2b758d);
    clip-path: polygon(100% 27%, 86% 74%, 31% 100%, 0 22%, 0 0, 35% 0);
    transform-origin: 0 0;
    animation: side 0.5s linear infinite;
  }
  .fish span:nth-child(2) {
    animation-duration: 6s;
    animation-delay: 5s;
  }
  .fish span:nth-child(3) {
    animation-duration: 9s;
  }
  .wave {
    position: absolute;
    left: -25%;
    bottom: 0;
    width: 150%;
    height: 100%;
    background-color: lightblue;
    animation: vawe 20s linear infinite;
  }
  .wave.w-1 {
    background: #99cfe0;
    animation-delay: 2s;
  }
  .wave.w-2 {
    background: #86c5da;
  }
  .bottom {
    position: absolute;
    right: -2em;
    bottom: 0;
    left: -2em;
    height: 1.35em;
    border-radius: 78% 22% 52% 48% / 100% 100% 0% 0%;
    background-color: #3a0003;
    background-image: linear-gradient(0deg, #210001, #6d0005);
    opacity: 0.8;
  }
  .grass {
    position: absolute;
    bottom: 5px;
    left: 5em;
    width: 3px;
    height: 35px;
    background-color: #44882d;
    background-image: linear-gradient(45deg, #44882d, #274f1a);
    border-radius: 40%;
    transform-origin: 50% 100%;
    animation: grass 2s linear infinite;
  }
  .grass:nth-child(2) {
    bottom: 3px;
    left: 30%;
  }
  .grass:nth-child(3) {
    bottom: 8px;
    left: 60%;
  }
  .grass:nth-child(4) {
    bottom: 6px;
    left: 80%;
  }
  .grass span {
    position: absolute;
    left: -5px;
    width: 8px;
    height: 2px;
    background-color: #44882d;
    background-image: inherit;
    transform: rotate(45deg);
  }
  .grass span::before {
    position: absolute;
    top: 4px;
    left: 4px;
    content: "";
    width: inherit;
    height: inherit;
    background-color: inherit;
    transform: rotate(-90deg) translateX(100%);
  }
  .grass span:nth-child(2) {
    top: 10px;
  }
  .grass span:nth-child(3) {
    top: 15px;
  }
  .grass span:nth-child(3) {
    top: 20px;
  }
  .circle {
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 25vh;
  }
  .circle span {
    position: absolute;
    bottom: 0;
    left: 12%;
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #ffffff;
    opacity: 0.2;
    animation: circle 2s linear infinite;
  }
  .circle span::before,
  .circle span::after {
    position: absolute;
    bottom: 0;
    left: 10px;
    content: "";
    width: 5px;
    height: 5px;
    border-radius: inherit;
    background-color: inherit;
    animation: circle 4s linear infinite;
    animation-delay: 0.3s;
  }
  .circle span::after {
    right: -10px;
    animation-delay: 0.5s;
  }
  .circle span:nth-child(2) {
    left: 25%;
    animation-delay: 0.6s;
  }
  .circle span:nth-child(3) {
    left: 45%;
    animation-delay: 0.8s;
  }
  .circle span:nth-child(4) {
    left: 53%;
  }
  .circle span:nth-child(5) {
    left: 74%;
  }
  .grass_tw {
    position: absolute;
    bottom: 11px;
    left: 50%;
    width: 30px;
    height: 10px;
    background-color: #44882d;
    background-image: linear-gradient(180deg, #44882d, #1e3b14);
    clip-path: polygon(
      10% 84%,
      14% 73%,
      17% 24%,
      20% 61%,
      22% 88%,
      32% 15%,
      31% 68%,
      35% 88%,
      49% 11%,
      63% 85%,
      69% 10%,
      77% 80%,
      84% 16%,
      89% 92%,
      97% 41%,
      100% 97%,
      50% 96%,
      0 100%,
      4% 34%
    );
    animation: grass_tw 2s linear infinite;
  }
  .grass_tw:nth-last-child(2) {
    left: 75%;
    width: 80px;
  }
  .grass_tw:last-child {
    bottom: 8px;
    left: 20%;
    width: 50px;
  }
  @keyframes sun {
    50% {
      box-shadow: 0px 0px 60px 20px #f5de19, inset 0px 0px 100px #f5de19;
    }
  }
  @keyframes clouds {
    0% {
      left: -30%;
    }
    100% {
      left: 110%;
    }
  }
  @keyframes cloud {
    30% {
      border-radius: 22% 78% 51% 49% / 78% 66% 34% 22%;
    }
    40% {
      width: 180px;
    }
    60% {
      border-radius: 61% 39% 51% 49% / 50% 66% 34% 50%;
    }
  }
  @keyframes birds {
    100% {
      right: 110%;
      transform: scale(1.8) translateY(100px);
    }
  }
  @keyframes fly {
    50% {
      clip-path: polygon(
        70% 69%,
        97% 80%,
        70% 76%,
        48% 83%,
        81% 86%,
        55% 90%,
        0 92%,
        19% 76%,
        0 71%,
        33% 71%
      );
    }
  }
  @keyframes fish {
    0% {
      left: 110%;
    }
    40% {
      transform: translateY(35px) rotate(-15deg);
    }
    70% {
      transform: translateY(-5px) rotate(15deg);
    }
    80% {
      transform: translateY(5px) rotate(0deg);
    }
    100% {
      left: -10%;
    }
  }
  @keyframes circle {
    0% {
      transform: translateY(0px) scale(0);
    }
    50%,
    80% {
      transform: translateY(-25px) scale(1);
    }
    100% {
      transform: translateY(-30px) scale(0);
      opacity: 0;
    }
  }
  @keyframes side {
    50% {
      transform: rotate(-35deg);
    }
  }
  @keyframes vawe {
    20%,
    40% {
      border-radius: 23% 77% 52% 48% / 100% 100% 0% 0%;
    }
    30%,
    50%,
    70% {
      border-radius: 37% 63% 100% 0% / 100% 100% 0% 0%;
    }
    80%,
    60% {
      border-radius: 78% 22% 52% 48% / 100% 100% 0% 0%;
    }
  }
  @keyframes grass {
    50% {
      transform: rotate(5deg);
    }
  }
  @keyframes grass_tw {
    50% {
      clip-path: polygon(
        10% 84%,
        14% 73%,
        10% 28%,
        20% 61%,
        22% 88%,
        24% 18%,
        31% 68%,
        35% 88%,
        42% 15%,
        63% 85%,
        58% 14%,
        77% 80%,
        77% 18%,
        89% 92%,
        91% 43%,
        100% 97%,
        50% 96%,
        0 100%,
        3% 39%
      );
    }
  }
}
</style>