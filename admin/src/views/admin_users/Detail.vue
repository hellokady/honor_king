<template>
  <div class="admin_users-container">
    <h2>{{ id ? "编辑" : "新建" }}管理员</h2>
    <el-form size="small" label-width="150px" @submit.native.prevent="save">
      <el-form-item label="管理员名称">
        <el-input v-model="model.nickname"></el-input>
      </el-form-item>
      <el-form-item label="管理员账号">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input  v-model="model.password"></el-input>
        <!-- <el-input type="password" v-model="model.password"></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary" size="small">
          {{ id ? "编辑" : "新建" }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {},
    };
  },
  watch: {
    $route(newRoute) {
      if (!Object.keys(newRoute.params).length) this.model = {};
    },
  },
  methods: {
    async save() {
      const { data } = this.id
        ? await this.$http.put(`rest/admin_users/${this.id}`, this.model)
        : await this.$http.post("rest/admin_users", this.model);
      data.success && this.$router.push("/admin_users/list");
    },
    async fetchDetail() {
      const { data } = await this.$http.get(`rest/admin_users/${this.id}`);
      if (!data) return false;
      this.model = data.detail;
    }
  },
  created() {
    this.id && this.fetchDetail();
  },
};
</script>
