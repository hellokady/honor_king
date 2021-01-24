<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>后台管理
          </template>

          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/category/list">分类列表</el-menu-item>
            <el-menu-item index="/category/create">新建分类</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/goods/list">物品列表</el-menu-item>
            <el-menu-item index="/goods/create">新建物品</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">皮肤</template>
            <el-menu-item index="/skins/list">皮肤列表</el-menu-item>
            <el-menu-item index="/skins/create">新建皮肤</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heros/list">英雄列表</el-menu-item>
            <el-menu-item index="/heros/create">新建英雄</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {};
  },
};
</script>