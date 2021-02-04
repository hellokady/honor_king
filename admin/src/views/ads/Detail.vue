<template>
  <div class="ads-container">
    <h2>{{ id ? "编辑" : "新建" }}广告</h2>
    <el-form size="small" label-width="150px" @submit.native.prevent="save">
      <el-form-item label="广告名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告位
        </el-button>
      </el-form-item>
      <el-row>
        <el-col :md="24" v-for="(item, i) in model.items" :key="i">
          <el-form-item label="跳转链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="广告图">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(item, 'image', res.url)"
            >
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              size="mini"
              @click="model.items.splice(i, 1)"
              >删除</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
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
      model: {
        items: []
      }
    };
  },
  watch: {
    $route(newRoute) {
      if (!Object.keys(newRoute.params).length) this.model = {
        items: []
      };
    },
  },
  methods: {
    async save() {
      const { data } = this.id
        ? await this.$http.put(`rest/ads/${this.id}`, this.model)
        : await this.$http.post("rest/ads", this.model);
      data.success && this.$router.push("/ads/list");
    },
    async fetchDetail() {
      const { data } = await this.$http.get(`rest/ads/${this.id}`);
      if (!data) return false;
      this.model = Object.assign({}, this.model, data.detail);
    }
  },
  created() {
    this.id && this.fetchDetail();
  },
};
</script>

<style scoped>
.avatar {
 min-width: 300px;
}
</style>
