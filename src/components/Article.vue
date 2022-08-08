<template>
  <section class="article-detail">
    <!-- 文章内容 -->
    <article class="content">
        <h1 style="margin: 1em 0">{{article.title}}</h1>
        <!-- 文章元信息 -->
        <div class="meta">
            <span class="item">
                <i class="iconfont icon-calendar"></i>
                <time > {{(article.createAt)}}</time>
            </span>
            <span class="item">
                <i class="iconfont icon-tag"></i>
                <a href="#" v-for="item in article.category" :key="item._id">
                    {{item.title}}
                </a>
            </span>
            <span class="item">
                <i class="iconfont icon-message "></i>
                <a href="#"> {{commentCount}} 评</a>
            </span>
            <span class="item"><i class="iconfont icon-eye"></i> {{article.hot}} 度</span>
        </div>
        <!-- post data -->
        <div class="post">
            <!-- <article class="article" v-html="article.content"></article> -->
            <mavon-editor
            class="artWrapper"
            :subfield="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :boxShadow="false"
            :ishljs="true"
            previewBackground="rgb(207 207 207 / 0%)"

            v-model="article.content"
            />
        </div>
    </article>
    <!-- 换页 -->
    <section class="pager">
        <a class="pre" href="javascript:void(0);"
        @click="toRouter(preArt._id)" 
        v-show="preArt._id">{{preArt.title}}</a>
        <a class="next" href="javascript:void(0);"
        @click="toRouter(nextArt._id)" 
        v-show="nextArt._id">{{nextArt.title}}</a>
    </section>
    <!-- comments -->
    <div class="comments-bg">
        <div class="comments">
            <div class="wrap">
                <!-- 评论面板UI -->
                <div class="adminui">
                    <!-- 基本信息 -->
                    <div class="sheader">
                        <i class="inputtag el-icon-user"></i><input type="text" 
                        @blur="setUser"
                        v-model="username" class="comInput" placeholder="昵称">
                        <i class="inputtag el-icon-message"></i><input 
                        @blur="setUser"
                        v-model="email" type="text" class="comInput" placeholder="邮箱">
                        <i class="inputtag el-icon-paperclip"></i><input 
                        @blur="setUser"
                        v-model="usersite" type="text" class="comInput" placeholder="网址(http://)">
                    </div>
                    <!-- 编辑评论 -->
                    <div class="sedit">
                        <textarea v-model="commentPost" @click="isShowQAQ=false"
                         name="text" id="sediter" cols="30" rows="10" placeholder="说点什么好呢？"
                        ></textarea>
                    </div>
                    <!-- emoji-->
                    <div class="srow">
                        <div class="emoQAQ" style="flex;flex-direction: row-reverse;">
                            <!-- 点击emo-logo显示/隐藏 -->
                            <div class="emoQAQ-logo"
                            @click="isShowQAQ=!isShowQAQ"
                            >
                                <span>
                                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16172" width="22" height="22">
                                    <path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z" p-id="16173"></path><path d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z" p-id="16174"></path><path d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z" p-id="16175"></path><path d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z" p-id="16176"></path>
                                </svg>
                                </span>
                            </div>
                            <div class="emoQAQ-box"
                            v-show="isShowQAQ"
                            >
                                <ul class="QWQ-items">
                                    <li @click="additionQwQ($event)" class="OwO-item" title="目瞪口呆">OωO</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="Hi">|´・ω・)ノ</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="开心">ヾ(≧∇≦*)ゝ</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="星星眼">(☆ω☆)</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="掀桌">（╯‵□′）╯︵┴─┴</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="流口水">￣﹃￣</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="捂脸">(/ω＼)</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="给跪">∠( ᐛ 」∠)＿</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="Hi">(๑•̀ㅁ•́ฅ)</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="斜眼">→_→</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="加油">୧(๑•̀⌄•́๑)૭</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="有木有WiFi">٩(ˊᗜˋ*)و</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="前方高能预警">(ノ°ο°)ノ</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="我从未见过如此厚颜无耻之人">(´இ皿இ｀)</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="吓死宝宝惹">⌇●﹏●⌇</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="已阅留爪">(ฅ´ω`ฅ)</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="去吧大师球">(╯°A°)╯︵○○○</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="太萌惹">φ(￣∇￣o)</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="咦咦咦">ヾ(´･ ･｀｡)ノ"</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="气呼呼">( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="我受到了惊吓">(ó﹏ò｡)</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="什么鬼">Σ(っ °Д °;)っ</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="摸摸头">( ,,´･ω･)ﾉ"(´っω･｀｡)</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="无奈">╮(╯▽╰)╭ </li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="脸红">o(*////▽////*)q </li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="">＞﹏＜</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="">( ๑´•ω•) "(ㆆᴗㆆ)</li>
                                    <li @click="additionQwQ($event)" class="OwO-item" title="">(｡•ˇ‸ˇ•｡)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- post -->
                    <div class="srow btn-srow">
                        <div class="s-30">
                            <a alt="Markdown is supported" href="https://guides.github.com/features/mastering-markdown/" class="vicon" target="_blank" style="cursor: url(&quot;http://smilesl.com/usr/plugins/AliceStyle/static/mouse/dew/link.cur&quot;), pointer;"><svg class="markdown" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></a>
                            <label>禁止回复<input type="checkbox" v-model="disMainComment"></label>
                            
                        </div>
                        <div class="s-70">
                            <button @click="submit(disMainComment)">提交</button>
                        </div>
                    </div>
                </div>
                <div class="count">
                    <span>{{commentCount!=0?commentCount+' 评论':'现在还没有评论哦～'}} </span>
                </div>
                <div class="scards" > 
                    <el-skeleton :rows="3" animated v-if="!isLoad" class="skeleton"/>
                    <div style="padding: 0 80px">
                        <el-skeleton :rows="3" animated v-if="!isLoad" class="skeleton"/>
                    </div>
                    <ol class="comment-list">
                        <div class="card" v-for="(comcard, index) in commentList" :key="index">
                            <img class="simg" src="https://sdn.geekzu.org/avatar/0322e8835f6d11fd3743b207fe73c718?s=50&amp;r=G&amp;d=mm">
                            <!-- 评论详情 -->
                            <div class="sdetail" :class="{'card-border': index!=commentList.length-1}">
                                <div class="shead">
                                    <span>{{comcard.author}}</span>
                                    <span>{{getBrowserWithUA(comcard.ua, 1)}}</span>
                                    <span>{{comcard.ua.os}}</span>
                                    <!-- 判断主评论作者是否为文章作者 -->
                                    <span class="isAuthor" v-if="comcard.author==article.author">UP</span>
                                </div>
                                <div class="smeta">
                                    <span>{{timeAgo(comcard.createAt)}}</span>
                                    <!-- 回复时传入评论体对象处理，并且弹出回复写入栏 -->
                                    <span class="call" 
                                    @click="call(comcard._id, comcard)" 
                                    :title="`@${comcard.author}`"
                                    v-if="!comcard.disComment"
                                    >回复</span>
                                </div>
                                <div class="scontent">
                                    <p>{{comcard.content}}</p>
                                </div>
                                <!-- 回复的评论 -->
                                <div class="reply" v-if="comcard.childComments.length">
                                    
                                    <ol class="comment-list">
                                        <div class="card" v-for="(comcardc, indexc) in comcard.childComments" :key="indexc">
                                            <img class="simg small-img" src="https://sdn.geekzu.org/avatar/0322e8835f6d11fd3743b207fe73c718?s=50&amp;r=G&amp;d=mm">
                                            <div class="sdetail">
                                                <div class="shead">
                                                    <span>{{comcardc.author}}</span>
                                                    <!-- 传入1表示获取整条ua -->
                                                    <span>{{getBrowserWithUA(comcardc.ua, 1)}}</span>
                                                    <span>{{comcardc.ua.os}}</span>

                                                    <!-- 判断主评论作者是否为文章作者 -->
                                                    <span class="isAuthor" v-if="comcardc.author==article.author">UP</span>
                                                </div>
                                                <div class="smeta">
                                                    <span>{{timeAgo(comcardc.createAt)}}</span>
                                                    <span class="call" @click="call(comcard._id, comcardc)"
                                                     :title="`@${comcardc.author}`"
                                                     v-if="!comcardc.disComment"
                                                     >回复</span>
                                                </div>
                                                <div class="scontent">
                                                    <span class="callme">@{{comcardc.callAuthor||"unknown"}}</span> <span>{{comcardc.content}}</span>
                                                </div>
                                            </div>

                                            <!-- 子评论面板UI -->
                                            <div class="adminui cardui" v-if="comcardc.isShow">
                                                <!-- 基本信息 -->
                                                <div class="sheader">
                                                    <i class="inputtag el-icon-user "></i><input type="text" v-model="username" class="comInput vname" placeholder="昵称">
                                                    <i class="inputtag el-icon-message "></i><input v-model="email" type="text" class="comInput vemail" placeholder="邮箱">
                                                    <i class="inputtag el-icon-paperclip "></i><input v-model="usersite" type="text" class="comInput vusersite" placeholder="网址(http://)">
                                                </div>
                                                <!-- 编辑评论 -->
                                                <div class="sedit">
                                                    <textarea v-model="commentPost" @click="isShowQAQ=false"
                                                    name="text" id="sediter" cols="30" rows="10" placeholder="说点什么好呢？"
                                                    ></textarea>
                                                </div>
                                                <!-- emoji-->
                                                <div class="srow">
                                                    <div class="emoQAQ" style="flex;flex-direction: row-reverse;">
                                                        <!-- 点击emo-logo显示/隐藏 -->
                                                        <div class="emoQAQ-logo"
                                                        @click="callOwO(comcardc)"
                                                        >
                                                            <span>
                                                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16172" width="22" height="22">
                                                                <path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z" p-id="16173"></path><path d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z" p-id="16174"></path><path d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z" p-id="16175"></path><path d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z" p-id="16176"></path>
                                                            </svg>
                                                            </span>
                                                        </div>
                                                        <div class="emoQAQ-box"
                                                        v-show="comcardc.isShowOwO"
                                                        >
                                                            <ul class="QWQ-items">
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="目瞪口呆">OωO</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="Hi">|´・ω・)ノ</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="开心">ヾ(≧∇≦*)ゝ</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="星星眼">(☆ω☆)</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="掀桌">（╯‵□′）╯︵┴─┴</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="流口水">￣﹃￣</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="捂脸">(/ω＼)</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="给跪">∠( ᐛ 」∠)＿</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="Hi">(๑•̀ㅁ•́ฅ)</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="斜眼">→_→</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="加油">୧(๑•̀⌄•́๑)૭</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="有木有WiFi">٩(ˊᗜˋ*)و</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="前方高能预警">(ノ°ο°)ノ</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="我从未见过如此厚颜无耻之人">(´இ皿இ｀)</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="吓死宝宝惹">⌇●﹏●⌇</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="已阅留爪">(ฅ´ω`ฅ)</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="去吧大师球">(╯°A°)╯︵○○○</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="太萌惹">φ(￣∇￣o)</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="咦咦咦">ヾ(´･ ･｀｡)ノ"</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="气呼呼">( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="我受到了惊吓">(ó﹏ò｡)</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="什么鬼">Σ(っ °Д °;)っ</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="摸摸头">( ,,´･ω･)ﾉ"(´っω･｀｡)</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="无奈">╮(╯▽╰)╭ </li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="脸红">o(*////▽////*)q </li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="">＞﹏＜</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="">( ๑´•ω•) "(ㆆᴗㆆ)</li>
                                                                <li @click="additionQwQ($event)" class="OwO-item" title="">(｡•ˇ‸ˇ•｡)</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- post -->
                                                <div class="srow btn-srow">
                                                    <div class="s-30">
                                                        <a alt="Markdown is supported" href="https://guides.github.com/features/mastering-markdown/" class="vicon" target="_blank" style="cursor: url(&quot;http://smilesl.com/usr/plugins/AliceStyle/static/mouse/dew/link.cur&quot;), pointer;"><svg class="markdown" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></a>
                                                        <label>禁止回复<input type="checkbox" v-model="comcardc.disComment"></label>
                                                    </div>
                                                    <div class="s-70">
                                                        <button @click="submit(comcardc.disComment)">提交</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ol>

                                </div>
                            </div>
                            <!-- 评论面板UI -->
                            <div class="adminui cardui" v-if="comcard.isShow">
                                <!-- 基本信息 -->
                                <div class="sheader">
                                    <i class="inputtag el-icon-user"></i><input type="text" v-model="username" class="comInput vname" placeholder="昵称">
                                    <i class="inputtag el-icon-message"></i><input v-model="email" type="text" class="comInput vemail" placeholder="邮箱">
                                    <i class="inputtag el-icon-paperclip "></i><input v-model="usersite" type="text" class="comInput vusersite" placeholder="网址(http://)">
                                </div>
                                <!-- 编辑评论 -->
                                <div class="sedit">
                                    <textarea v-model="commentPost" @click="isShowQAQ=false"
                                    name="text" id="sediter" cols="30" rows="10" placeholder="说点什么好呢？"
                                    ></textarea>
                                </div>
                                <!-- emoji-->
                                <div class="srow">
                                    <div class="emoQAQ" style="flex;flex-direction: row-reverse;">
                                        <!-- 点击emo-logo显示/隐藏 -->
                                        <div class="emoQAQ-logo"
                                        @click="callOwO(comcard)"
                                        >
                                            <span>
                                                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16172" width="22" height="22">
                                                <path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z" p-id="16173"></path><path d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z" p-id="16174"></path><path d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z" p-id="16175"></path><path d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z" p-id="16176"></path>
                                            </svg>
                                            </span>
                                        </div>
                                        <div class="emoQAQ-box"
                                        v-show="comcard.isShowOwO"
                                        >
                                            <ul class="QWQ-items">
                                                <li @click="additionQwQ($event)" class="OwO-item" title="目瞪口呆">OωO</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="Hi">|´・ω・)ノ</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="开心">ヾ(≧∇≦*)ゝ</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="星星眼">(☆ω☆)</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="掀桌">（╯‵□′）╯︵┴─┴</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="流口水">￣﹃￣</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="捂脸">(/ω＼)</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="给跪">∠( ᐛ 」∠)＿</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="Hi">(๑•̀ㅁ•́ฅ)</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="斜眼">→_→</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="加油">୧(๑•̀⌄•́๑)૭</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="有木有WiFi">٩(ˊᗜˋ*)و</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="前方高能预警">(ノ°ο°)ノ</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="我从未见过如此厚颜无耻之人">(´இ皿இ｀)</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="吓死宝宝惹">⌇●﹏●⌇</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="已阅留爪">(ฅ´ω`ฅ)</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="去吧大师球">(╯°A°)╯︵○○○</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="太萌惹">φ(￣∇￣o)</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="咦咦咦">ヾ(´･ ･｀｡)ノ"</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="气呼呼">( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="我受到了惊吓">(ó﹏ò｡)</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="什么鬼">Σ(っ °Д °;)っ</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="摸摸头">( ,,´･ω･)ﾉ"(´っω･｀｡)</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="无奈">╮(╯▽╰)╭ </li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="脸红">o(*////▽////*)q </li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="">＞﹏＜</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="">( ๑´•ω•) "(ㆆᴗㆆ)</li>
                                                <li @click="additionQwQ($event)" class="OwO-item" title="">(｡•ˇ‸ˇ•｡)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- post -->
                                <div class="srow btn-srow">
                                    <div class="s-30">
                                        <a alt="Markdown is supported" href="https://guides.github.com/features/mastering-markdown/" class="vicon" target="_blank" style="cursor: url(&quot;http://smilesl.com/usr/plugins/AliceStyle/static/mouse/dew/link.cur&quot;), pointer;"><svg class="markdown" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></a>
                                        <label>禁止回复<input type="checkbox" v-model="comcard.disComment"></label>
                                    </div>
                                    <div class="s-70">
                                        <button @click="submit(comcard.disComment)">提交</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ol>
                </div>

            </div>
            
        </div>
    </div>

  </section>
</template>

<script>
import { getArticleById, getPreById, getNextById } from '@/request/blogApi'
import { insertComment, getCommentListByaid } from '@/request/commentApi'
import "mavon-editor/dist/css/index.css";
import "@/assets/theme/markView.css";
export default {
    name: 'Article',
    data() {
        return {
            siteUrl: 'http://localhost:8080',
            siteTitle: '霜冷的秘密基地',
            article: {},
            errMsg: '',
            nextArt: '',
            preArt: '',
            isShowQAQ: false,   // 显示表情栏
            errMsg: '',
            browserInfo: '',    // 浏览器信息
            username: '',   // 用户名
            email: '',      // 个人邮箱
            usersite: '',   // 个人网站
            commentPost: '',        // 待发送评论内容
            mainCommentPost: '',    // 主面板评论内容
            nid: undefined,         // 父评论id
            callAuthor: '',         // @ username
            isLoad: false,
            disMainComment: 0,  // 禁止回复

            // comments data
            commentList: [      
            ],
            commentCount: 0,
        }
    },
    methods: {
        toRouter(id) {
            this.$router.push({
                path: '/article?id=' + id
            })
        },
        // 获取文章详情
        onLoad() {
            // const art = JSON.parse(sessionStorage.getItem(`art_${this.$route.query.id}`))
            // if(art !== '' ) this.article = art

            // 获取文章详情
            getArticleById({id: this.$route.query.id}).then(result=>{
                this.article = result.data
                // 时间格式化
                this.article.createAt = this.article.createAt.slice(0,10)
                sessionStorage.setItem(`art_${this.$route.query.id}`, JSON.stringify(this.article))
            }).catch(err=>{
                this.article = {}
                this.errMsg = err
            })

        },
        // 获取评论
        onLoadComent() {
            // 获取评论
            getCommentListByaid({aid: this.$route.query.id}).then(result=>{
                let data = result.data
                this.commentCount=data.length
                
                data.forEach((i, index)=>{
                    if ('nid' in i) data.splice(index, 1)
                })
                this.commentList = data
                this.isLoad = true
            }).catch(err=>{
                this.errMsg = err
                this.isLoad = false
            })
            
        },
        // 回复评论 {评论对象，[1:父;2:子]}
        call(nid, item) {

            // 新建评论的nid字段为父评论id;@username
            this.nid = nid
            this.callAuthor = item.author

            // 首先判断列表项有没有这个字段，没有的话就通过this.$set添加字段，然后进行取反，有这个字段的话直接取反
            if (!item.isShow) {
                this.$set(item, 'isShow', false)
                item.isShow = !item.isShow
            } else {
                 item.isShow = !item.isShow
            }

            // 关闭其他主面板
            this.commentList.forEach(i => {
                if (i._id !== item._id && i.isShow==true) {
                    i.isShow = false
                }

                // 关闭子评论面板
                i.childComments.forEach(i => {
                    if (i._id !== item._id && i.isShow==true) {
                        i.isShow = false
                    }
                });
            });
            
            // 滑动视距
            this.$nextTick(()=>{
                const ui = document.querySelector('.cardui')
                if(ui) {
                    this.$func.scrollInto('end', ui)
                    
                    setTimeout(() => {
                        if (!this.username) document.getElementsByClassName('vname')[0].focus()
                        else if (!this.email) document.getElementsByClassName('vemail')[0].focus()
                        else if (!this.usersite) document.getElementsByClassName('vusersite')[0].focus()
                        else ui.children[1].children[0].focus()
                    }, 300);
                }
            })
        },
        // 点击表情按钮
        callOwO(item) {
            // OwO
            if (!item.isShowOwO) {
                this.$set(item, 'isShowOwO', false)
                item.isShowOwO = !item.isShowOwO
            } else {
                 item.isShowOwO = !item.isShowOwO
            }
        },
        // 分页参数
        bindNextPre() {
            getPreById({id: this.$route.query.id}).then(result=>{
                this.preArt = result.data // 获取id，title，以及是否存在上一篇文章
                if(result.data.title && result.data.title.length > 7) {
                    this.preArt.title = result.data.title.slice(0, 7)+".."
                }
            }).catch(err=>{
                this.errMsg = err
            })
            getNextById({id: this.$route.query.id}).then(result=>{
                this.nextArt = result.data  // 获取id，title，以及是否存在下一篇文章
                if(result.data.title && result.data.title.length > 15) {
                    this.nextArt.title = result.data.title.slice(0, 15)+".."
                }
            }).catch(err=>{
                this.errMsg = err
            })
            
        },
        // 本地时区
        localDate(date) {
            const d = new Date(date || Date.now());
            d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
            return d.toISOString();
        },
        // 计算时间差
        timeAgo(timeA, timeB) {
            // 获取时间
                // const a = new Date(timeA)
                const b = timeB || new Date()
                //2022-03-29 23:51:27
                const aa = timeA.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').split(' ')
                const bb = b.toLocaleString().replaceAll('/', '-').split(' ')
                // 格式化数组
                let f = {
                    date: aa[0].split('-'),
                    time: aa[1].split(':')
                }
                let g = {
                    date: bb[0].split('-'),
                    time: bb[1].split(':')
                }

                f.date.forEach((i, index, arr) => {
                    arr[index]=parseInt(i)
                });
                f.time.forEach((i, index, arr) => {
                    arr[index]=parseInt(i)
                });
                g.date.forEach((i, index, arr) => {
                    arr[index]=parseInt(i)
                });
                g.time.forEach((i, index, arr) => {
                    arr[index]=parseInt(i)
                });


                let createAt = ''

                // 同年同月同日，判断时分秒差，显示 小时｜｜分钟｜｜秒数
                if (f.date[0]==g.date[0] && f.date[1]==g.date[1] && f.date[2]==g.date[2]) {
                    // 同时同分同秒
                    if (f.time[0]==g.time[0] && f.time[1]==g.time[1] && f.time[2]==g.time[2]) {
                        return createAt = '刚刚'
                    }
                    // 同时同分
                    if (f.time[0]==g.time[0] && f.time[1]==g.time[1]) {
                        return createAt = `${g.time[2]-f.time[2]} 秒前`
                    }
                    // 同时
                    else if (f.time[0]==g.time[0]) {
                        return createAt = `${g.time[1]-f.time[1]} 分钟前`
                    }
                    else return createAt = `${g.time[0]-f.time[0]} 小时前`
                }

                // 同年同月，判断天数差，显示月日
                else if (f.date[0]==g.date[0] && f.date[1]==g.date[1]) {
                    return createAt = `${f.date[1]}月 ${f.date[2]}日`
                }

                // 同年，显示 年月
                else if (f.date[0]==g.date[0]) {
                    return createAt = `${f.date[0]}年 ${f.date[1]}月`
                }

                // 不同年，显示 年月
                else {
                    return createAt = `${f.date[0]}年 ${f.date[1]}月`
                }

        },
        // 校验数据
        verifyUser() {
            if (!this.username || this.username.length > 10) {
                const a = document.getElementsByClassName('vname')[0]
                const b = document.getElementsByClassName('comInput')[0]
                if(a) a.focus() 
                else b.foucs()

                if(this.username.length > 10) {
                return this.$message.warning({message: '用户名不能大于10位!'})
            }
                
                return this.$message.warning({message: '请输入用户名!'})
            }
            
            if (!this.commentPost) {
                return this.$message.warning({message: '评论内容不能为空！'})
            }
        },
        // 提交评论
        submit(disComment) {

            if(this.verifyUser()) return

            insertComment({
                author: this.username,          // 暂时的：需要从token查询登陆了的用户信息
                callAuthor: this.callAuthor,    //  @用户
                aid: this.article._id,          // 文章id
                nid: this.nid,                  // 要回复评论的id
                content: this.commentPost,      // 内容 
                createAt: this.localDate(),     // 创建时间
                disComment: disComment||0       // 是否可以评论：0可以；1不可
            }).then(result=>{
                this.errMsg = ''
                this.$message.success({message: "评论成功！"})

                // 刷新评论 
                this.onLoadComent()
                this.$func.scrollInto('end')
            }).catch(err=>{
                this.$message.error({message: err})
                this.errMsg = err
            })
        },
        // 获取浏览器信息
        getBrowserWithUA(remoteUA, type) {
            let ua = ''
            let opera = window.opera
            if(remoteUA) {
                ua = remoteUA.toLowerCase()
            } else {
                ua = window.navigator.userAgent.toLowerCase()
            }
            let ostag = 'OtherOS'
            var browser = {
                ie: /(msie\s|trident.*rv:)([\w.]+)/.test(ua),
                //检测当前浏览器是否为Opera  
                opera: (!!opera && opera.version),
                //检测当前浏览器是否是webkit内核的浏览器  
                webkit: (ua.indexOf(' applewebkit/') > -1),
                msie: false,
                firefox: false,
                safari: false,
                chrome: false,
                netscape: false,
                appname: 'unknown',
                version: 0
            };
            
            // 判断操作系统
            if (/(win|mac|linux|android|iphone)\D+/.test(ua)) {
                ostag = RegExp.$1
            } 
            
            browser.core = (ua.indexOf(' applewebkit/') > -1) ? 'Webkit' : (navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie) ? 'Gecko' : browser.ie ? 'Trident' : 'Blink';
            if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
                browser[RegExp.$1] = true;
                browser.appname = RegExp.$1;
                browser.version = RegExp.$2;
            } else if (/version\D+(\d[\d.]*).*safari\D+(\d[\d.]*)/.test(ua)) {
                // safari
                browser.safari = true;
                browser.appname = 'safari';
                browser.version = RegExp.$2;
            }

            if(ostag == 'win') browser.appos = 'Windows NT'
            else if(ostag == 'mac') browser.appos = 'OSX'
            else if(ostag == 'linux') browser.appos = 'Linux'
            else if(ostag == 'android') browser.appos = 'Android'
            else if(ostag == 'iphone') browser.appos = 'iPhone'
            else browser.appos = ostag


            if (type) return browser.appname[0].toUpperCase()+browser.appname.substr(1)+browser.version.split('.')[0]+" "+browser.appos
            return {
                appname: browser.appname[0].toUpperCase()+browser.appname.substr(1),
                os: browser.appos,
                version: browser.version.split('.')[0],
                core: browser.core
            }
        },
        // 添加表情
        additionQwQ(e) {
            this.commentPost+=e.target.innerHTML
        },
        loadUser() {
            this.username = localStorage.getItem('_username')
            this.email = localStorage.getItem('_email')
            this.usersite = localStorage.getItem('_usersite')
        },
        setUser() {
            // 如果input blur则保存当前用户信息
            // console.log(this.username , this.email , this.usersite)
            if (this.username) {
               localStorage.setItem('_username', this.username)
            } 
            if (this.email) {
               localStorage.setItem('_email', this.email)
            } 
            if (this.usersite) {
               localStorage.setItem('_usersite', this.usersite)
            } 
        }
    },
    watch: {
        "$route"(to, from) {
            if(from.path == '/article') {
                this.onLoad()
                this.onLoadComent()
                this.bindNextPre()
                this.$func.scrollInto('')
            }
        },
    },
    created() {
        // 固定获取数据
        this.onLoad()
        this.bindNextPre()
        this.loadUser()
        this.onLoadComent()
    },
    mounted() {
        this.$bus.$on('onLoadComment', this.onLoadComent)
        
    }

}
</script>

<style lang="less" scoped>
// 文章元信息
.meta {
    font-size: .8em;
    padding: 20px 0 40px;

    * {
    text-decoration: none;
        color: var(--sm-secondary-color);
    }
    .item {
    margin-right: 10px;
    }
}

// 文章内容
.content {
    font-size: .875em;
    padding-top: 50px;
    h1 {
        font-size: 1.4em;
        padding: 0 5%;
        margin: 1em 0 0.8em;
        text-align: left;
        color: var(--sm-title-color);
    }
    .meta {
        padding: 20px 0 40px 5%;
    }

    .markdown-body {
        /* padding: 0 5% !important; */
        background: transparent !important;
        border: none !important;
    }
    
}

// 换页
.pager {
    text-align: center;
    overflow: auto;
    margin: 2em 0 0;
    border-top: var(--sm-page-line);
    font-size: .875em;

    a {
        padding: 20px 0;
        display: inline-block;
        color: var(--sm-primary-color);
        text-decoration: none;
        line-height: 1em;
        text-align: center;
        transition: .3s;
    }
    a:hover {
        color: var(--sm-main-color);
        background: var(--sm-dark-color);
        cursor: pointer;
        user-select: none;
    }
    .pre {
        float: left;
        text-align: left;
        width: 45%;
        padding-left: 5%;
    }
    .pre::before {
        content: "‹";
        font-size: 1.3em;
        padding-right: 5px;
        font-weight: 700;
        line-height: 1em;
    }
    .next {
        float: right;
        padding-right: 5%;
        text-align: right;
        width: 45%;
    }
    .next::after {
        content: "›";
        font-size: 1.3em;
        padding-left: 5px;
        font-weight: 700;
        line-height: 1em;
    }
}

// up span
.isAuthor {
    background: var(--sm-smilesl-bgcolor);
    color: var(--sm-smilesl-color) !important;
    font-size: 0.6em;
    padding: 0.2em;
    border-radius: 2px;
    user-select: none;
}


// 评论
.comments-bg {
    background-color: var(--sm-comment-bgcolor);

    .comments {
        max-width: 738px;
        margin: 0 auto;
        padding-top: 1.875rem;
        font-size: 16px;
        text-align: left;
        
        // 包裹面板
        .wrap {
            border-radius: 4px;
            margin-bottom: 10px;
            overflow: hidden;
            position: relative;
            padding: 10px;
            
            // 评论面板UI
            .adminui {
                max-width: 738px;
                // 信息录入
                .sheader {
                    width: 100%;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;

                    // 信息输入
                    .comInput {
                        position: relative;
                        width: 32.5%;
                        background: 0 0;
                        padding: 10px 5px;
                        outline:none;
                        resize: none;
                        border: none;
                        border-bottom: var(--sm-comment-line);
                        color: var(--sm-secondary-color);
                    }
                    .comInput:focus {
                        border-bottom: 1px dashed rgb(58, 58, 58);
                    }
                    .inputtag {
                        color: rgb(88, 88, 88);
                    }
                }

                // 编辑评论
                .sedit {
                    width: 100%;
                    padding-top: 10px;
                    #sediter {
                        color: var(--sm-secondary-color);
                        width: 100%;
                        min-height: 8.75em;
                        font-size: .875em;
                        background: 0 0;
                        resize: vertical;
                        border: none;
                        outline: none;
                        padding: 10px 5px;
                    }
                    #sediter:focus {
                        border-bottom: 1px solid var(--sm-main-color);
                    }
                }

                // 表情行
                .srow {
                    width: 100%;
                    font-size: 12px;
                    padding: 20px 0;
                    display: flex;
                    justify-content: flex-end;
                    svg {
                        fill: var(--sm-primary-color);
                    }
                    svg:hover {
                        fill: var(--sm-secondary-color);
                    }

                    .emoQAQ {
                        margin-top: 20px;
                        width: 100%;
                        display: flex;
                        .emoQAQ-logo {
                            position: relative;
                            display: inline-block;
                            color: #888;
                            border-radius: 4px;
                            font-size: 13px;
                            padding: 2px 5px;
                            cursor: pointer;
                            height: 22px;
                            box-sizing: border-box;
                            z-index: 2;
                            line-height: 13px;
                        }
                        .emoQAQ-box {
                            border: 1px solid #c4c4c487;
                            width: 100%;
                            border-radius: 4px;
                            .QWQ-items {
                                padding: 10px;
                                margin: 0;
                                overflow: scroll;
                                max-height: 197px;
                                transition: .3s;

                                &::-webkit-scrollbar{
                                    width: 0px;
                                    height: 0px;
                                }

                                .OwO-item {
                                    color: #0b0b0b;
                                    list-style-type: none;
                                    background: #e1e1e1;
                                    padding: 5px 10px;
                                    border-radius: 5px;
                                    display: inline-block;
                                    font-size: 12px;
                                    line-height: 14px;
                                    margin: 0 10px 12px 0;
                                    cursor: pointer;
                                    -webkit-transition: .3s;
                                    transition: .3s;
                                }
                            }
                            
                        }
                    }

                    .s-30 {
                        width: 30%;
                        display: flex;
                        align-items: center;
                        line-height: 16px;
                        &>* {
                            margin-right: 10px;
                        }
                        label {
                            display: flex;
                            color: var(--sm-comment-color);
                        }
                        input[type="checkbox"] {
                            outline: none;
                            border: 1px solid var(--sm-comment-color);
                            background: transparent;
                        }
                    }
                    .s-70 {
                        width: 70%;
                        button {
                            height: 30px;
                            width: 100px;
                            float: right;
                            background: var(--sm-comment-btncolor);
                            border: none;
                            color: var(--sm-main-color);
                        }
                    }
                }
                
                // 提交按钮
                .btn-srow {
                    padding: 10px 0;
                    border-bottom: 1px dashed #dedede;
                    button:hover {
                        cursor: pointer;
                    }
                }
                
                // empty
                .sempty {
                    padding: 1.25em;
                    color: #555;
                    text-align: center;
                    overflow: auto;
                }
            }

            // 评论展示
            .count {
                margin-top: 10px;
                font-size: 1.25em;
                font-weight: 600;
                color: var(--sm-main-color);
            }

            .scards {
                width: 100%;

                .comment-list {
                    margin-left: 1.25em;
                }
                // 一条评论
                .card {
                    position: relative;
                    padding-top: 1.25em;
                    display: block;
                    
                    // 用户头像
                    .simg {
                        padding: 0.125em;
                        border-radius: 15%;
                        margin-right: 0.725em;
                        float: left;
                        width: 3.125em;
                        height: 3.125em;
                        max-width: 100%;
                        user-select: none;
                    }

                    .small-img {
                        width: 2.225em;
                        height: 2.225em;
                    }

                    .card-border {
                        border-bottom: 1px dashed #dedede;
                    }
                    
                    // 评论内容展示
                    .sdetail {
                        overflow: hidden;
                        * {
                            color: #929298;
                        }
                        .shead {
                            line-height: 1.5;
                            font-size: .9em;
                            margin-top: 0;
                            &>span {
                                margin-right: 15px;
                            }
                        }
                        .smeta {
                            line-height: 1;
                            position: relative;
                            margin: 5px 0;

                            &> span {
                                font-size: .75em;
                            }

                            .call {
                                float: right;
                                cursor: pointer;
                                user-select: none;
                                position: relative;
                                &::after {
                                    content: '';
                                    position: absolute;
                                    top: -10px;
                                    bottom: -10px;
                                    left: -10px;
                                    right: -10px;
                                    // border: 2px solid green;
                                }
                                &:hover {
                                    color: #333;
                                }
                            }
                            
                        }
                        .scontent {
                            word-wrap: break-word;
                            word-break: break-all;
                            font-size: .95em;
                            color: #bbbbbb;
                            line-height: 2;
                            position: relative;
                            margin-bottom: 0.75em;
                            padding-top: 0.625em;

                            .callme {
                                color: #e91e63;
                                font-size: .9em;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>