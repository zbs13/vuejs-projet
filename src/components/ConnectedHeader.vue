<template>
    <div class="flex space-between align-center">
        <div class="header-title">
          Application
        </div>
        <div class="flex align-center">
          <div class="p-10">
            <SwitchApi />
          </div>
          <div>
            <Cta class="cta-logout" value="Déconnexion" @click="disconnection" />
          </div>
        </div>
    </div>
</template>

<script>
  import SwitchApi from './SwitchApi';
  import Cta from './Cta';

  export default {
    name: 'ConnectedHeader',
    components: {
      SwitchApi,
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
