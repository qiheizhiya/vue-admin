<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'current': item.current}"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{item.txt}}</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            maxlength="20"
            minlength="6"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
          <label for="password2">重复密码</label>
          <el-input
            id="password2"
            type="password"
            maxlength="20"
            minlength="6"
            v-model="ruleForm.passwords"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" maxlength="6" minlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms"
                :disabled="codeButtonState.state"
              >{{codeButtonState.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            :disabled="loginBtnState"
            class="login-btn block"
          >{{model === 'login' ? '登陆' : '注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { GetSms ,Register, Login} from "@/api/login";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  valEmail,
  valPwd,
  valCode
} from "@/assets/utils/validate";
export default {
  name: "login",
  setup(props, { refs, root }) {
    // 验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!valEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!valPwd(value)) {
        callback(new Error("密码为6至20位数字＋字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    var validatePasswords = (rule, value, callback) => {
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var checkAge = (rule, value, callback) => {
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (!valCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    // 这里放置data数据，生命周期，自定义函数
    const menuTab = reactive([
      { txt: "登陆", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    // 模块值
    const model = ref("login");
    // 登陆按钮是否打开
    let loginBtnState = ref(true);
    const codeButtonState = reactive({
      state: false,
      text: "获取验证码"
    });
    const timer = ref(null); 
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: checkAge, trigger: "blur" }]
    });
    // 声明函数
     const updateButtonState = ((params) => {
      codeButtonState.state = params.state;
      codeButtonState.text = params.text;
    });
    const toggleMenu = (data => {
      resetForm('ruleForm');
      menuTab.forEach(item => (item.current = false));
      data.current = true;
      model.value = data.type;
    });
    /**
     * 登陆
     */
    const login = (async ()=>{
      let data = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code
      }
      root.$store.dispatch('login/login',data).then(res=>{
        console.log(res);
        root.$message({
          message: res.data.message,
          type: 'success'
        });
        root.$router.push({
          name:'Console'
        })
      })
    })
    /**
     * 注册
     */
    const register = (()=>{
      let data = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code
      }
      Register(data).then(res=>{
        root.$message({
          message: res.data.message,
          type: 'success'
        })
        toggleMenu(menuTab[0]);
        clearTimeDown();
      })
    })
    /**
     * 倒计时
     */
    const timeDown = ((count)=>{
      timer.value && clearInterval(timer.value);
      let time = count;
      timer.value = setInterval(()=>{
        time--;
        if(time === 0){
          clearInterval(timer.value);
          updateButtonState({state:false,text: '再次获取'});
        }else{
          codeButtonState.text = `倒计时${time}秒`;
        }
      },1000)
    });
    // 清楚时间倒计时
    const clearTimeDown = (()=>{
      updateButtonState({state:false,text: '获取验证码'});
      clearInterval(timer.value);
    });
    /**
     * 获取验证码
     */
    const getSms = (() => {
      if (!ruleForm.username) {
        root.$message.error("邮箱不能为空");
        return;
      }
      if (!valEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新输入！！！");
        return;
      }
      let data = {
        username: ruleForm.username,
        module: model.value
      };
      updateButtonState({state:true,text:"发送中"});
      GetSms(data)
        .then(res => {
          timeDown(60);
          loginBtnState.value = false;
          let data = res.data;
          root.$message({ message: data.message, type: "success" });
        })
        .catch(err => {
          updateButtonState({state:false,text:"获取验证码"});
        });
    });
    /**
     * 提交表单
     */
    const submitForm = (formName => {
      refs[formName].validate(valid => {
        if (valid) {
          model.value === 'login' ? login() : register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    });
    const resetForm = (formName => {
      refs[formName].resetFields();
    });
    // 生命周期
    onMounted(() => {});

    return {
      menuTab,
      model,
      ruleForm,
      loginBtnState,
      codeButtonState,
      timer,
      timeDown,
      rules,
      toggleMenu,
      submitForm,
      resetForm,
      getSms
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    transition: all 0.5s;
    cursor: pointer;
  }
  .current {
    background: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 10px;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    text-align: left;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 9px;
  }
}
</style>
<style >
.el-form-item--medium .el-form-item__content {
  margin-left: 0 !important;
}
</style>