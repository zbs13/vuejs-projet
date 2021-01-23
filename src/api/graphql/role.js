import {reqGraphQL} from '../request';
import gql from 'graphql-tag';
import store from "../../store/app";

export const role = {
    getUserRolesGroup: function(groupId) {
        return reqGraphQL(
            'query',
            gql`query($id:ID!,$groupId: ID!){
                roles(
                  where:{
                    AND:{
                      group:{
                        id: $groupId
                      },
                      users_some:{
                        id: $id
                      }
                    }
                  }
                ),{
                    
                    id,
                    name,
                    rights {
                        id,
                        name
                    }
                    
                }
              }`, 
              {
                id: window.localStorage.getItem("user_id"),
                groupId: groupId
              },
            'Récupération des roles en cours...',
            true,
            function(res){
                return res.roles;
            }
        )
    }
   
    
}