<template>
  <div>
    <div class="adminBar">
      <div class="">
        欢迎<em class="Em">{{userName}}</em>管理员
      </div>
      <a href="" class="logout">显示全部</a>
      <a class="logout" href="javascript:;" @click="logout">退出</a>
    </div>
    <book-list v-if="isLogin" :isRoot="isLogin"></book-list>
  </div>
</template>
<script>
import BookList from '@/views/BookList';
import axios from 'axios';
export default {
  name: 'admin',
  data() {
    return {
      isLogin: false,
      userName: ''
    }
  },
  mounted() {
    axios.post("/api/login", {}).then(response => {
      var res = response.data;
      console.log(res);
      if (res.status === '0') {
        this.isLogin = true;
        this.userName = res.result.userName;
      } else {
        this.$router.push({ name: 'login' })
      }
    })
  },
  methods: {
    logout() {
      axios.get('/api/logout').then(response => {
        this.$router.push({ name: 'booklist' })
      })
    }
  },
  components: {
    BookList
  }
}
</script>
<style scoped lang="less">
.adminBar {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: #fff;
  font-size: 12px;
  color: #999;
  .logout {
    font-size: 12px;
    color: #888;
    display: block;
    padding: 0 12px;
  }
  .Em {
    color: #f80;
    font-style: normal;
    padding: 0 4px;
  }
}

</style>
