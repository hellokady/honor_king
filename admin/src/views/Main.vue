<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router @open="i => menuList[0] = i" :default-openeds="menuList" unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-tickets"></i>内容管理
          </template>

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

          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-phone-outline"></i>运营管理
          </template>

          <el-menu-item-group>
            <template slot="title">广告</template>
            <el-menu-item index="/ads/list">广告列表</el-menu-item>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>系统设置
          </template>

          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/category/list">分类列表</el-menu-item>
            <el-menu-item index="/category/create">新建分类</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span style="float: left;">{{nickName}}</span>
        <el-button type="text" size="small" @click="loginOut">退出登录</el-button>
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
    return {
      nickName: sessionStorage.getItem('nickname'),
      menuList: []
    };
  },
  methods: {
    async loginOut() {
      await this.$http.post('loginout');
      sessionStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>