<template lang="html">
  <div is="sui-button-group">
    <sui-button @click="onClick" name="api-plateform" >Api Plateform</sui-button>
    <sui-button-or />
    <sui-button positive @click="onClick" name="graphql">GraphQL</sui-button>
  </div>
</template>

<script>

    export default {
      name: 'SwitchApi',
      methods: {
        onClick: function(e){
          console.log(e.target.name);
        }
      }
    };

</script>
