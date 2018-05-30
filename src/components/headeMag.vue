<template>
      <Col class="header" span="17">
        <div class="headermsg">
          可分配余额:<span class="money">{{money}}</span>
          <Button style="width: 120px; float:right;margin-right: 10px;margin-top: 24px"@click="modal1 = true"  type="success">增加司机</Button>
          <Modal v-model="modal1" title="增加司机" @on-ok="ok" @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="司机姓名:" prop="name">
                  <Input v-model="formValidate.name" placeholder="请输入司机姓名"></Input>
                </FormItem>
                <FormItem label="司机手机:" prop="tel">
                  <Input v-model="formValidate.tel"placeholder="请输入司机手机号"></Input>
                </FormItem>
              <FormItem label="司机类型" prop="driverType">
                <Select v-model="formValidate.driverType" placeholder="选择司机类型">
                  <Option value="1">授信</Option>
                  <Option value="0">非授信</Option>
                </Select>
              </FormItem>
              <FormItem label="司机车牌号:" prop="carNum">
                <Input v-model="formValidate.carNum" placeholder="请输入司机车牌号"></Input>
              </FormItem>
              <FormItem label="分配金额:" prop="FPmoney">
                <Input v-model="formValidate.FPmoney" placeholder="请输入分配金额"></Input>
              </FormItem>
              <FormItem label="分配密码:" prop="FPpassword">
                <Input type="password" v-model="formValidate.FPpassword" placeholder="请输入分配密码"></Input>
              </FormItem>
              <FormItem label="备注:" prop="note">
                <Input v-model="formValidate.note" placeholder="请输入备注"></Input>
              </FormItem>
            </Form>
          </Modal>
        </div>
        <div class="center">
          <Row>
            <Col span="6">
            司机类别:<Select v-model="selects" value=" " style="width:200px">
                        <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
            </Col>
            <Col span="6">
            司机姓名: <Input  v-model="siji" placeholder="请输入司机姓名" clearable style="width: 200px"></Input>
            </Col>
            <Col span="6">
              司机手机:<Input v-model="tel" placeholder="请输入司机手机号" clearable style="width: 200px"></Input>
            </Col>
            <Col span="6">
              车牌号:<Input v-model="carNum" placeholder="请输入车牌号" clearable style="width: 200px"></Input>
            </Col>
          </Row>
          <Row style="margin-top: 20px">
            <Col span="6">
            开始时间:<DatePicker  v-model="starTime" type="datetime" placeholder="请输入开始时间" style="width: 200px"></DatePicker>
            </Col>
            <Col span="6">
            结束时间:<DatePicker v-model="endTime" type="datetime" placeholder="请输入结束时间" style="width: 200px"></DatePicker>
            </Col>
            <Col span="6">
            备注查询:<Input v-model="note" placeholder="请输入备注" clearable style="width: 200px"></Input>
            </Col>
            <Col span="6">
            <Button style="width: 80px" @click="queryDate" type="success">查询</Button>
            <Button style="width: 80px" @click="removeDate" type="error">清空查询</Button>
            <Button type="warning" @click="exportDate"> <Icon type="share"></Icon>  导出表格</Button>
            </Col>
          </Row>
          <Row style="height:500px;margin-top: 30px">
            <Table border :columns="columns" :data="dataList"></Table>
          </Row>
          <template style="text-align: center">
            <Page style="text-align: center" :total="total1" :page-size="pageSize" :page-size-opts="pageSizeOpts" @on-page-size-change="changeSize"  show-elevator show-sizer @on-change="changePage"></Page>
          </template>
        </div>
      </Col>
