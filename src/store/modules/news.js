import { getLists } from "@/api/news";
const actions = {
  getListsStore(content,requestData = {}){
    return new Promise((resolve,reject) => {
      getLists(requestData).then(res => {
        resolve(res.data.data);
      })
    })
  },
};

export default {
  namespaced:true,
  actions
};