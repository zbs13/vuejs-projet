<template>
  <div class="tchat">
    <Role-assignation
      :roles="userRoles"
      :groupId="this.$route.params.groupId"
    />
    <MessageList :messageList="groupMessages" :roles="userRoles" />
    <Formik
      :initialValues="{
        text: '',
      }"
      :onValidate="onValidate"
      @onSubmit="onSubmit"
      class="form flex column"
    >
      <Form class="form flex column">
        <Field
          class="field"
          type="text"
          name="text"
          placeholder="text"
          required="required"
        />
        <Button class="cta submit" type="submit" value="Envoyer" />
      </Form>
    </Formik>
  </div>
</template>

<script>
import dispatchApi from "../../api/dispatchApi";
import MessageList from "../../components/Home/Tchat/MessageList";
import RoleAssignation from "../../components/Home/Tchat/RoleAssignation";
import Formik, { Field, Form, Button } from "../../service/Formik";
import validation from "../../utils/validation";

export default {
  name: "Tchat",
  data() {
    return {
      groupMessages: [],
      userRoles: [],
      
    };
  },
  components: {
    MessageList,
    Formik,
    Field,
    Form,
    Button,
    RoleAssignation,
  },
  methods: {
    onSubmit: async function (values) {
      let groupId = this.$route.params.groupId;

      values.groupId = groupId;
      await dispatchApi("message", "createMessage", values);
    },
    onValidate: async function (values) {
      return await validation(values);
    },
  },

  async mounted() {
    let groupId = this.$route.params.groupId;

    let group = await dispatchApi("group", "getGroup", groupId);

    if (group.owner.id == window.localStorage.getItem("user_id")) {
      this.$data.userRoles = ["owner"];
    } else {
      let roles = await dispatchApi("role", "getUserRolesGroup", groupId);
      this.$data.userRoles = roles;
    }

    let messages = await dispatchApi("message", "getGroupMessage", groupId);
    this.$data.groupMessages = messages;

    let messageBlock = document.getElementById("message-block");
    messageBlock.scrollTop = messageBlock.scrollHeight;
    console.log(messageBlock.scrollHeight);

    let self = this;

    let messagesSubscription = await dispatchApi(
      "message",
      "messageSubscription"
    );
    messagesSubscription.subscribe({
      async next(data) {
        let messages = await dispatchApi("message", "getGroupMessage", groupId);
        self.$data.groupMessages = messages;

        messageBlock.scrollTop = messageBlock.scrollHeight;
      },
      error(error) {
        console.error(error);
      },
    });
  },
};
</script>