</template>
<script>
  import md5 from 'js-md5'
  import QS from 'qs'
  import axios from 'axios'
  export default {
    name:'HeaderMag',
    data(){
      return{
        formItem: {
          input: '',
          select: '非授信',
        },
        formValidate: {
          name: '',
          tel: '',
          driverType:'1',
          carNum:'',
          FPmoney:'',
          FPpassword:'',
          note:''

        },
        ruleValidate: {
          name: [
            { required: true, message: '输入司机姓名不能为空', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '输入司机手机号不能为空', trigger: 'blur' }
          ],
          driverType: [
            { required: true, message: '请选择司机类型', trigger: 'change' }
          ],
          carNum:[
            { required: true, message: '请输入司机车牌号', trigger: 'blur' }
          ],
          FPpassword:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        modal1: false,
        money:'',
        tel:'',
        carNum:'',
        siji: '',
        starTime:'',
        endTime:'',
        note:'',
        pageSizeOpts:[1,2,3,4],
        pageNum:1,
        pageSize:10,
        size:1,
        total1:0,
        types: [
          {
            value: ' ',
            label: '全部',

          },
          {
            value: '1',
            label: '授信司机'
          },
          {
            value: '0',
            label: '非授信司机'
          }
        ],
        selects: ' ',
        columns: [
          {
            title: '序号',
            key: '',
            align:'center',
            render: (h, params) => {
              return h('div', [
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '司机类别',
            key: 'driverType',
            align:'center'
          },
          {
            title: '车牌号',
            key: 'car',
            align:'center'
          },
          {
            title: '司机姓名',
            key: 'driverName',
            align:'center'
          },
          {
            title: '手机号',
            key: 'telephone',
            align:'center',
            width: 150
          },
          {
            title: '账户余额（￥）',
            key: 'balance',
            align:'center'
          },
          {
            title: '已分配总额（￥）',
            key: 'totalMoney',
            align:'center'
          },
          {
            title: '授信额度剩余（￥）',
            key: 'creditBalance',
            align:'center',
          },
          {
            title: '恢复授信额度（￥）',
            key: '',
            align:'center',
            render: (h, params) => {
              return h('span', {
                  style: {
                    color: '#01a24e',
                    cursor: 'pointer',
                    align: 'center'
                  },
                  on: {
                    click: () => {
                    }
                  }
                },'授信');
              }
          },
          {
            title: '操作时间',
            key: 'lastTime',
            align:'center',
            width:170
          },{
            title: '操作',
            key: '',
            align:'center',
            sortable: true,
            width: 170,
            render: (h, params) => {
              return h('div', [
              h('span', {
                style: {
                  color: '#01a24e',
                  cursor: 'pointer',
                  marginLeft:'5px'
                },
                on: {
                  click: () => {
                  }
                }
              },'分配'),
              h('span', {
                style: {
                  color: '#01a24e',
                  cursor: 'pointer',
                  marginLeft:'5px'
                },
                on: {
                  click: () => {
                  }
                }
              },'修改'),
              h('span', {
                style: {
                  color: '#01a24e',
                  cursor: 'pointer',
                  marginLeft:'5px'
                },
                on: {
                  click: () => {
                  }
                }
              },'删除'),
              h('span', {
                style: {
                  color: '#01a24e',
                  cursor: 'pointer',
                  marginLeft:'5px'
                },
                on: {
                  click: () => {
                  }
                }
              },'明细')
              ]);
            }
          },
          {
            title: '备注',
            key: 'remark',
            align:'center'
          },
        ],
        dataList:[]
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.changeDate(this.pageNum,this.size)
      })
    },
    methods:{
      queryDate(){
        this.changeDate(this.pageNum,this.size)
      },
      exportDate(){
        this.getQueryDriverOut(this.pageNum,this.size);
      },
      removeDate(){
        this.selects='';
        this.siji='';
        this.tel='';
        this.carNum='';
        this.starTime='';
        this.endTime='';
        this.note='';
        this.changeDate(this.pageNum,this.size)
      },
      changePage(page) {
        this.pageNum=page
        this.changeDate(page,this.size)
      },
      changeSize(size){
        this.size=size
        this.changeDate(this.page,size)
      },
      ok () {
        this.modal1=false;
        this.addsiji();
      },
      cancel () {
        this.$Message.info('取消添加');
      },
      changeDate(pageNum,size){
        var logisticsId = localStorage.getItem('logisticsId')
        var name = localStorage.getItem('name')
        var pwd = localStorage.getItem('password')
        var params = {"logisticsId":logisticsId,"pwd":pwd,"loginName":name,"pageNum":pageNum,"pageSize":size,"driverType":this.selects,
          "driverName":this.siji,"car":this.carNum,"remark":this.note,"telephone":this.tel,"starttime":this.starTime,"endtime":this.endTime};
        params = JSON.stringify(params)
        var data = {
          param:params
        }
        data = QS.stringify(data)
        console.log(data);
        axios({
          method: 'post',
          url: 'https://dev.yobangbang.com/ybbweb/driverServer/getQueryDriver.do',
          data: data,
          header:{"Content-Type":"application/x-www-form-urlencoded"}
        })
          .then((response)=>{
            if(response.data.errorcode==0){
              this.money=response.data.usableMoney;
              var results=response.data.page.result;
              for (var item in results){
                if( results[item].driverType==0 ){
                  results[item].driverType='非授信'
                }else {
                  results[item].driverType='授信'
                }
              }
              this.dataList=response.data.page.result;
              this.total1=response.data.page.total;
              this.pageSize=response.data.page.total;
              console.log(this.total1)
            }else {
//
            }
          })
          .catch(function(error){

            console.log(error);
          });
      },
      getQueryDriverOut(pageNum,size){
        var logisticsId = localStorage.getItem('logisticsId')
        var name = localStorage.getItem('name')
        var pwd = localStorage.getItem('password')
        var params = {"logisticsId":logisticsId,"pwd":pwd,"loginName":name,"pageNum":pageNum,"pageSize":size,"driverType":this.selects,
          "driverName":this.siji,"car":this.carNum,"remark":this.note,"telephone":this.tel,"starttime":this.starTime,"endtime":this.endTime};
        params = JSON.stringify(params)
        var data = {
          param:params
        }
        data = QS.stringify(data)
        axios({
          method: 'post',
          url: 'https://dev.yobangbang.com/ybbweb/driverServer/getQueryDriverOut.do',
          data: data,
          header:{"Content-Type":"application/x-www-form-urlencoded"}
        })
          .then((response)=>{
            if(response.data.errorcode==0){
              var excleUrl=response.data.url;
              window.location.href= encodeURI(excleUrl) ;
            }else {
//
            }
          })
          .catch(function(error){
            console.log(error);
          });
      },
      addsiji(){
        var logisticsId = localStorage.getItem('logisticsId')
        var name = localStorage.getItem('name')
        var pwd = localStorage.getItem('password')

        var password=this.formValidate.FPpassword;
        var hash1= md5(password);

        var params = {
          "logisticsId":logisticsId,
          "pwd":pwd,
          "loginName":name,
          "driverType":this.formValidate.driverType,
          "money":this.formValidate.FPmoney,
          "password":hash1,
          "driverName":this.formValidate.name,
          "car":this.formValidate.carNum,
          "remark":this.formValidate.note,
          "telephone":this.formValidate.tel
        };
        params = JSON.stringify(params)
        var data = {
          param:params
        }
        data = QS.stringify(data)
        axios({
          method: 'post',
          url: 'https://dev.yobangbang.com/ybbweb/driverServer/addDriver.do',
          data: data,
          header:{"Content-Type":"application/x-www-form-urlencoded"}
        })
          .then((response)=>{
            if(response.data.errorcode==0){
              this.modal1=false;
              this.changeDate(this.pageNum,this.size)
            }else {
              this.$Message.error(response.data.msg);
//              alert(response.data.msg);
                this.modal1=true;
                this.formValidate.FPpassword=''
                this.formValidate.driverType='1'
                this.formValidate.FPmoney=''
                this.formValidate.name=''
                this.formValidate.carNum=''
                this.formValidate.note=''
                this.formValidate.tel=''
              return false
            }
          })
          .catch(function(error){

            console.log(error);
          });
      }
    }

  }
</script>
<style scoped>
  .headermsg{
    padding:0 40px;
    height: 80px;
    line-height: 80px;
    font-size: 16px;
    background: #ddf1d8;
    border: 1px solid #ddf1d8;
    margin-left: 10px;
  }
  .money{
    margin-right: 70px;
    font-size: 18px;
    color: #ee6920;
    font-weight: bolder;
  }
  .center{
    height: 710px;
    margin-left: 10px;
    margin-top: 10px;
    border: 1px solid #a0a0a0;
    padding: 40px 20px;
  }
  .inputs{

  }
</style>
