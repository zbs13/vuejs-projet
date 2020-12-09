import {post} from '../request';

export const auth = {
    connect: async function({mail, pwd}) {
        return await post('monUrlEnVarGlobal', {
            email:mail, 
            password:pwd
        }, 'en connexion');
    },
    signup: async function({name, firstname, mail, password}) {
        return await post('monUrlEnVarGlobal', {
            name:name,
            firstname:firstname,
            email:mail, 
            password:password
        }, 'inscription');
    }
}