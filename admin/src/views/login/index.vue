<template>
  <div class="login-container">
    <el-card class="login-container-card" header="请先登录">
      <el-form @submit.native.prevent="save">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" show-password type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" size="small">注册</el-button>
          <el-form-item style="float: right">
            <el-button type="danger" size="small">重置</el-button>
            <el-button type="primary" size="small" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      const { data } = await this.$http.post('login', this.model);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('nickname', data.nickname);
      this.$router.push('/goods/list')
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/login.jpg") no-repeat center;
  background-size: cover;
}
.login-container-card {
  margin-top: -10rem;
  width: 30rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.7);
}
</style>