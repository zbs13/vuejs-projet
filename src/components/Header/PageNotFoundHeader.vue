<template>
  <Header>
    <router-link to="/" class="link header-link">Accueil</router-link>
  </Header>
</template>

<script>
  import Header from './Header';

  export default {
    name: 'PageNotFoundHeader',
    components: {
      Header
    }
  }
</script>
