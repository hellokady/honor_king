<template>
  <el-table :data="list">
    <el-table-column prop="_id" label="物品ID"> </el-table-column>
    <el-table-column prop="name" label="物品名称"> </el-table-column>
    <el-table-column prop="icon" label="物品图标">
      <template slot-scope="scope">
          <img
          style="height: 3rem; border-radius: .5rem;" 
          :src="scope.row.icon" 
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
      const { data } = await this.$http.get("rest/goods");
      if (!data) return false;
      this.list = data.list;
    },
    edit(id) {
      this.$router.push(`/goods/edit/${id}`)
    },
    remove(row) {
      this.$confirm(`此操作将永久删除"${row.name}"物品, 是否继续?`, '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data } = await this.$http.delete(`rest/goods/${row._id}`)
        data.success && this.fecthList()
      }).catch(err => err)
    }
  },
  created() {
    this.fecthList();
  },
};
</script>