<template>
    <div>
        <PageTitle title="Création de groupe" />
    
        <Formik :initialValues="{
                                    name: ''
                                    }" :onValidate="onValidate" @onSubmit="onSubmit" class="form form-login flex column">
            <SearchUser @onAddUser="addUserFromSearchUsers" :usersInGroup="this.$data.users" />
            <Form class="form form-login flex column">
                <Field class="field" type="text" name="name" placeholder="Nom" required="required" />
                <Button class="cta submit" type="submit" value="Créer le groupe" />
            </Form>
            <div class="result-search-users">
                <div v-if="this.$data.users.length !== 0" class="font-s-20 font-b p-10">Liste des utilisateurs :</div>
                <div v-for="user in this.$data.users" :key="user.id">
                    <div class="flex p-10" >
                        <div class="show-res-users p-10">
                            {{user.lastname}} {{user.firstname}}
                        </div>
                        <div class="margin-button-search">
                            <button @click="delUser(user.id)">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        </Formik>
    </div>
</template>

<script>
import Formik, { Field, Form, Button } from '../service/Formik';
import PageTitle from '../components/PageTitle';
import validation from '../utils/validation';
import dispatchApi from '../api/dispatchApi';
import SearchUser from '../components/SearchUsers'
// owner récuper dans les localstorage 

export default {
    name: 'CreateGroup',
    components: {
        Formik,
        Field,
        Form,
        Button,
        PageTitle,
        SearchUser
    },
    data() {
        return {
            users: []
        }
    },
    methods: {
        onSubmit: async function(values) {
            
            let owner = {
                id: window.localStorage.getItem("user_id")
            }
            let users = [];
            for(let i = 0; i < this.$data.users.length; i++){
                users.push({
                    id: this.$data.users[i].id
                })
            }
            users.push({
                id: window.localStorage.getItem("user_id")
            })
            values.users = users;
            values.owner = owner;

            await dispatchApi("group", "createGroup", values);
        },
        onValidate: async function(values) {
            return await validation(values);
        },
        addUserFromSearchUsers: function(value) {
            this.$data.users.push(value);
        },
        delUser: function(id) {
            for(let i = 0; i < this.$data.users.length; i++) {
                if(id === this.$data.users[i].id) {
                    this.$data.users.splice(i, 1);
                }
            }
        }
    },
    created() {
        document.title = "CreateGroup";
    }
}
</script>
