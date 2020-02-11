<template>
  <div id="category">
    <el-button type="danger" @click="addFirstClassify">添加一级分类</el-button>
    <hr class="hr-e9e9e9">
    <el-row>
      <el-col :span="8">
        <div class="category-wrap">
          <div class="category" v-for="(outerItem,outerIndex) in requestData.item" :key="outerItem.id">
            <h4>
              <svg-icon icon-class="add"></svg-icon>
              {{outerItem.category_name}}
              <div class="button-group">
                <el-button size="mini" type="danger" round @click="editOuter(outerIndex,outerItem)">编辑</el-button>
                <el-button size="mini" type="success" round>添加子级</el-button>
                <el-button size="mini"  round @click="removeOuter(outerIndex,outerItem.id)">删除</el-button>
              </div>
            </h4>
            <ul>
              <li v-for="(insideItem,insideIndex) in outerItem.children" :key="insideItem.id">
                {{insideItem.category_name}}
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini"  round @click="removeInside(outerIndex,insideIndex)">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form label-position="labelPosition" label-width="142px" class="form-wrap">
          <el-form-item label="一级分类名称：" v-if="firstNameShow">
            <el-input v-model="formLabelAlign.oneName" :disabled="firstNameDisabled"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称：" v-if="secondNameShow">
            <el-input v-model="formLabelAlign.twoName" :disabled="secondNameDisabled"></el-input>
          </el-form-item>
           <el-form-item >
             <el-button type="danger" @click="submit" :disabled="submitButtonDisabled" :loading="submitButtonLoading">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive , onMounted, ref} from '@vue/composition-api';
import {getLists, addNewsItem, removeOuterApi, editOuterApi} from "@/api/news";
export default {
  name: "category",
  setup(props,{root}){

    /**
     * 数据
     */
    const firstNameShow = ref(true);
    const secondNameShow = ref(true);
    const submitButtonLoading = ref(false);
    const firstNameDisabled = ref(true);
    const secondNameDisabled = ref(true);
    const submitButtonDisabled = ref(true);
    const submitType = ref("");
    const currentInfo = reactive({});
    const formLabelAlign = reactive({
      oneName:"",
      twoName:""
    });
    const requestData = reactive({
      item:[]
    });
    // methods 
    /**
     * 添加一级分类
     */
    const addFirstClassify = () => {
      firstNameShow.value = true;
      secondNameShow.value = false;
      firstNameDisabled.value = false;
      submitButtonDisabled.value = false;
      submitType.value = "add";
    };
    // 确认一级分类增加
    const submit = () => {
      if(submitType.value === "add"){
        addOuterSubmit();
      }else if(submitType.value === "edit"){
        editOuterSubmit();
      }
    };
    /**
     * 删除外层分类 
     * @param {Number} oIndex  外层下标
     * @param {Number} oID  外层ID
     */
    const removeOuter = (oIndex,oId) => {
      console.log(root.$msgbox({
        type:"warning",
        title: "警告",
        message: "确认删除当前信息，确认后无法恢复！！",
        showCancelButton:true
      }).then(res=>{
          removeOuterApi({categoryId:oId}).then(res=>{
          if(res.data.resCode === 0){
            root.$message.success(res.data.message);
            requestData.item.splice(oIndex,1);
          }
        })
      }).catch(err=>{
        root.$message.error("您点击了取消");
      }));
    };
    /**
     * 修改外层分类
     */
    const editOuter = (oIndex,{id,category_name}) => {
      firstNameDisabled.value = false;
      secondNameShow.value = false;
      submitButtonDisabled.value = false;
      submitType.value = "edit";
      formLabelAlign.oneName = category_name;
      currentInfo.oIndex = oIndex;
      currentInfo.id = id;
    };
    const addOuterSubmit = () => {
      if(!formLabelAlign.oneName){
          root.$message.error("分类名称不能为空");
          return;
        }
        submitButtonLoading.value = true;
        let data = {categoryName:formLabelAlign.oneName};
        addNewsItem(data).then(res=>{
          console.log(formLabelAlign.oneName);
          if(res.data.resCode === 0){
            root.$message({
              message:res.data.message,
              type:'success'
            })
            requestData.item.push(res.data.data);
          }
          formLabelAlign.oneName = "";
          formLabelAlign.twoName = "";
          submitButtonLoading.value = false;
        })
    }
    const editOuterSubmit = () => {
      if(!formLabelAlign.oneName){root.$message.error("请选择分类");return;};
      let data = {
        id: currentInfo.id,
        categoryName: formLabelAlign.oneName
      }
      editOuterApi(data).then(res=>{
        if(res.data.resCode === 0){
          root.$message.success(res.data.message);
          requestData.item[currentInfo.oIndex].category_name = res.data.data.data.categoryName;
          formLabelAlign.oneName = "";
        }
      })
    }
    // 生命周期 组件挂载完成后
    onMounted( async () => {
      requestData.item = await root.$store.dispatch("news/getListsStore");
    });
    return {
      // ref 
      firstNameShow, secondNameShow, submitButtonLoading,firstNameDisabled,secondNameDisabled,submitButtonDisabled,
      // reactive
      formLabelAlign, requestData,currentInfo,
      // methods
      addFirstClassify , submit, addOuterSubmit , removeOuter , editOuter ,editOuterSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/config.scss";
.category-wrap{
  div:first-child{
    &::before{
      top: 20px
    }
  }
  div:last-child{
    &::before{
      bottom: 21px;
    }
  }
}
  .menu-title{
    line-height: 44px;
    padding-left: 22px;
    background-color: #f3f3f3;
  }
  .category{
    position: relative;
    line-height: 44px;
    cursor: pointer;
    &::before{
        content: "";
        position: absolute;
        width: 32px;
        top: 0;
        left: 22px;
        bottom: 0;
        border-left: 1px dotted #000;
      }
    h4{
      padding-left: 40px;
    }
    svg {
      position: absolute;
      left: 15px;
      top: 15px;
      background-color: #fff;
      font-size: 14px;
    }
    li{
      padding-left: 36px;
      margin-left: 24px;
      position: relative;
      &::before{
        content: "";
        position: absolute;
        width: 32px;
        top: 22px;
        left: 0px;
        border-bottom: 1px dotted #000;
        
      }
    }
    li, h4{
      @include webkit(transition, all .3s ease 0s );
      &:hover{
        background: #f3f3f3;
        .button-group{display: block};
      }
    }
  }
  .button-group{
    display: none;
    position: absolute;
    right: 11px;
    z-index: 2;
    top: -1px;
    button{
      font-size: 12px;
    }
  }
  .form-wrap{
    width: 410px;
    padding-top: 26px;
  }
  .hr-e9e9e9{
    width: calc(100% + 30px);
    margin-left: -30px;
    border: none;
    border-bottom: 1px solid #e9e9e9;
    margin: 30px 0;
  }
</style>