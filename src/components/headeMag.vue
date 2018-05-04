<template>
      <Col class="header" span="17">
        <div class="headermsg">
          可分配余额:<span class="money">{{money}}</span>
          <Button style="width: 120px; float:right;margin-right: 10px;margin-top: 24px"
                  @click="modal1 = true"  type="success">增加司机</Button>
          <Modal v-model="modal1" title="修改登录密码" @on-ok="ok" @on-cancel="cancel">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
          </Modal>
        </div>
        <div class="center">
          <Row>
            <Col span="6">
            司机类别:<Select v-model="selects" value="全部" style="width:200px">
                        <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
            </Col>
            <Col span="6">
            司机姓名: <Input  v-model="siji" placeholder="请输入司机姓名" clearable style="width: 200px"></Input>
            </Col>
            <Col span="6">
              司机手机:<Input v-model="tel" placeholder="请输入司机姓名" clearable style="width: 200px"></Input>
            </Col>
            <Col span="6">
              车牌号:<Input v-model="carNum" placeholder="请输入司机姓名" clearable style="width: 200px"></Input>
            </Col>
          </Row>
          <Row style="margin-top: 20px">
            <Col span="6">
            开始时间:<Input v-model="carNum" placeholder="请输入司机姓名" clearable style="width: 200px"></Input>
            </Col>
            <Col span="6">
            结束时间:<Input v-model="carNum" placeholder="请输入司机姓名" clearable style="width: 200px"></Input>
            </Col>
            <Col span="6">
            备注查询:<Input v-model="carNum" placeholder="请输入司机姓名" clearable style="width: 200px"></Input>
            </Col>
            <Col span="6">
            <Button style="width: 80px" type="success">查询</Button>
            <Button style="width: 80px" type="error">清空查询</Button>
            <Button type="warning"> <Icon type="share"></Icon>  导出表格</Button>
            </Col>
          </Row>
          <Row style="height:500px;margin-top: 30px">
            <Table border :columns="columns" :data="dataList"></Table>
          </Row>
          <template style="text-align: center">
            <Page :total="total1" :page-size="1" :page-size-opts="pageSizeOpts" show-elevator show-sizer @on-change="changePage"></Page>
          </template>
        </div>
      </Col>
</template>
<script>
  import QS from 'qs'
  import axios from 'axios'
  export default {
    name:'HeaderMag',
    data(){
      return{
        modal1: false,
        money:'',
        tel:'',
        carNum:'',
        siji: '',
        pageSizeOpts:[1,2,3,4],
        pageNum:1,
        total1:0,
        types: [
          {
            value: '全部',
            label: '全部',

          },
          {
            value: '授信司机',
            label: '授信司机'
          },
          {
            value: '非授信司机',
            label: '非授信司机'
          }
        ],
        selects: '',
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

        this.changeDate(this.pageNum)
      })
    },
    methods:{
      changePage(page) {
        this.pageNum=page
        this.changeDate(page)
//        console.log(page)
      },
      ok () {
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      },
      changeDate(pageNum){
        var logisticsId = localStorage.getItem('logisticsId')
        var name = localStorage.getItem('name')
        var pwd = localStorage.getItem('password')
        var params = {"logisticsId":logisticsId,"pwd":pwd,"loginName":name,"pageNum":pageNum,"pageSize":"1","driverType":"",
          "driverName":"","car":"","remark":"","telephone":"","starttime":"","endtime":""};
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
              console.log(response.data)
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
              console.log(this.total1)
            }else {
//
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
