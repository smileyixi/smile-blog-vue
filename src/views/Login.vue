<template>
  <el-container>
    <transition name="el-zoom-in-center">
      <div class="bg" v-show="bgShow"></div>
    </transition>

    <el-main>
      <div class="box">
        <div class="inputs">
          <el-input
          class="i1"
          style="margin-bottom:40px"
          clearable
          v-model="businessUser"
          placeholder="请输入主体商家账户"
          @keyup.enter.native="login"
          ></el-input>
          <el-input
          class="i2"
          style="margin-bottom:10px"
          v-model="businessPwd"
          show-password
          placeholder="请输入主体商家密码"
         @keyup.enter.native="login"
          ></el-input>
          <!-- 点击提示box -->
          <div class="font_Regular_Text font_Last_Size"
          style="display:flex;justify-content: space-between;">
            <div class="font_Primary_Text">Time:{{dateFormat(newDate)}}</div>
            <div class="btn-point" @click="dialogVisible = true">忘记了密码？</div>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <span>请发送申请到管理员邮箱</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">发 送</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
        
        <div>
          <button class="btn-base btn_login btn-point" @click="login">登录</button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Cookie from 'js-cookie'
import anime from 'animejs'
export default {
  name: "Login",
  data() {
    return {
      businessUser: '',  // 商户账户
      businessPwd: '',   // 商户密码
      bgShow: false,     // 背景展示
      dialogVisible: false,   // 显示提示
      newDate: new Date(),    // 时间
      timer: '',              // 定时器
      token: ''
    };
  },
  methods: {
    // login
    login() {
      if (!this.businessUser || !this.businessPwd) {
        this.$message.error('请输入完整登陆信息！')
      }
      else {
        this.token = nanoid()
        this.$store.commit('user/loginIn',{
          phone: this.businessUser,
          passwd: this.businessPwd,
          token: this.token,
          isStorer: true
        })
        if(this.$store.getters['user/verifyToken'](this.token, true)) {
          this.$message.success('登陆成功！')
          this.$router.push('/manageStorer')
        } else {
          this.$message.error(this.$store.getters['user/getErr'])
        }
      }
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    dateFormat(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let wk = date.getDay()
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      let week = weeks[wk]
      // 拼接
      return year + "-" + month + "-" + day + "-" + " " + hours + ":" + minutes + ":" + seconds;
      // return year + "年" + month + "月" + day + "日" + " " + hours + ":" + minutes + ":" + seconds + ' ' + week;
    },
    // 判断浏览器是否存在token
    isTokenToIndex() {
      // console.log(Cookie.get('token'))
      if(Cookie.get('token')) {
        // this.$router.push('/index')
        this.$message({
          message: '你已经登陆过了,快去招揽生意吧✧(≖ ◡ ≖✿)',
          type: 'warning',
          duration: 1500
        });
      }
    },
  },
  // computed: {
  //     ...mapState({business: state => state.user.storers})
  //   },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  mounted() {
    this.bgShow = true
    //显示当前日期时间
    let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.newDate = new Date(); // 修改数据date
    }, 1000)
    this.isTokenToIndex()
    
  }
};
</script>

<style lang="less" scoped>
.el-container {
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  flex-direction: column;
  align-items: center;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -9999;
    height: 100%;
    width: 50%;
    background: rgb(154, 154, 154);
  }

  .grass {
    clip-path: inset(200px 200px);
    filter: blur(20px);
  }
}
.el-main {
  width: 100%;

  // 登陆区
  .box {
    width: 30%;
    min-width: 600px;
    height: 710px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px auto;

    > div {
      margin: 0 auto 40px auto;
    }

    .inputs {

      /deep/ input {
        border-radius: 0;
        border: 1px solid #b1b1b1;
        height: 40px;
        width: 400px;
      }
      /deep/ input:focus {
        border: 1px solid rgb(124, 124, 124);
      }
    }

    .btn_login {
      background: none;
      border: 1px solid rgb(103, 103, 103);
    }

    .btn_login:hover {
      background: rgb(124, 124, 124);
      border: none;
      color: white;
    }
  }
}

</style>