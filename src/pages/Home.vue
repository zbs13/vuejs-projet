<template>
    <div>
      <PageTitle title="Mes groupes"/>
      <div class="w-100p flex">
        <GroupList :groupList="userGroups"/>
        <router-view />
      </div>
    </div>
</template>

<script>
import dispatchApi from '../api/dispatchApi'; 
import GroupList from '../components/Home/GroupList';
import PageTitle from '../components/PageTitle';

export default {
  name: 'Home',
  data() {
    return {
      userGroups: []
    }
  },
  components: {
    GroupList,
    PageTitle
  },
  created(){
      document.title = "Accueil";
  },
  async mounted() {
    let groups = await dispatchApi("group", "getUserGroups");
    this.$data.userGroups = groups;
  }
}
</script>
