<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app,
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app > .el-container {
  height: 100% !important;
}
#app > .el-container > .el-aside {
  overflow-x: hidden !important;
}
</style>
