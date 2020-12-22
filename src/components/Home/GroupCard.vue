<template>
    <router-link :to="{ name: 'group', params: { groupId: id, groupName: urlFormat(name) }}" >
        <div class="group-card flex column">
            <div class="group-name">
                {{ name }}
            </div>
            <div class="group-owner">
                Propriétaire : {{ owner.firstname }} {{ owner.lastname }}
            </div>
        </div>
    </router-link>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'GroupCard',
  props: ["id", "name", "owner"],
  methods: {
      urlFormat: (value) => {
          return Vue.filter("urlFormat")(value);
      } 
  }
}
</script>