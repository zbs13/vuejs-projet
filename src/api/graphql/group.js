import {reqGraphQL} from '../request';
import { gql } from 'graphql-request';
import store from "../../store/app";

export const group = {
    getUserGroups: function() {
        return reqGraphQL(
            gql`query($id: ID!){
                user(
                    where: {
                        id: $id
                    }
                ),{
                    groups{
                        id,
                        name,
                        owner {
                            firstname,
                            lastname
                        }
                    }
                }
              }`, 
              {
                id: window.localStorage.getItem("user_id"),
              },
            'Récupération des groupes en cours...',
            true,
            function(res){
                return res.user.groups;
            }
        )
    },
    createGroup: function({name, users}) {
        reqGraphQL(
            gql`mutation($name: String!, $users: [UserWhereUniqueInput!]){
                createGroup(
                  data: {
                    name: $name,
                    users: {
                      connect: $users
                    }
                  }
                ),
                {
                  id
                }
              }`, 
              {
                
                name: name,
                users: users
              },
            'Création du groupe en cours...',
            true,
            function() {
                store.dispatch("addPopup", {
                    type: "success",
                    message: "Votre groupe est créer"
                });
                window.location = "/groups";
            }
        )
    }
    
}