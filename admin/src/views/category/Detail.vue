<template>
  <div class="category-container">
    <h2>{{ id ? "编辑" : "新建" }}分类</h2>
    <el-form size="small" label-width="150px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="model.name"></el-input>
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
      parents: [],
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
        ? await this.$http.put(`rest/categories/${this.id}`, this.model)
        : await this.$http.post("rest/categories", this.model);
      data.success && this.$router.push("/category/list");
    },
    async fetchDetail() {
      const { data } = await this.$http.get(`rest/categories/${this.id}`);
      if (!data) return false;
      this.model = data.detail;
    },
    async fetchList() {
      const { data } = await this.$http.get("rest/categories");
      if (!data) return false;
      this.parents = data.list;
    },
  },
  created() {
    this.fetchList();
    this.id && this.fetchDetail();
  },
};
</script>
