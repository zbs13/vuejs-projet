<template>
  <div class="relative">
    <input
      class="field"
      v-model="value"
      @input="searchUsers($event)"
      placeholder="Chercher un utilisateur"
    />
    <div v-if="this.$data.searchStatus" class="font-s-20 font-b p-10">
      Aucun résultat
    </div>
    <div class="result-search-users" v-if="this.$data.value">
      <div v-for="user in this.$data.users" :key="user.id">
        <div class="flex">
          <div class="show-res-users">
            {{ user.lastname }} {{ user.firstname }}
          </div>
          <div class="margin-button-search">
            <button @click="addUser(user)">Ajouter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dispatchApi from "../api/dispatchApi";

export default {
  name: "SearchUserInGroup",
  props: {
    usersInGroup: {
      type: Array,
    },
    groupId: String,
  },
  data() {
    return {
      users: [],
      value: "",
      searchStatus: false,
    };
  },
  methods: {
    searchUsers: async function (event) {
      let resSearchUser = await dispatchApi("users", "searchUsersByGroup", {
        value: event.target.value,
        groupId: this.$props.groupId,
      });
      console.log(this.$props.usersInGroup);
      // del user existant
      let userToAdd = [];
      for (let i = 0; i < resSearchUser.users.length; i++) {
        let isDouble = false;
        for (let y = 0; y < this.$props.usersInGroup.length; y++) {
          if (resSearchUser.users[i].id === this.$props.usersInGroup[y].id) {
            isDouble = true;
          }
        }
        if (!isDouble) {
          userToAdd.push(resSearchUser.users[i]);
        }
      }
      if (userToAdd.length === 0) {
        this.$data.searchStatus = true;
      } else {
        this.$data.searchStatus = false;
      }
      this.$data.users = userToAdd;
    },
    addUser: function (user) {
      this.$data.users = [];
      this.$emit("onAddUser", user);
    },
  },
  created() {
    document.title = "SearchUserInGroup";
  },
};
</script>