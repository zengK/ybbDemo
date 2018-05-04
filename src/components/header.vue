<template>
  <Row>
    <Col class="header" span="20" offset="2">
      <Col span="1" offset="1">
        <div class="logo">
          <img src="../assets/login/logoB.png" alt="">
        </div>
      </Col>
      <Col span="4">
        <div class="title">
          <i class="icon-shu"></i>
          <span class="title-text">企业用油管理系统</span>
        </div>
      </Col>
      <Col class="header-Right" span="3"offset="13" style="">
        <Dropdown style="margin-left: 20px" @on-click="open2">
          <a href="javascript:void(0)">
           {{name}}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem >修改登录密码</DropdownItem>
            <DropdownItem>修改分配密码</DropdownItem>
            <DropdownItem>注销登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Col>
    <!--<Button type="primary" @click="modal1 = true">Display dialog box</Button>-->
    <Modal v-model="modal2" title="修改登录密码" @on-ok="ok" @on-cancel="cancel">
      <p>Content of ddasadasdasdadialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </Row>
  <!--<Button type="primary" @click="modal1 = true">Display dialog box</Button>-->
  <!--<Modal v-model="modal1" title="修改登录密码" @on-ok="ok" @on-cancel="cancel">-->
    <!--<p>Content of dialog</p>-->
    <!--<p>Content of dialog</p>-->
    <!--<p>Content of dialog</p>-->
  <!--</Modal>-->

</template>
<script>
//  import Modal from './modal.vue'
  export default{
    name:'Header',
    data(){
      return {
        name:"",
        modal2: true
      }
    },
    mounted() {
      this.$nextTick(function () {
        var name=localStorage.getItem('logisticsName');
        this.name=name;
      })
    },
    methods:{
      open2(name){
        alert(111111111111)
      },
      ok () {
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      }
    }
  }
</script>
<style scoped>
  .header{
    height: 60px;
    border-radius: 3px;
    background:url("../assets/login/topBg.png") repeat-x;
    margin-top: 40px;
  }
  .header Col{height: 60px;}
  .logo{height: 60px}
  .logo img{height:80%;}
  .title{
    height: 60px;
    position: relative;
  }
  .icon-shu{
    width: 2px;
    height: 25px;
    background: white;
    display: inline-block;
    /*margin-top: 15px;*/
    position: absolute;
    left: 25px;
    top: 15px;
  }
  .title-text{
    position: absolute;
    left: 16px;
    top: 8px;
    color: white;
    display: inline-block;
    font-size: 18px;
    font-weight:600;
    margin-left: 20px;
    line-height: 40px;
  }
  .header-Right{
    margin-top: 10px;
  }
  .header-Right a {
    display: inline-block;
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #495060;
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    font-size: 12px!important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
  }
  .header-Right a:hover{background: white;color: #495060;}
</style>
