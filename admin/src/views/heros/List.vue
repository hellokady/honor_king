<template>
  <el-table :data="list">
    <el-table-column prop="_id" label="英雄ID"> </el-table-column>
    <el-table-column prop="name" label="英雄名称"> </el-table-column>
    <el-table-column prop="picture" label="英雄头像">
      <template slot-scope="scope">
          <img
          style="height: 3rem; border-radius: .5rem;" 
          :src="scope.row.picture" 
          :alt="scope.row.name" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="edit(scope.row._id)">编辑</el-button>
        <el-button type="text" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async fecthList() {
      const { data } = await this.$http.get("rest/heros");
      if (!data) return false;
      this.list = data.list;
    },
    edit(id) {
      this.$router.push(`/heros/edit/${id}`)
    },
    remove(row) {
      this.$confirm(`此操作将永久删除"${row.name}"英雄, 是否继续?`, '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data } = await this.$http.delete(`rest/heros/${row._id}`)
        data.success && this.fecthList()
      }).catch(err => err)
    }
  },
  created() {
    this.fecthList();
  },
};
</script>