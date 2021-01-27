<template>
  <div :class="sentOrReceived">
    <div class="message-sentBy">
      {{ sentBy.firstname }} {{ sentBy.lastname }} :
    </div>
    <div class="message-text">
      {{ text }}
      <div>
        <button @click="deleteMessage">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import dispatchApi from "../../../api/dispatchApi";

export default {
  name: "MessageCard",
  props: ["id", "create_at", "text", "sentBy", "roles"],
  data() {
    return {
      sentOrReceived: String,
      hasRightToDelete: Boolean,
    };
  },
  methods: {
    deleteMessage: async function () {
      await dispatchApi("message", "deleteMessage", this.id);
    },
  },
  async mounted() {
    this.$data.hasRightToDelete = false;
    if (
      (this.roles.length !== 0 && this.roles[0] == "owner") ||
      this.sentBy.id == window.localStorage.getItem("user_id")
    ) {
      this.$data.hasRightToDelete = true;
    } else if (this.roles.length !== 0) {
      this.roles.forEach((role) => {
        console.log(role.rights);
        role.rights.forEach((right) => {
          if (right.id == "5") {
            this.$data.hasRightToDelete = true;
          }
        });
      });
    }

    if (window.localStorage.getItem("user_id") == this.sentBy.id) {
      this.$data.sentOrReceived = "message-card flex column sent";
    } else {
      this.$data.sentOrReceived = "message-card flex column received";
    }
  },
};
</script>