import { reqGraphQL } from '../request';
import gql from 'graphql-tag';

export const users = {
    searchUsers: function (value) {
        return reqGraphQL(
            'query',
            gql`query($value: String){
                users(
                    where: {
                        OR: [
                            {firstname_starts_with: $value},
                            {lastname_starts_with: $value}
                        ]
                    }
                ),{
                    id,
                    firstname,
                    lastname
                }
              }`,
            {
                value: value
            },
            null,
            true,
            function (res) {
                return res;
            }
        )
    },
    searchUsersByGroup: function ({ value, groupId }) {
        console.log(value, groupId)
        return reqGraphQL(
            'query',
            gql`query($value: String, $groupId: ID){
                users(
                    where: {
                            OR: [
                                {firstname_starts_with: $value},
                                {lastname_starts_with: $value}
                            ],
                            groups_some: {
                                id: $groupId
                        }
                    }
                ),{
                    id,
                    firstname,
                    lastname
                }
              }`,
            {
                value: value,
                groupId: groupId
            },
            null,
            true,
            function (res) {
                return res;
            }
        )
    }
}