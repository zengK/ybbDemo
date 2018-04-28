<template>
	<div class="login">
		<div class="header">
			<div class="title">
				<span class="logo">
					<img src="../assets/login/logoB.png"/>
				</span>
				<span class="titleText">
					丨企业物流管理系统
				</span>
			</div>
		</div>
		<div class="fotter">
			<div class="footerMsg">
				秋葵科技(北京)有限公司
			</div>
		</div>
		<div class="form">
			<Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
		        <FormItem prop="user">
		            <Input type="text" style="width: 400px;" v-model="formInline.user" placeholder="请输入4-25位字符的账号">
		                <Icon type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem prop="password" style="height: 50px;">
		            <Input type="password" style="width: 400px;" v-model="formInline.password" placeholder="密码字符最少4位">
		                <Icon type="ios-locked-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
	        	<FormItem prop="code">
		        	 <Input placeholder="请输入验证码" v-model="formInline.code" style="width: 200px"></Input>
		        	 <span class="codeImg" style="">
		        	 	<img :src="imgUrl" alt="" />
		        	 </span>
	        	</FormItem>
		        <FormItem>
		            <Button type="primary" style="width: 400px; background: #01a750;height: 50px;margin-top: 20px;" @click="handleSubmit('formInline')">登录</Button>
		        </FormItem>
		    </Form>
		</div>
	</div>
</template>

<script>
  import md5 from 'js-md5'
  import QS from 'qs'
  import axios from 'axios'
	export default {
         data () {
            return {
                imgUrl:'',
                codeImg:'',
                param:'',
                formInline: {
                    user: '',
                    password: '',
                    code:''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入4-25位字符的账号', trigger: 'blur' },
                        { type: 'string', max:25, min: 4, message: '密码字符最少4位', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 4, message: '密码字符最少4位', trigger: 'blur' }
                    ],
                    code:[
                    	{ required: true, message: '请输入验证码', trigger: 'blur' },
                        { type: 'string', maxlength: 4, message: '验证码为4位', trigger: 'blur' }
                    ]
                }
            }
        },
       	mounted() {
          this.$nextTick(function () {
            axios.post('https://dev.yobangbang.com/ybbweb/loginServer/verificationCode.do').then(response => {
  //			    console.log(response.data.url)
              this.imgUrl=response.data.url;
              this.codeImg=response.data.name;
            }, response => {
            // error callback
            });
          })
		    },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      var code = this.formInline.code.toLowerCase();
                      if(code == this.codeImg){
                        var password=this.formInline.password;
                        var hash1= md5(password);
                        var hash2= hash1+'IyGF4F6Y0JF1zvmQ';
                        password = md5(hash2);
                        localStorage.setItem('password',password);
                        localStorage.setItem('name',this.formInline.user);
                        var params = {"name":this.formInline.user,"password":password};
                        params = JSON.stringify(params)
                        var data = {
                          param:params
                        }
                        data = QS.stringify(data)
                        axios({
                          method: 'post',
                          url: 'https://dev.yobangbang.com/ybbweb/loginServer/login.do',
                          data: data,
                          header:{"Content-Type":"application/x-www-form-urlencoded"}
                        })
                          .then((response)=>{
                            console.log(response.data);
                            if(response.data.errorcode==0){
//                              alert('登录成功!');
                              this.$Message.success('登录成功!');
                              localStorage.setItem('logisticsId',response.data.logisticsId);
                              localStorage.setItem('logisticsName',response.data.logisticsName);
                              localStorage.setItem('type',response.data.type);
                              this.$router.push("index");
                            }else {
//                              alert(response.data.msg);
                              this.$Message.error(response.data.msg);
                            }

                        })
                          .catch(function(error){
                            console.log(error);
                        });
                      }else {
                          this.$Message.error('验证码输入错误!');
                      }
                    } else {
                        this.$Message.error('登录失败!');
                    }
                })
            }
        }
    }
</script>

<style scoped="">
	.login{
		width: 1400px;
		height:100%;
		margin:0 auto;
		position: relative;
		}
	.header{
		width: 100%;
		height: 500px;
		background:url(../assets/login/loginTop.png);
		position: relative;
		}
	.title{
		height: 56px;
		position: absolute;
		top: 100px;
		width: 100%;}
	.logo{
		width: 44%;
		position: absolute;
		left: 0;
		display: inline-block;
		height: 56px;
		text-align: right;
		}
	.login img{
		height: 100%;
		}
	.titleText{
		width: 50%;
		position: absolute;
		left: 44%;
		display:inline-block;
		height: 56px;
		line-height: 56px;
		color: white;
		font-size: 30px;
		float: left;
		}
	.fotter{
		height: 400px;
		background: url(../assets/login/loginBottom.png);
		position: relative;
		}
	.footerMsg{
		width: 100%;
		text-align: center;
		height: 50px;
		border-top: 1px solid darkgrey;
		position: absolute;
		bottom: 0;
		color: gray;
		font-size: 18px;
		line-height: 50px;
	}
	.form{
		width: 500px;
		height: 400px;
		padding:50px;
		z-index:2;
		position: absolute;
		background:white;
		border-radius: 3px;
		left: 450px;
		top: 35%;
		}
		.codeImg{
			display: inline-block;
			height: 32px;
			float: right;
			margin-left: 90px;
			border: 1px solid gray;
			width: 100px;
		}
		.codeImg img{
			width: 100%;
		}
</style>
