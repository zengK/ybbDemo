<template>
  <Modal v-model="modal1" title="修改登录密码" @on-ok="ok" @on-cancel="cancel">

  </Modal>
</template>
<script>
  export default{
    name:'Modal',
    data(){
      return {
        name:""
      }
    },
    mounted() {
    },
    methods:{
    }
  }
</script>
<style scoped>
</style>
