<template>
  <div class="login-container">
    <el-card class="login-container-card" header="请先登录" v-if="!isRegister">
      <el-form @submit.native.prevent="save">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" show-password type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" size="small" @click="openRegisterCard">注册</el-button>
          <el-form-item style="float: right">
            <el-button type="danger" size="small" @click="reset(model)">重置</el-button>
            <el-button type="primary" size="small" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="login-container-card" header="注册用户" v-else>
      <el-form @submit.native.prevent="register">
        <el-form-item label="用户名">
          <el-input v-model="registerModel.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="registerModel.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerModel.password" show-password type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" size="small" @click="isRegister = false">返回</el-button>
          <el-form-item style="float: right">
            <el-button type="danger" size="small" @click="reset(registerModel)">重置</el-button>
            <el-button type="primary" size="small" native-type="submit">注册</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  data() {
    return {
      model: {},
      registerModel: {},
      isRegister: false
    };
  },
  methods: {
    async save() {
      const { data } = await this.$http.post('login', this.model);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('nickname', data.nickname);
      this.$router.push('/goods/list')
    },
    async register() {
      const data = await this.$http.post('register', this.registerModel);
      if (data) {
        this.isRegister = false;
      }
    },
    reset(data) {
        for (const k of Object.keys(data)) {
          Vue.delete(data, k);
        }
    },
    openRegisterCard() {
      this.isRegister = true;
    }
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