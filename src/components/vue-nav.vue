<template>
  <div class="leftnav">
    <Col span="3" offset="2">
    <Menu :theme="theme2"style="height: 800px; width:auto;border: 1px solid #a0a0a0">
      <MenuItem name="1" >
        <router-link to="/index">司机分配管理</router-link>
      </MenuItem>
      <MenuItem name="2">
        <router-link to="/company">公司分配管理</router-link>
      </MenuItem>
      <MenuItem name="3">发票开具管理</MenuItem>
      <Submenu name="4">
        <template slot="title">
          <Icon type="stats-bars"></Icon>
          账户管理
        </template>
          <MenuItem name="4-1">新增和启动</MenuItem>
          <MenuItem name="4-2">活跃分析</MenuItem>
          <MenuItem name="4-3">时段分析</MenuItem>
          <MenuItem name="4-4">用户留存</MenuItem>
          <MenuItem name="4-5">流失用户</MenuItem>
      </Submenu>
    </Menu>
    </Col>

  </div>
</template>
<script>
  export default {
    name:'Vuenav',
    data(){
      return{

      }
    },
    props: {
      theme2: {
        type: String,
        default: 'dark'
      },
      iconColor: {
        type: String,
        default: 'white'
      }
    }
  }
</script>
<style scoped="">
  .leftnav{
    height: 100%;
  }
</style>
