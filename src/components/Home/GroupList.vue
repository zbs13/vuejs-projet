<template>
    <div class="group-block">
        <div class="group-list">
            <div v-if="groupList.length !== 0">
                <div v-for="group in groupList" :key="group.id">
                    <GroupCard :id="group.id" :name="group.name" :owner="group.owner" />
                </div>
            </div>
            <div class="no-group" v-else>
                Aucun groupe
            </div>
        </div>
        <div class="cta-add-group">
            <router-link to="/create-group" class="link add-group-link">Créer un groupe</router-link>
        </div>
    </div>
</template>

<script>
import GroupCard from './GroupCard';

export default {
  name: 'GroupList',
  components: {
      GroupCard
  },
  props: ["groupList"]
}
</script>