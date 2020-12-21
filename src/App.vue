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

export default {
  name: 'App',
  data(){
    return {
      isLoading: true,
      isLogged: false
    }
  },
  components: {
    Popup,
    MainLoader
  },
  async mounted() {
    await Auth.checkConnectionStatus();
    this.$data.isLoading = false;
    this.$data.isLogged = window.localStorage.getItem("isLogged");
  }
}
</script>

<style scoped>
  @import "./assets/css/index.css";
</style>