<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="@/assets/img/logo.png" alt=""></h1> 
    <el-menu default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose"
     background-color="transparent" 
     text-color="#fff" 
     :router="true"
     :collapse="isCollapse"
     >
  <template v-for="(item,index) in routers" >
    <el-submenu  :key="item.id" v-if="!item.hidden" :index="index + ''">
      <!-- 一级菜单 -->
      <template slot="title">
        <!-- <i class="el-icon-location"></i> -->
        <svg-icon :iconClass="item.meta.icon" :className="item.meta.name" />
        <span slot="title">{{item.meta.name}}</span>
      </template>
      <!-- 子级菜单  -->
      <el-menu-item v-for="(subMenu) in item.children" :key="subMenu.id" :index="subMenu.path">{{subMenu.meta.name}}</el-menu-item>

    </el-submenu>
  </template>
</el-menu>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name:'navMenu',
  setup(props, {refs,root}){
    /**
     * data 数据
     */
    const routers = reactive(root.$router.options.routes);
    const isCollapse = computed(()=>root.$store.state.login.isCollapse);

    /**
     * 函数
     */
    const handleOpen = ((key,keyPath)=>{
      console.log(key, keyPath);
    });
    const handleClose = ((key, keyPath) => {
        console.log(key, keyPath);
    });
    return {
      isCollapse,
      handleClose,
      handleOpen,
      routers
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/config.scss";
// @import url('../../../src/assets/style/config.scss');
.logo{
  text-align: center;
  img{
    width: 92px;
    margin: 28px auto 25px;
    @include webkit(transition,all .3s ease 0s);
  }
}
#nav-wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition,all .3s ease 0s);
  svg{
      font-size: 20px;
      margin-right: 10px;
    }
}
.open{
  #nav-wrap{
    width: $navMenu;
  }
}
.close{
  #nav-wrap{
    width: $navMenuMin;
  }
  .logo{
  text-align: center;
  img{
    width:70%;
  }
}
}
</style>
