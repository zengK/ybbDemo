<template>
      <Col class="header" span="17">
        <div class="headermsg">
          可分配余额:<span class="money">2132132</span>

          <Button type="primary"><Icon type="plus"></Icon>添加物流公司</Button>
        </div>
        <div class="center">
            这是company的主题部分
        </div>
      </Col>
</template>
<script>
  export default {
    name:'CompanyMain',
    data(){
      return{

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
  }
</style>
