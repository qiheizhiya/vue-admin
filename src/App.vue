<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/style/config.scss";
.black-space-30 {height: 30px};
 .el-submenu .el-menu-item{
  font-size: 14px;
  padding-left: 50px !important;
  &.is-active{
    background-color: rgba(245,108,108,.2) !important;
  }
}
  
  .is-active.is-opened .el-submenu__title {
    background-color: $mainColor !important; 
  }
  .close{
    .el-submenu {
      &.is-opened {
        > .el-submenu__title {
          background-color: $mainColor !important; 
        }
      }
    }
  }
  .el-menu--vertical{
    .el-menu{background-color:#f56c6c3d !important ;}
    .el-menu-item {line-height: 56px;}
    .el-menu-item:hover { background-color: $mainColor !important}
  }
  // dialog 样式
  .el-dialog__body {
    padding: 30px 47px !important;
  }
  .el-dialog__footer{
    text-align: center !important;
    padding-bottom: 50px !important;
    .el-button {
      width: 150px;
      margin: 0 11px;
    }
  }
  // form 样式
  .el-form {
    .el-form-item:last-child{
      margin-bottom: 0 !important;
    }
  }
</style>
