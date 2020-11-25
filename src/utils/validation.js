import store from "../store/app";
let yup = require('yup');

const validationSchema = yup.object().shape({
  mail: yup.string().email("Le mail a un format incorrect"),
  password: yup.string()
                .min(7, "Le mot de passe doit contenir au moins 7 caractères")
                .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
                .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
                .matches(/[0-9]/, "Le mot de passe doit contenir au moins un numéro") 
});

// check validity

export default async function validation(values){
    let errors = [];
    await validationSchema.validate(values)
    .catch(function (err) {
        errors.push(err.errors[0]);
    });

    if(errors.length > 0){
        store.dispatch("addPopup", {
            type: "error",
            message: errors[0]
        });
        return false;
    }

    return true;
}