<template>
  <div id="app">
    <header class="header">
      <router-view name="header" />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
  @import "./assets/css/index.css";
</style>