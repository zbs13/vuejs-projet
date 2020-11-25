<template>
  <div id="app">
    <header class="header">
      <router-view name="header" />
    </header>
    <main>
      <router-view />
      <Popup />
    </main>
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