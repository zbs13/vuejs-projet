<template>
    <div>
        <Formik
            :initialValues="{mail: '', password: ''}"
            :onValidate="onValidate"
            @onSubmit="onSubmit"
        >
            <template v-slot:default>
                <Field type="text" name="mail" placeholder="Mail" required="required"/>
                <Field type="password" name="password" placeholder="Mot de passe" required="required"/>
                <input type="submit" value="Se connecter" />
            </template>
        </Formik>
    </div>
</template>

<script>
    import Formik, { Field } from '../service/Formik';
    import validation from '../utils/validation';
    import store from "../store/app";

    export default {
        name: 'Login',
        components: {
            Formik,
            Field
        },
        methods: {
            onSubmit : function({mail, password}){
                console.log(mail);
                console.log(password);
                console.log("submitted");
                store.dispatch("addPopup", {
                    type: "success",
                    message: "Vous êtes loggé"
                })
            },
            onValidate : async function(values){
               return await validation(values);
            }
        }
    }
</script>
