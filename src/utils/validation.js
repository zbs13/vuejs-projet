import store from "../store/app";
let yup = require('yup');

const validationSchema = yup.object().shape({
  mail: yup.string().email("Le mail a un format incorrect"),
  password: yup.string()
                .min(7, "Le mot de passe doit contenir au moins 7 caractères")
                .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
                .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
                .matches(/[0-9]/, "Le mot de passe doit contenir au moins un numéro"),
    
  name:yup.string()
                .min(3, "Le nom doit contenir au moins 3 charactères"),

  confirmPwd: yup.string()
                .oneOf([yup.ref('password'), null], "Le mot de passe n'est pas le même")
                .required('Required')
});

// check validity
export default async function validation(values){
    let errors = [];
    await validationSchema.validate(values)
    .catch(function (err) {
        errors.push(err.errors[0]);
    });

    if(errors.length > 0){
        console.log(errors);
        store.dispatch("addPopup", {
            type: "error",
            message: errors[0]
        });
        return false;
    }

    return true;
}