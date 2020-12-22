<template>
    <div class="flex space-between align-center">
        <div class="header-title">
          Application
        </div>
        <div class="flex align-center">
          <div class="p-10">
            <SwitchApi />
          </div>
          <slot />
        </div>
    </div>
</template>

<script>
  import SwitchApi from '../SwitchApi';

  export default {
    name: 'Header',
    components: {
      SwitchApi
    }
  }
</script>