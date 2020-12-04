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
      <template v-slot:default>
        <Field class="field" type="text" name="name" placeholder="Nom" required="required"/>
        <Field class="field" type="text" name="firstname" placeholder="Prénom" required="required"/>
        <Field class="field" type="email" name="mail" placeholder="Email" required="required"/>
        <Field class="field" type="password" name="password" placeholder="Mot de passe" required="required"/>
        <Field class="field" type="password" name="confirmPwd" placeholder="Confirmation du mot de passe" required="required"/>

        <input class="cta submit" type="submit" value="S'inscrire" />
      </template>
    </Formik>
  </div>
</template>

<script>
    import Formik, { Field } from '../service/Formik';
    import PageTitle from '../components/PageTitle';
    import validation from '../utils/validation';

export default {
  name: 'Signup',
  components: {
            Formik,
            Field,
            PageTitle
        },
  methods: {
            onSubmit : function({name, firstname, mail, password, confirmPwd}){
                console.log("submitted");
                console.log(name);
                console.log(firstname);
                console.log(mail);
                console.log(password);
                console.log(confirmPwd);
            },
            onValidate : async function(values){
               return await validation(values);
            }
        }
  }
</script>
