<template>
    <div class="message-block">
        <div class="message-list">
            <div v-if="messageList.length !== 0">
                <div v-for="message in messageList" :key="message.id">
                    <MessageCard :id="message.id" :create_at="message.create_at" :text="message.text" :sentBy="message.sentBy" />
                </div>
            </div>
            <div class="no-message" v-else>
                Aucun message
            </div>
        </div>
        <!--
        <div class="cta-add-message">
            <router-link to="/create-message" class="link add-message-link">Créer un message</router-link>
        </div>
        -->
    </div>
</template>

<script>
import MessageCard from './MessageCard';

export default {
  name: 'MessageList',
  components: {
      MessageCard
  },
  props: ["messageList"]
}
</script>