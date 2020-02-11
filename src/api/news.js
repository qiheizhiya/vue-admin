import service from '@/assets/utils/request';
/**
 * 信息管理的
 */
/**
 * 新增信息内容
 */
export function addContentApi(data){
  return service.request({
    method: "post",
    url: "/news/add/",
    data:data
  })
}
/**
 * 信息管理文章列表
 */
export function getNewsContentApi(data){
  return service.request({
    method: "post",
    url: "/news/getList/",
    data:data
  })
}
/** 
 * 信息分类的
*/
/**
 * 列表
 */
export function getLists(data){
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data:data
  })
}
/**
 * 新增
 */
export function addNewsItem(data){
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data:data
  })
}
/**
 * 编辑
 */
export function editOuterApi(data){
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data:data
  })
}
/**
 * 删除
 */
export function removeOuterApi(data){
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data:data
  })
}