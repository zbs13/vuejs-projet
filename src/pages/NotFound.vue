<template>
    <div class="page-not-found-block flex column">
      <div class="p-10 font-b font-s-20 flex justify-center">
        Oops
      </div>
      <div class="p- 10 flex justify-center">
        Il semblerait que cette page soit introuvable
      </div>
    </div>
</template>

<script>
export default {
  name: 'NotFound',
  created(){
      document.title = "Page non trouvée";
  }
}
</script>
