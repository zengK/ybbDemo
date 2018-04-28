<template id="parent-component">
  <div>
    <Header></Header>
    <Vuenav></Vuenav>
    <CompanyMain></CompanyMain>
    <!--<HeaderMag></HeaderMag>-->
  </div>
</template>

<script>
  import Header from './header.vue'
  import Vuenav from './vue-nav.vue'
  import CompanyMain from './comapany/companyMain.vue'
    export default {
        data () {
            return {
            }
        },
      components:{
          Header,
          Vuenav,
          CompanyMain
      }
    }
</script>
<style scoped="">
</style>
