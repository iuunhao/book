<template>
  <div>
    <div class="wrap loginWrap">
      <div class="login">
        <div class="login__item">
          <div class="login__title">
            管理员登陆
          </div>
        </div>
        <div class="login__item">
          <label class="login__label" for="">
            <span class="login__span">账户</span>
            <div class="login__inpBox">
              <input class="login__inp" v-model="userName" type="text">
            </div>
          </label>
        </div>
        <div class="login__item">
          <label class="login__label" for="">
            <span class="login__span">密码</span>
            <div class="login__inpBox">
              <input class="login__inp" v-model="pwd" type="text">
            </div>
          </label>
        </div>
        <div class="login__item">
          <div class="login__btns">
            <a class="login__btn" href="javascript:;" @click="loginBtn">登陆</a>
            <a class="login__btn" href="">取消</a>
          </div>
        </div>
        {{msg}}
        <div class="footer">
          <p>版权所有</p>
          <p>Copyright © WNCSS.com. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BookList from '@/views/BookList';
import axios from 'axios';
export default {
  name: 'admin',
  data() {
    return {
      userName: 'admin',
      pwd: 'wasd',
      msg: ''
    }
  },
  mounted() {
    axios.post("/api/login").then(response => {
      var res = response.data;
      if (res.status === '0') {
        this.msg = res.msg;
        this.$router.push({ name: 'admin' })
      }
    })
  },
  components: {
    BookList
  },
  methods: {
    loginBtn() {
      if (this.userName && this.pwd) {
        axios.post("/api/login", {
          userName: this.userName,
          pwd: this.pwd
        }).then(response => {
          var res = response.data;
          if (res.status === '0') {
            this.msg = res.msg;
            this.$router.push({ name: 'admin' })
          } else {
            this.msg = res.msg
            this.pwd = '';
          }
        })
      }else{
        this.msg = '请填写用户名与密码'
      }
    }
  }
}

</script>
<style scoped>


</style>
