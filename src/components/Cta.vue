<template>
    <input class="cta" type="button" @click="$emit('click')"/>
</template>

<script>
  export default {
    name: 'Cta'
  };

</script>