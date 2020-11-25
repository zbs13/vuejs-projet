<template>
  <div class="popup-block" v-if="popups.length > 0">
    <div v-for="popup in popups" :key="popup.id">
      <div v-if="popup.type == 'error'" class="popup popup-error">
        {{ popup.message }}
      </div>
      <div v-else-if="popup.type == 'success'" class="popup popup-success">
        {{ popup.message }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Popup',
    computed: {
      popups: function () {
          return this.$store.state.popups;
      }
    }
  };

</script>