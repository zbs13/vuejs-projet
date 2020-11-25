<template>
  <h1 class="page-title">{{ title }}</h1>
</template>

<script>
  export default {
    name: 'PageTitle',
    props: {
      title: {
          required: true,
          type: String
      }
    }
  };

</script>