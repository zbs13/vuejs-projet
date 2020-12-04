<template>
    <div>
        <PageTitle title="Connexion"/>
        <Formik
            :initialValues="{mail: '', password: ''}"
            :onValidate="onValidate"
            @onSubmit="onSubmit"
            class="form form-login flex column"
        >
            <template v-slot:default>
                <Field class="field" type="text" name="mail" placeholder="Mail" required="required"/>
                <Field class="field" type="password" name="password" placeholder="Mot de passe" required="required"/>
                <input class="cta submit" type="submit" value="Se connecter" />
            </template>
        </Formik>
    </div>
</template>

<script>

    import Formik, { Field } from '../service/Formik';
    import PageTitle from '../components/PageTitle';
    import validation from '../utils/validation';
    import store from "../store/app";
    import {connect} from '../api/auth';

    export default {
        name: 'Login',
        components: {
            Formik,
            Field,
            PageTitle
        },
        methods: {
            onSubmit : async function({mail, password}){
                const res = await connect(mail, password);
                console.log(res);
            },
            onValidate : async function(values){
               return await validation(values);
            }
        }
    }
    
</script>
