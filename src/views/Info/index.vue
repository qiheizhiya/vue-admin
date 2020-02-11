<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="warp-content">
            <el-select v-model="data.typeVal" placeholder="请选择" style="width:100%">
              <el-option v-for="item in data.options" :key="item.id" :label="item.label" :value="item.category_name"> </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：</label>
          <div class="warp-content">
            <el-time-picker
              style="width:100%"
              is-range
              arrow-control
              v-model="data.dateTime"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-work">
          <label for="">关键字：</label>
          <div class="warp-content">
            <el-select v-model="data.search_key" style="width:100%">
              <el-option
              v-for="item in data.searchOption"
              :key = "item.value"
              :value = "item.value"
              :label = "item.label"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="data.search_keyWork" placeholder="请输入内容" style="width:100%"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%">搜索</el-button>
      </el-col>
      <el-col :span="3" >&nbsp;`</el-col>
      <el-col :span="2">
         <el-button type="danger" class="pull-right" style="width:100%" @click="data.dialogVisible = true">新增</el-button>
      </el-col>
    </el-row>
    <div class="black-space-30 "></div> 
   <!-- 表格 -->

    <el-table :data="data.tableData" height="420" border style="width: 100%" v-loading="data.taberLoading">
       <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="130"> </el-table-column>
      <el-table-column prop="createDate" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="">
          <el-button size="mini" type="danger">删除</el-button>
          <el-button size="mini" type="success" @click="data.dialogVisible = true">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30 "></div>
    <!-- 底部分页 -->
    <el-row>
      <el-col :span="12">
        <el-button size="small">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination class="pull-right"
        @size-change="handleSizeChange"
        :page-sizes="[5, 10, 15, 20]"
        @current-change="handleCurrentChange"
        background layout="total,prev, pager, next,jumper,sizes" :total="data.total"></el-pagination>
      </el-col>
    </el-row>

     <!-- 弹框 -->
    <DiaLog  :dialogVisible.sync="data.dialogVisible" :typeVal="data.options" />
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import DiaLog from "./dialog/dialog.vue";
import {getNewsContentApi} from '@/api/news';
export default {
  components:{ DiaLog },
  setup(props,{root}){
    const data = reactive({
      typeVal: "",
      dateTime: "",
      search_keyWork: "",
      search_key: "",
      taberLoading:false,
      dialogVisible: false,
      total:1,
      options:[], // 类型
      searchOption:[ { value: "id", label: "ID"}, { value: "title", label: "标题"}],
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      tableData: [],
    })
    // 函数
    const handleSizeChange = (val)=>{
      data.page.pageSize = val;
      getNewsContent();
    };
    const handleCurrentChange = (val) => {
      data.page.pageNumber = val;
      getNewsContent();
    };
    const getNewsContent = () => {
      return new Promise((resolve,reject) => {
        let requestData = {
          categoryId: "",
          startTiem: "",
          endTime: "",
          title: '',
          id: "",
          pageNumber: data.page.pageNumber,
          pageSize: data.page.pageSize
        }
        data.taberLoading = true;
        getNewsContentApi(requestData).then(res=>{
          if(res.data.resCode === 0){
            data.total = res.data.data.total;
            data.tableData = res.data.data.data;
            data.taberLoading = false;
          }
        }).catch(err=>{
          data.taberLoading = false;
        })
      })
    }
    onMounted( async () => {
      data.options = await root.$store.dispatch("news/getListsStore");// 获取类型
      getNewsContent();
    });
    return{
      // reactive
      data ,
      // methods
      handleSizeChange, handleCurrentChange,getNewsContent
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/config.scss";
.label-wrap{
  &.category {@include labelDom(left,60,40)};
  &.date{@include labelDom(right,93,40)};
  &.key-work{@include labelDom(right,94,40)}
}
</style>

<style lang="scss" >
div.el-table {
  td, th { text-align: center};
  th {
    font-weight: bold;
    color: #344a5f;
  }
}

</style>