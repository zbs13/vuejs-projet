import { reqGraphQL } from '../request';
import gql from 'graphql-tag';
import store from "../../store/app";

export const right = {
    getRights: function () {
        return reqGraphQL(
            'query',
            gql`query(){
                    rights, 
                        {
                            id,
                            name
                        }  
                      }
                    }`,
            null,
            'Récupération des roles en cours...',
            true,
            function (res) {
                console.log(res);
                return res.rights;
            }
        )
    }

}