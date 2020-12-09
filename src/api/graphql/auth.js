import {reqGraphQL} from '../request';
import { gql } from 'graphql-request';
import store from "../../store/app";

export const auth = {
    connect: function({mail, password}) {
        reqGraphQL(
            gql`mutation($mail: String!, $password: String!){
                login(
                    email: $mail,
                    password: $password
                ),{
                    token,
                    user{
                        firstname,
                        lastname,
                        email
                    }
                }
              }`, 
              {
                mail: mail,
                password: password
              },
            'en connexion'
        ).then(function(res){
            store.dispatch("addPopup", {
                type: "success",
                message: "Vous êtes connecté"
            });
            window.localStorage.setItem("auth_token", res.login.token);
            window.location.reload();
        }).catch(function(){
            store.dispatch("addPopup", {
                type: "error",
                message: "Erreur lors de la connexion"
            });
        });
    },
    signup: function({firstname, name, mail, password}) {
        reqGraphQL(
            gql`mutation($firstname: String!, $name: String!, $mail: String!, $password: String!){
                signup(
                  firstname: $firstname,
                  lastname: $name,
                  email: $mail,
                  password: $password
                ),
                {
                  token,
                  user{
                    firstname,
                    lastname,
                    email
                  }
                }
              }`, 
              {
                firstname: firstname,
                name: name,
                mail: mail,
                password: password
              },
            'en connexion'
        ).then(function(){
            store.dispatch("addPopup", {
                type: "success",
                message: "Vous êtes inscrit"
            });
            window.location = "/login";
        }).catch(function(){
            store.dispatch("addPopup", {
                type: "error",
                message: "Erreur lors de l'inscription"
            });
        });
    }
}