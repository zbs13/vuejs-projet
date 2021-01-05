import {reqGraphQL} from '../request';
import { gql } from 'graphql-request';

export const users = {
    searchUsers: function(value) {
        return reqGraphQL(
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
            function(res){
                return res;
            }
        )
    }
}