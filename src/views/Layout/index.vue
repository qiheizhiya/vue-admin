<template>
  <div class="layout" :class="[menuState ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
import { reactive, ref, onMounted,computed } from "@vue/composition-api";
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main';
import LayoutNav from './Components/Nav';
export default {
  name: 'layout',
  // eslint-disable-next-line vue/no-unused-components
  components: {LayoutHeader, LayoutMain, LayoutNav},
  setup(props,{root}){
    const menuState = computed(()=>root.$store.state.login.isCollapse);
    return {
      menuState
    }
  },
  
}
</script>

<style lang="scss" scoped>
</style>