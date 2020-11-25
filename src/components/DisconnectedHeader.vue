<template>
    <div class="flex space-between align-center">
        <div class="header-title">
          Application
        </div>
        <div class="flex align-center">
          <div class="p-10">
            <SwitchApi />
          </div>
          <div v-if="isLogin" class="p-10">
            <router-link to="/signup" class="link header-link">Inscription</router-link>
          </div>
          <div v-else class="p-10">
            <router-link to="/login" class="link header-link">Connexion</router-link>
          </div>
        </div>
    </div>
</template>

<script>
  import SwitchApi from './SwitchApi';

  export default {
    name: 'DisconnectedHeader',
    props: {
      isLogin: {
        type: Boolean,
        default: false
      }
    },
    components: {
      SwitchApi
    }
  }
</script>
