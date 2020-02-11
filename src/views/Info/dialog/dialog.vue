<template>
  <div>
     <el-dialog  title="新增" :visible.sync="data.dialogFlag"  @close="close" width="580px" >
        <el-form :model="data.form">
          <el-form-item label="类别：" :label-width="data.formLabelWidth">
            <el-select v-model="data.form.category" placeholder="请选择活动区域">
              <el-option :label="item.category_name" :value="item.id" v-for="item in typeVal" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题：" :label-width="data.formLabelWidth">
            <el-input v-model="data.form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="概况：" :label-width="data.formLabelWidth">
            <el-input v-model="data.form.content" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="data.dialogFlag = false">取消</el-button>
          <el-button type="danger" @click="addContent" :loading="data.submitButtonLoading">确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { addContentApi } from '@/api/news';
export default {
  props:{
    dialogVisible:{
      type:Boolean,
      default:false
    },
    typeVal:{
      type:Array,
      default:()=>[]
    }
  },
  setup(props,{root,emit}){
    const data = reactive({
      dialogFlag: false,
      formLabelWidth: '70px',
      submitButtonLoading: false,
      form: {
        title: "",
        category: "",
        content: "",
      }
    })
    const close = ()=>{emit('update:dialogVisible',false);resetForm() };
    const resetForm = () => {
      data.form.title = "";
      data.form.category = "";
      data.form.content = "";
    };
    const addContent = () => {
      if(!data.form.category){root.$message.error("请选择类别");return;};
      if(!data.form.title){root.$message.error("请输入标题");return;};
      if(!data.form.content){root.$message.error("请输入内容");return;};
      data.submitButtonLoading = true;
      addContentApi(data.form).then(res=>{
        if(res.data.resCode === 0){
          root.$message.success(res.data.message);
          resetForm();
          data.submitButtonLoading = false;
        }
      }).catch(err => {
        data.submitButtonLoading = false;
      })
    }
    watch(() => {
      data.dialogFlag = props.dialogVisible;
    });
    return {
      data,
      close,addContent,resetForm
    }
  }
}
</script>
<style lang="scss" scoped>

</style>