<template>
  <div class="main">
      <div v-if="controllerShadow===true" class="shadow" @click="controllerShadow=false"></div>
    <Header @activateShadow="activateShadow" :closePopUp="this.controllerShadow" :mobile="this.mobile"/>
    <InfoBanner/>
    <Lists/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../components/MainPanel/Header'
import InfoBanner from '../components/MainPanel/InfoBanner'
import Lists from '../components/MainPanel/Lists'
export default {
  name: 'MainPanel',
  components:{
      Header,
      InfoBanner,
      Lists
  },
  data:function(){
      return{
        empty: '',
        controllerShadow:false,
        controllerNewCard: false,
        controllerDots:false,
        controllerDragging: {
            todo: false,
            done: false,
        },
        mobile:false,
      }
    },
  computed: {
    ...mapGetters({
          items: 'updateData',
      }),
  },
  methods:{
    activateShadow(val){
        if(this.mobile)this.controllerShadow = val;
      },
    detectMobile(){
        this.mobile = !(typeof window.orientation == 'undefined')
    },
  },
  mounted(){
    this.checkUser();
    this.detectMobile();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
    min-height:100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 20vw repeat(2,1fr) 20vw;
    grid-template-rows: 10vh 10vh auto;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-items: start;
}
.shadow{
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.217);    
}
@media screen and (max-height:450px){
    .main {
        min-height:100vh;
        width: 100vw;
        display: grid;
        grid-template-columns: 20vw repeat(2,1fr) 20vw;
        grid-template-rows: 20vh 10vh auto;
        grid-column-gap: 0px;
        grid-row-gap: 10px;
        align-items: start;
    }
}
</style>