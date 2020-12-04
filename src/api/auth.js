import {post} from './request';

export async function connect(mail, pwd) {
    return await post('monUrlEnVarGlobal', {
        email:mail, 
        password:pwd
    }, 'en connexion');
}

export async function signup(name, firstname, mail, password) {
    return await post('monUrlEnVarGlobal', {
        name:name,
        firstname:firstname,
        email:mail, 
        password:password
    }, 'inscription');
}