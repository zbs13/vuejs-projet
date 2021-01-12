import {reqGraphQL} from '../request';
import gql from 'graphql-tag';
import store from "../../store/app";

export const auth = {
    connect: function({mail, password}) {
        reqGraphQL(
          'mutation',
            gql`mutation($mail: String!, $password: String!){
                login(
                    email: $mail,
                    password: $password
                ),{
                    token,
                    user{
                        id,
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
            'Connexion en cours...',
            false,
            function(data){
                store.dispatch("addPopup", {
                    type: "success",
                    message: "Vous êtes connecté"
                });
                window.localStorage.setItem("auth_token", data.login.token);
                window.localStorage.setItem("user_id", data.login.user.id);
                window.location.reload();
            }
        )
    },
    signup: function({firstname, name, mail, password}) {
        reqGraphQL(
          'mutation',
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
            'Inscription en cours...',
            false,
            function() {
                store.dispatch("addPopup", {
                    type: "success",
                    message: "Vous êtes inscrit"
                });
                window.location = "/login";
            }
        )
    },
    checkIfUserConnected: function() {
        return reqGraphQL(
          'mutation',
            gql`mutation($token: String!){
                verifToken(
                  token: $token
                ),
                {
                  isConnected
                }
            }`,
            {
                token: window.localStorage.getItem("auth_token")
            },
            null,
            true,
            function(data){
                return data.verifToken.isConnected || false;
            }
        );
    }
}