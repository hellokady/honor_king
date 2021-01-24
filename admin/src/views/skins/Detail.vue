<template>
  <div class="skins-container">
    <h2>{{ id ? "编辑" : "新建" }}皮肤</h2>
    <el-form size="small" label-width="150px" @submit.native.prevent="save">
      <el-form-item label="皮肤名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="皮肤图片">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'upload'"
          :show-file-list="false"
          :on-success="afterUplaod"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.picture" :src="model.picture" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        ? await this.$http.put(`rest/skins/${this.id}`, this.model)
        : await this.$http.post("rest/skins", this.model);
      data.success && this.$router.push("/skins/list");
    },
    async fetchDetail() {
      const { data } = await this.$http.get(`rest/skins/${this.id}`);
      if (!data) return false;
      this.model = data.detail;
    },
    async fetchList() {
      const { data } = await this.$http.get("rest/skins");
      if (!data) return false;
      this.parents = data.list;
    },
    afterUplaod(res) {
      if(res.success) {
        this.$message({
          type: 'success',
          message: res.message
        })
        this.$set(this.model, 'picture', res.url) //data数据中对象中没有的属性不会被监听到响应
      }
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  },
  created() {
    this.fetchList();
    this.id && this.fetchDetail();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px!important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>