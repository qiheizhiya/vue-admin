import axios from 'axios';
import {Message} from 'element-ui';
import {getToken, getUsername} from "@/assets/utils/app";
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';
// 创建 axios ，赋给变量service
const service = axios.create({
  baseURL: BASEURL,
  timeout:15000,
});

// 添加请求拦截器
service.interceptors.request.use(function(config){
  // 在发送请求之前做些什么
  config.headers['Tokey'] = getToken();
  config.headers['UserName'] = getUsername();
  return config;
},function(err){
  // 对请求错误做些什么
  return Promise.reject(err);
});

// 添加响应拦截器
service.interceptors.response.use(function(response){
  let data = response.data;
  if(data.resCode !== 0){
    Message.error(data.message);
    return Promise.reject(data);
  }
  
  // 对响应数据做点什么
  return response;
},function(err){
  // 对相应错误做点什么
  return Promise.reject(err);
});



export default service;