//import { mapActions } from "vuex";
let yup = require('yup');

const validationSchema = yup.object().shape({
  mail: yup.string().email("Le mail a un format incorrect"),
  password: yup.string()
                .min(7, "Le mot de passe doit contenir au moins 7 caractères")
                .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
                .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
                .matches(/[0-9]/, "Le mot de passe doit contenir au moins un numéro")
});

// let actions = {
//     ...mapActions(["addPopup"])
// };

// check validity
export default async function validation(values){
    let errors = [];
    await validationSchema.validate(values)
    .catch(function (err) {
        errors.push(err.errors[0]);
    });

    if(errors.length > 0){
        //actions.addPopup(errors);
        return false;
    }

    return true;
}