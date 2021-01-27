import { reqGraphQL } from '../request';
import gql from 'graphql-tag';
import store from "../../store/app";

export const group = {
  getUserGroups: function () {
    return reqGraphQL(
      'query',
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
      function (res) {
        return res.user.groups;
      }
    )
  },
  getGroup: function (groupId) {
    return reqGraphQL(
      'query',
      gql`query($id: ID!){
              group(
                  where: {
                      id: $id
                  }
              ),{
                  
                  id,
                  name,
                  owner {
                      id,
                      firstname,
                      lastname
                  },
                  users {
                    id,
                    firstname,
                    lastname
                  }
                  
              }
            }`,
      {
        id: groupId,
      },
      'Récupération des groupes en cours...',
      true,
      function (res) {
        return res.group;
      }
    )
  },
  getUsersByGroup: function (groupId) {
    return reqGraphQL(
      'query',
      gql`query($id: ID!){
              group(
                  where: {
                      id: $id
                  }
              ),{
                  users {
                    id,
                    firstname,
                    lastname
                  }
                  
              }
            }`,
      {
        id: groupId,
      },
      'Récupération des utilisateurs en cours...',
      true,
      function (res) {
        return res.group;
      }
    )
  },
  createGroup: function ({ name, users }) {
    reqGraphQL(
      'mutation',
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
      function () {
        store.dispatch("addPopup", {
          type: "success",
          message: "Votre groupe est créer"
        });
        window.location = "/groups";
      }
    )
  }

}