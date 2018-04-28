<template id="parent-component">
  <div>
    <Header></Header>
    <Vuenav></Vuenav>
    <HeaderMag></HeaderMag>
  </div>
</template>

<script>
  import Header from './header.vue'
  import Vuenav from './vue-nav.vue'
  import HeaderMag from './headeMag.vue'
  import QS from 'qs'
  import axios from 'axios'
    export default {
        data () {
            return {
            }
        },
      components:{
          Header,
          Vuenav,
        HeaderMag
      }
    }
</script>
<style scoped="">
</style>
