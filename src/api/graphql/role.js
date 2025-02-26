import { reqGraphQL } from '../request';
import gql from 'graphql-tag';
import store from "../../store/app";

export const role = {
  getUserRolesGroup: function (groupId) {
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
      function (res) {
        return res.roles;
      }
    )
  },
  createRole: function ({ name, group, users, rights }) {
    reqGraphQL(
      'mutation',
      gql`mutation($name: String!, $group: ID!, $users: [UserWhereUniqueInput!], $rights: [RightWhereUniqueInput!] ){
            createRole(
              data: {
                name: $name,
                rights:{
                  connect: $rights
                },
                group:{
                    connect:{
                        id: $group
                    }
                },
                users:{
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
        users: users,
        group: group,
        rights: rights
      },
      'Création du role cours...',
      true,
      function () {
        store.dispatch("addPopup", {
          type: "success",
          message: "Votre role a été crée"
        });
        window.location = "/groups";
      }
    )
  },
  deleteRole: function (roleId) {
    reqGraphQL(
      'mutation',
      gql`mutation($roleId: ID!){
            deleteRole(
                where:{
                    id: $roleId
                }
            ),
            {
                id
            }
          }`,
      {
        roleId: roleId
      },
      'Suppression du role en cours...',
      true,
      function () {
        store.dispatch("addPopup", {
          type: "success",
          message: "Votre role a été supprimé"
        });
      }
    )
  },


}