<template>
    <div class="message-card flex column">
        <div class="message-sentBy">
            {{ sentBy.firstname }} {{ sentBy.lastname }} :
        </div>
        <div class="message-text">
            {{ text }} 
            {{ create_at }}
        </div>
        
    </div>
</template>

<script>

export default {
  name: 'MessageCard',
  props: ["id", "create_at", "text", "sentBy"]
}
</script>