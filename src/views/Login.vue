<template>
  <section class="continer">
    <div class="box">
      <header>
        <h2>Login</h2>
      </header>
      <main>
        <div><input @keydown.enter="verifyUser" type="text" placeholder="username" v-model="username"></div>
        <div><input @keydown.enter="verifyUser" type="password" placeholder="password" v-model="password"></div>
        <button id="btn_login" @click="verifyUser">SIGN</button>
      </main>
      <footer>
        <p>{{dailyPost}}</p>
        
      </footer>
    </div> 
  </section>
</template>

<script>
import anime from 'animejs'
import { login } from '../request/userApi'
import Cookie from 'js-cookie'

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      dailyPost: '簌簌冰上花，灿灿耀金华  —— 霜冷'
    }
  },
  methods: {
    toRouter() {
      this.$router.push({
        path: `/smilesl?createAt=${new Date()}`
      })
    },
    verifyUser() {
      if(this.username && this.password) {
        login({username:this.username, password:this.password}).then(result=>{
          if(result.data.token) {
            this.$message.success({message:"登陆成功！"})

            // 保存token和用户, token创建时间
            this.$store.commit('setUserInfo', {
              user: result.data.user,
              token: result.data.token,
              createTime: result.data.createTime
            })

            // 跳转到后台
            this.toRouter()

          } else {
            this.$message.error({message:"登陆失败！"})
          }
        })
      } else {
        this.$message.warning({message: "请填写完整的用户信息"})
      }
      
    },
    // 在这里处理token
    onLoad() {
      const token = this.$store.state.token || Cookie.get('token')
      if (token) {
        this.$message.info('你已经登陆过了')
      }
    }
  },
  mounted() {
    this.onLoad()
  }

}
</script>

<style lang="less" scoped>

.continer {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--sm-dark-color);
}

.box {
  height: 500px;
  width: 350px;

  // login string
  header {
    h2 {
      margin: 50px 0 30px 0;
      text-align: center;
      color: var(--sm-smilesl-bgcolor);
      text-shadow: 2px 2px 0px rgb(154, 53, 243);
    }
  }
  // 输入用户名和密码
  main {
    display: flex;
    align-items: center;
    flex-direction: column;
    input {
      width: 250px;
      height: 40px;
      border: none;
      margin: 10px;
      border-radius: 20px;
      padding: 0 20px;
      outline: none;
      color: rgb(5, 15, 30);
      font-weight: 600;
      position: relative;
      text-align: center;
      transition: .3s;

      // 输入框聚焦
      &:focus {
        box-shadow: 1px 1px 5px var(--sm-smilesl-bgcolor);
        width: 300px;
      }
    }
    #btn_login,#btn_register {
      height: 35px;
      width: 100px;
      border-radius: 30px;
      border: none;
      outline: none;
      background: var(--sm-smilesl-bgcolor);
      color: var(--sm-smilesl-color);
      font-weight: bold;
      font-size: .9em;
      margin: 20px 0;
      cursor: pointer;
      transition: .3s;

      &:hover, &:focus {
        background: var(--sm-smilesl-selected-bgcolor);
      }
    }
    
  }

  // 每日一句
  footer {
      p {
        text-align: center;
        color: var(--sm-primary-color);
        font-size: .8m;
        border-bottom: var(--sm-comment-line);
      }
  }
}
</style>