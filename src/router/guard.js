import router from "./index.js";
import Cookie from "cookie_js";
import {getToken} from "@/assets/utils/app.js";
const whiteRouter = ['/login'];

router.beforeEach((to,from,next) => {
  if(getToken()){
    console.log("通过");
    next();
  }else{
    console.log("不通过");
    if(whiteRouter.includes(to.path)){
      next();
    }else{
      next('/login');
    }
  }

})
