<template>
  <div>
    <PageTitle title="Inscription"/>
    <Formik
      :initialValues="{
        name: '', 
        firstname: '',
        mail: '',
        password:'',
        confirmPwd:''
        }"
      :onValidate="onValidate"
      @onSubmit="onSubmit"
      class="form form-login flex column"
    >
      <Form class="form form-login flex column">
        <Field class="field" type="text" name="name" placeholder="Nom" required="required"/>
        <Field class="field" type="text" name="firstname" placeholder="Prénom" required="required"/>
        <Field class="field" type="email" name="mail" placeholder="Email" required="required"/>
        <Field class="field" type="password" name="password" placeholder="Mot de passe" required="required"/>
        <Field class="field" type="password" name="confirmPwd" placeholder="Confirmation du mot de passe" required="required"/>

        <Button class="cta submit" type="submit" value="S'inscrire" />
      </Form>
    </Formik>
  </div>
</template>

<script>
    import Formik, { Field, Form, Button } from '../service/Formik';
    import PageTitle from '../components/PageTitle';
    import validation from '../utils/validation';
    import dispatchApi from '../api/dispatchApi';

export default {
  name: 'Signup',
  components: {
            Formik,
            Field,
            Form,
            Button,
            PageTitle
        },
  methods: {
            onSubmit : async function(values){
                await dispatchApi("auth", "signup", values);
            },
            onValidate : async function(values){
               return await validation(values);
            }
        }
  }
</script>
