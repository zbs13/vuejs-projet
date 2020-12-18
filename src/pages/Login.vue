<!--
TEST SANS BALISE <form>

<template>
    <div>
        <PageTitle title="Connexion"/>
        <Formik
            :initialValues="{mail: '', password: '', test: ''}"
            :onValidate="onValidate"
            @onSubmit="onSubmit"
            class="form form-login flex column"
        >
            <Field class="field" type="text" name="mail" placeholder="Mail" required="required"/>
            <Field class="field" type="password" name="password" placeholder="Mot de passe" required="required"/>
            <TestInput name="test" />
            <Button class="cta submit" value="Se connecter" handleSubmit />
        </Formik>
    </div>
</template>
-->

<template>
    <div>
        <PageTitle title="Connexion"/>
        <Formik
            :initialValues="{mail: '', password: ''}"
            :onValidate="onValidate"
            @onSubmit="onSubmit"
            class="form form-login flex column"
        >
            <Form class="form form-login flex column">
                <Field class="field" type="text" name="mail" placeholder="Mail" required="required"/>
                <Field class="field" type="password" name="password" placeholder="Mot de passe" required="required"/>
                <Button type="submit" class="cta submit" value="Se connecter" />
            </Form>
        </Formik>
    </div>
</template>


<script>

    import Formik, { Field, Button, Form } from '../service/Formik';
    import PageTitle from '../components/PageTitle';
    import validation from '../utils/validation';
    import dispatchApi from '../api/dispatchApi';

    export default {
        name: 'Login',
        components: {
            Formik,
            Field,
            Button,
            PageTitle,
            Form
        },
        methods: {
            onSubmit : async function(values){
                await dispatchApi("auth", "connect", values);
            },
            onValidate : async function(values){
               return await validation(values);
            }
        }
    }
    
</script>
