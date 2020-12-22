<template>
  <Header>
    <div v-if="isLogin" class="p-10">
      <router-link to="/signup" class="link header-link">Inscription</router-link>
    </div>
    <div v-else class="p-10">
      <router-link to="/login" class="link header-link">Connexion</router-link>
    </div>
  </Header>
</template>

<script>
  import Header from './Header';

  export default {
    name: 'DisconnectedHeader',
    props: {
      isLogin: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Header
    }
  }
</script>
