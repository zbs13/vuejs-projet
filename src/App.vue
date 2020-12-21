<template>
  <div id="app">
    <div v-if="isLoading">
      <MainLoader />
    </div>
    <div v-else>
      <header>
        <div class="header-content">
          <router-view name="header" />
        </div>
      </header>
      <main>
        <router-view />
      </main>
      <Popup />
    </div> 
  </div>
</template>

<script>
import Popup from "./components/Popup";
import Auth from './service/security/auth';
import MainLoader from './components/MainLoader';
import { manageAccess } from './routes';

export default {
  name: 'App',
  data(){
    return {
      isLoading: true
    }
  },
  components: {
    Popup,
    MainLoader
  },
  // executer au chargement de la page
  async mounted() {
    let needLogged = this.$route.matched[0].props.needLogged;
    if(typeof needLogged === "boolean"){
      await Auth.checkConnectionStatus();
      this.$data.isLoading = false;
      manageAccess(needLogged);
    }else{
      this.$data.isLoading = false;
    }
  },
  // executer si changement de route
  watch: {
    '$route'(to, from){
      let needLogged = to.matched[0].props.needLogged;
      if(typeof needLogged === "boolean"){
        Auth.checkConnectionStatus(function(){
          manageAccess(needLogged);
        });
      }
    }
  },
}
</script>

<style scoped>
  @import "./assets/css/index.css";
</style>