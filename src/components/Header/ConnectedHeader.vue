<template>
  <Header>
    <div>
      <Cta class="cta-logout" value="Déconnexion" @click="disconnection" />
    </div>
  </Header>
</template>

<script>
  import Header from './Header';
  import Cta from '../Cta';

  export default {
    name: 'ConnectedHeader',
    components: {
      Header,
      Cta
    },
    methods: {
      disconnection: function() {
        window.localStorage.removeItem("auth_token");
        window.location.reload();
      }
    }
  }
</script>
