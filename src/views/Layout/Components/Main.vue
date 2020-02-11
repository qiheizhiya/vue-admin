<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content"><router-view /></div>
    </div>
    
    
  </div>
</template>
<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/config.scss";
#main-wrap{
  height: 100vh;
  background: #f7f7f7;
  // position: fixed;
  // left: $navMenu;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // box-sizing: border-box;
  // -webkit-box-sizing: border-box;
}
.open{
  .main-content {padding-left: $navMenu + 30;}
}
.close{
  .main-content {padding-left: $navMenuMin + 30;}
}
.main-content{
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30; 
  padding-right: 30px;
  @include webkit(transition,all .3s ease 0s);
  @include webkit(box-sizing,border-box);
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
</style>