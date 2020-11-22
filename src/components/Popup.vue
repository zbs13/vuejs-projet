<template>
    <div v-if="popups.length > 0">
        popup
    </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: 'Popup',
    computed: {
        popups: function () {
            return this.$store.state.popups;
        },
        ...mapGetters(["getPopups"])
    }
  };

</script>