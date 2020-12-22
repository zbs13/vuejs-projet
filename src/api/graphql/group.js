import {reqGraphQL} from '../request';
import { gql } from 'graphql-request';
//import store from "../../store/app";

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
    }
}