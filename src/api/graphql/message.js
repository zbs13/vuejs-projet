import {reqGraphQL} from '../request';
import gql from 'graphql-tag';
import store from "../../store/app";

export const message = {
    getGroupMessage: function(value) {
        return reqGraphQL(
            'query',
            gql`query($value: ID!){
                messages(
                    where: {
                        toGroup: {
                            id: $value
                        }
                    }
                ),{
                    id,
                    create_at,
                    text,
                    sentBy{
                        id,
                        lastname,
                        firstname
                    }
                }
              }`, 
              {
                value: value,
              },
            'Récupération des messages du groupe en cours...',
            true,
            function(res){
                return res.messages;
            }
        )
    },
    createMessage: function({text, groupId}) {
        reqGraphQL(
            'mutation',
            gql`mutation($text: String!, $userId: ID!, $groupId: ID!){
                createMessage(
                    data:{
                        text: $text,
                        sentBy:{
                            connect:{
                                id: $userId
                            }
                        },
                        toGroup:{
                            connect:{
                                id: $groupId
                            }
                        }
                    }
                ),
                {
                    id
                }
              }`, 
              {
                text: text,
                userId: window.localStorage.getItem("user_id"),
                groupId: groupId
              },
            'Création du message en cours...',
            true,
            function() {
                store.dispatch("addPopup", {
                    type: "success",
                    message: "Votre message a été créer"
                });
            }
        )
    },
    messageSubscription: function() {
        
        return reqGraphQL(
            'subscription',
            gql`subscription($token:String!){
                newMessage(
                    token:$token
                ),
                {
                    mutation,
                    node{
                    id,
                    text,
                    sentBy{
                        email
                    },
                    toGroup{
                        name
                    }
                    }
                }
              }`, 
              {
                token: window.localStorage.getItem("auth_token"),
              }
        )
    }
    
}