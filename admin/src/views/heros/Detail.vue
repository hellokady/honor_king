<template>
  <div class="heros-container">
    <h2>{{ id ? "编辑" : "新建" }}英雄</h2>
    <el-form size="small" label-width="150px" @submit.native.prevent="save">
      <el-tabs>
        <el-tab-pane label="基本信息">
          <el-form-item label="英雄名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="英雄类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="英雄头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="afterUplaod"
              :headers="getAuthHeaders()"
            >
              <img v-if="model.picture" :src="model.picture" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.5rem"
              :max="9"
              show-score
              v-model="model.scores.difficlut"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.5rem"
              :max="9"
              show-score
              v-model="model.scores.skill"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.5rem"
              :max="9"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.5rem"
              :max="9"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.followGoods" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.againstGoods" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usegeTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能管理">
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row>
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img
                    v-if="item.icon"
                    :src="item.icon"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="mini" @click="model.skills.splice(i,1)" >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
        scores: {}, //对象多层级嵌套访问会出现undefined
        skills: []
      },
      categories: [],
      items: [],
    };
  },
  watch: {
    $route(newRoute) {
      if (!Object.keys(newRoute.params).length) this.model = {
        scores: {}, //对象多层级嵌套访问会出现undefined
        skills: []
      };
    },
  },
  methods: {
    async save() {
      const { data } = this.id
        ? await this.$http.put(`rest/heros/${this.id}`, this.model)
        : await this.$http.post("rest/heros", this.model);
      data.success && this.$router.push("/heros/list");
    },
    async fetchDetail() {
      const { data } = await this.$http.get(`rest/heros/${this.id}`);
      if (!data) return false;
      // this.model = data.detail;  // 这里直接赋值会替换掉data里面的model
      this.model = Object.assign({}, this.model, data.detail);
    },
    async fetchCateList() {
      const { data } = await this.$http.get("rest/categories");
      if (!data) return false;
      this.categories = data.list;
    },
    async fetchItemList() {
      const { data } = await this.$http.get("rest/goods");
      if (!data) return false;
      this.items = data.list;
    },
    afterUplaod(res) {
      if (res.success) {
        this.$message({
          type: "success",
          message: res.message,
        });
        this.$set(this.model, "picture", res.url); //data数据中对象中没有的属性不会被监听到响应
      }
    }
  },
  created() {
    this.fetchCateList();
    this.fetchItemList();
    this.id && this.fetchDetail();
  },
};
</script>

<style scoped>
.avatar-uploader-icon,
.avatar {
  width: 5rem;
  height: 5rem;
}
.avatar-uploader-icon{
  line-height: 5rem!important;
}
</style>