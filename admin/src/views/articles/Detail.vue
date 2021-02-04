<template>
  <div class="articles-container">
    <h2>{{ id ? "编辑" : "新建" }}文章</h2>
    <el-form size="small" label-width="150px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
         <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <!-- 富文本编辑器 -->
        <vue-editor
        v-model="model.body"
        useCustomImageHandler
        @image-added="editorUpload"
        ></vue-editor>
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
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  watch: {
    $route(newRoute) {
      if (!Object.keys(newRoute.params).length) this.model = {};
    },
  },
  methods: {
    async fecthCateList() {
      const { data } = await this.$http.get("rest/categories");
      if (!data) return false;
      this.categories = data.list;
    },
    async save() {
      const { data } = this.id
        ? await this.$http.put(`rest/articles/${this.id}`, this.model)
        : await this.$http.post("rest/articles", this.model);
      data.success && this.$router.push("/articles/list");
    },
    async fetchDetail() {
      const { data } = await this.$http.get(`rest/articles/${this.id}`);
      if (!data) return false;
      this.model = data.detail;
    },
    // 富文本编辑器图片上传
    async editorUpload(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await this.$http.post('upload', formData);
      Editor.insertEmbed(cursorLocation, "image", data.url);
      resetUploader();
    }
  },
  created() {
    this.fecthCateList();
    this.id && this.fetchDetail();
  }
};
</script>
