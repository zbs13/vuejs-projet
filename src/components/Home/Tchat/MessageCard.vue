<template>
    <div :class="sentOrReceived">
        <div class="message-sentBy">
            
            {{ sentBy.firstname }} {{ sentBy.lastname }} :
        </div>
        <div class="message-text">
            {{ text }} 
        </div>
        
    </div>
</template>

<script>

export default {
  name: 'MessageCard',
  props: ["id", "create_at", "text", "sentBy"],
  data() {
    return {
      sentOrReceived: String
    }
  },
  async mounted() {
      if(window.localStorage.getItem("user_id") == this.sentBy.id){
          this.$data.sentOrReceived = "message-card flex column sent";
      }else{
          this.$data.sentOrReceived = "message-card flex column received";
      }
  }
}
</script>