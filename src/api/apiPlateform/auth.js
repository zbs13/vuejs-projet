import {post} from '../request';

export const auth = {
    connect: async function({mail, password}) {
        return await post('/login', {
            email: mail, 
            password: password
        }, 'en connexion');
    },
    signup: async function({name, firstname, mail, password}) {
        return await post('/users/create', {
            lastname: name,
            firstname: firstname,
            email: mail, 
            password: password
        }, 'inscription');
    }
}