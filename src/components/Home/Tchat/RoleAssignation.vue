<template>
  <div v-if="this.$data.hasRightToRole == true">
    <PageTitle title="Création de Role" />

    <Formik
      :initialValues="{
        name: '',
      }"
      :onValidate="onValidate"
      @onSubmit="onSubmit"
      class="form form-login flex column"
    >
      <SearchUserInGroup
        @onAddUser="addUserFromSearchUsers"
        :usersInGroup="this.$data.users"
        :groupId="this.$props.groupId"
      />
      <select @change="selectedRight($event)" name="selectrole">
        <option v-for="right in rights" :key="right.id" :value="right.id">
          {{ right.name }}
        </option>
      </select>
      <Form class="form form-login flex column">
        <Field
          class="field"
          type="text"
          name="name"
          placeholder="Nom"
          required="required"
        />
        <Button class="cta submit" type="submit" value="Créer le Role" />
      </Form>
      <div class="result-search-users">
        <div v-if="this.$data.users.length !== 0" class="font-s-20 font-b p-10">
          Liste des utilisateurs :
        </div>
        <div v-for="user of this.$data.users" :key="user.id">
          <div class="flex p-10">
            <div class="show-res-users p-10">
              {{ user.lastname }} {{ user.firstname }}
            </div>
            <div class="margin-button-search">
              <button @click="delUser(user.id)">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  </div>
</template>

<script>
import Formik, { Field, Form, Button } from "../../../service/Formik";
import PageTitle from "../../../components/PageTitle";
import validation from "../../../utils/validation";
import dispatchApi from "../../../api/dispatchApi";
import SearchUserInGroup from "../../SearchUserInGroup.vue";

// owner récuper dans les localstorage

export default {
  name: "Role-assignation",
  components: {
    Formik,
    Field,
    Form,
    Button,
    PageTitle,
    SearchUserInGroup,
  },
  props: ["roles", "groupId", "group"],
  data() {
    return {
      users: [],
      hasRightToRole: Boolean,
      displayCreateRole: false,
      rights: [],
      groupUsers: [],
      selectedRights: [],
    };
  },
  methods: {
    onSubmit: async function (values) {
      let owner = {
        id: window.localStorage.getItem("user_id"),
      };
      let users = [];
      for (let i = 0; i < this.$data.users.length; i++) {
        users.push({
          id: this.$data.users[i].id,
        });
      }
      values.users = users;
      values.owner = owner;
      values.group = this.$props.groupId;
      values.rights = this.$data.selectedRights;
      console.log(values);
      await dispatchApi("role", "createRole", values);
    },

    selectedRight: function (event) {
      console.log(event.target.value);

      let isInArray = false;
      for (let RightInArray of this.$data.selectedRights) {
        if (RightInArray.id == event.target.value) {
          isInArray = true;
        }
      }
      if (!isInArray) {
        this.$data.selectedRights.push({ id: event.target.value });
      }
      console.log(this.$data.selectedRights);
    },

    onValidate: async function (values) {
      return await validation(values);
    },
    addUserFromSearchUsers: function (value) {
      this.$data.users.push(value);
    },
    delUser: function (id) {
      for (let i = 0; i < this.$data.users.length; i++) {
        if (id === this.$data.users[i].id) {
          this.$data.users.splice(i, 1);
        }
      }
    },
  },
  created() {
    document.title = "CreateRole";
  },

  async mounted() {
    this.$data.hasRightToRole = false;
    if (this.roles.length !== 0 && this.roles[0] == "owner") {
      this.$data.hasRightToRole = true;
    } else if (this.roles.length !== 0) {
      this.roles.forEach((role) => {
        role.rights.forEach((right) => {
          if (right.id == "3") {
            this.$data.hasRightToRole = true;
            return;
          }
        });
        return;
      });
    }
    // let group = await dispatchApi("group", "getGroup", this.$props.groupId);

    this.$data.rights = await dispatchApi("right", "getRights");
    console.log(this.$data.rights);
  },
};
</script>
