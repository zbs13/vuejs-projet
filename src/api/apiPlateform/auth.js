import {post, get} from '../request';

export const auth = {
    connect: async function({mail, password}) {
        return await post('/login', {
            email: mail, 
            password: password
        }, 'Connexion en cours...',
        false,
        function(data){
            return data;
        });
    },
    signup: async function({name, firstname, mail, password}) {
        return await post('/users/create', {
            lastname: name,
            firstname: firstname,
            email: mail, 
            password: password
        }, 'Inscription en cours...',
        false,
        function(data){
            return data;
        });
    },
    checkIfUserConnected: async function() {
        return await get('/users/check', null, null, true,
        function(data){
            return data;
        }); // endpoint a modif !!!!
    }
}