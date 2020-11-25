<template>
  <div id="app">
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
</template>

<script>
import Popup from "./components/Popup";

export default {
  name: 'App',
  components: {
    Popup
  }
}
</script>

<style scoped>
  @import "./assets/css/index.css";
</style>