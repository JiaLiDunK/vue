<template>
    <div class="topmenu">
      <el-row>
        <el-col :span="8" class="logo-container">
          <span class="title">ViaBTC 后台管理系统</span>
        </el-col>
        <el-col :span="16" class="menu">
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#324057"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect"
          >
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">
                <a href="#/components/split-pane">分割线</a>
              </el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4">
              <a href="https://www.ele.me" target="_blank">订单管理</a>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  export default {
    components: {
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    computed: {
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        console.log(this.permission_routes)
      },
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .topmenu {
    width: 100%;
    height: 62px;
    min-width: 600px;
    background: #324057;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
  
    .logo-container {
      line-height: 60px;
      min-width: 200px;
  
      .logo {
        height: 50px;
        width: 50px;
        margin-right: 5px;
        vertical-align: middle;
        display: inline-block;
      }
  
      .title {
        vertical-align: middle;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        letter-spacing: 3px;
      }
    }
  
    .menu {
      .el-submenu {
        // 这个用于保持一级菜单之间的间距
        padding: 0 20px;
      }
    }
  }
  </style>