import {Login} from "@/api/login";
import {setToken,getToken,setUsername,getUsername} from "@/assets/utils/app.js";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  token: getToken() || "",
  username: getUsername() || ""
};
const getters = {
  isCollapse: state => state.isCollapse
};
const mutations = {
  SET_COLLAPSE(state){
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state,value){
    state.token = value;
  },
  SET_USERNAME(state,value){
    state.username = value;
  }
};
const actions = {
  login(content,requestData){
    return new Promise((resolve,reject) => {
      Login(requestData).then(res => {
        const data = res.data.data;
        console.log(data);
        content.commit("SET_TOKEN",data.token);
        content.commit("SET_USERNAME",data.username);
        setToken(data.token);
        setUsername(data.username);
        resolve(res);
      }).catch(err => reject(err));
    })
  }
};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
};