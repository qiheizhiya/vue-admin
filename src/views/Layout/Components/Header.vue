<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="changeMenu">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right ">
      <div class="user-img pull-left"><img src="@/assets/img/touxiang.jpg" alt=""></div>
     <!-- <img src="@/assets/img/touxiang.jpg" alt=""> -->
     <div class="user-info pull-left">{{username}}</div>
     <div class="header-icon pull-left"> <svg-icon iconClass="exit" className="exit" /></div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted ,computed} from "@vue/composition-api";
export default {
  name:'Header',
  setup(props,{root}){
    const changeMenu = () => root.$store.commit('login/SET_COLLAPSE');
    const username = computed(() => root.$store.state.login.username);
    return {
      changeMenu,
      username
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/config.scss";
#header-wrap{
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  @include webkit(box-shadow,0 3px 16px 0 rgba(0,0,0,.1));
  @include webkit(transition,all .3s ease 0s);
  line-height: 75px;
}
.open {
  #header-wrap {left:$navMenu};
}
.close {
  #header-wrap {left:$navMenuMin};
}
.header-icon{
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info{
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon{
    padding: 0 28px;
  }

}
.user-img{
  width: 50px;
  height: 50px;
  margin-top: 10px;
  border-radius: 50%;
  img{
    width: 100%;
    border-radius: 50%;
  }
}

.pull-left{
  float: left;
}
.pull-right{
  float: right;
}
</style>