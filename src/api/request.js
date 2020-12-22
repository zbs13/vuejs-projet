import store from "../store/app";
import { GraphQLClient } from 'graphql-request';
import provider from '../utils/provider';

export async function post(endpoint, data = null, waitMessage = null, needAuth = false, callback = null){
    let headers = new Headers();
    needAuth ? headers = new Headers({
        'authorization': window.localStorage.getItem("auth_token")
    }) : null;
    let datas = new FormData();
    if(data !== null){
        for(let key in data){
            datas.append(key, data[key]);
        }
    }
    let waitPopupId;
    if(waitMessage !== null){
        let popupId = await store.dispatch("addPopup", {
            type: "wait",
            message: waitMessage
        });
        waitPopupId = popupId;
    }
    return fetch(provider.url.API_PLATEFORM + endpoint,
    {
        method: "POST",
        headers: headers,
        body: datas
    }).then(response => response.json())
    .then(data => {
        store.dispatch("removePopup", waitPopupId);
        if(callback !== null)
            return callback(data);
    }).catch(function(){
        store.dispatch("removePopup", waitPopupId);
        store.dispatch("addPopup", {
            type: "error",
            message: "Oups, une erreur est survenue"
        });
    });
}

export function get(endpoint, datas = null, waitMessage = null, needAuth = false, callback = null){
    return Get_Patch_Delete_Requests(endpoint, datas, waitMessage, "GET", needAuth, callback);
}

export function patch(endpoint, datas = null, waitMessage = null, needAuth = false, callback = null){
    return Get_Patch_Delete_Requests(endpoint, datas, waitMessage, "PATCH", needAuth, callback);
}

export function deleteMethod(endpoint, datas = null, waitMessage = null, needAuth = false, callback = null){
    return Get_Patch_Delete_Requests(endpoint, datas, waitMessage, "DELETE", needAuth, callback);
}

async function Get_Patch_Delete_Requests(endpoint, datas, waitMessage, method, needAuth, callback){
    let headers = new Headers();
    needAuth ? headers = new Headers({
        'authorization': window.localStorage.getItem("auth_token")
    }) : null;
    let parameters = "";
    if(datas !== null){
        parameters = datas.join("/");
    }
    let waitPopupId;
    if(waitMessage !== null){
        let popupId = await store.dispatch("addPopup", {
            type: "wait",
            message: waitMessage
        });
        waitPopupId = popupId;
    }
    parameters = parameters !== "" ? `/${parameters}`: "";
    return fetch(provider.url.API_PLATEFORM + endpoint + parameters,
    {
        method: method,
        headers: headers
    }).then(response => response.json())
    .then(data => {
        store.dispatch("removePopup", waitPopupId);
        if(callback !== null)
            return callback(data);
    }).catch(function(){
        store.dispatch("removePopup", waitPopupId);
        store.dispatch("addPopup", {
            type: "error",
            message: "Oups, une erreur est survenue"
        });
    });
}

export async function reqGraphQL(req, vars = null, waitMessage = null, needAuth = false, callback = null){
    let options = null;
    needAuth ? options = {
        headers: {
            authorization: 'Bearer ' + window.localStorage.getItem("auth_token"),
        },
    } : null;
    const graphQLClient = new GraphQLClient(provider.url.GRAPHQL, options)
    
    let waitPopupId;
    if(waitMessage !== null){
        let popupId = await store.dispatch("addPopup", {
            type: "wait",
            message: waitMessage
        });
        waitPopupId = popupId;
    }

    return graphQLClient.request(req, vars)
        .then(function(data){
            store.dispatch("removePopup", waitPopupId);
            if(callback !== null)
                return callback(data);
        }).catch(error => {
            let jsonStr = JSON.stringify(error, undefined, 2);
            let errorCode = JSON.parse(jsonStr).response.errors[0].code || null;
            store.dispatch("removePopup", waitPopupId);
            let message = "";
            switch(errorCode){
                case 3010:
                    message = "Cet utilisateur existe déja";
                    break;
                default:
                    message = "Oops, une erreur est survenue";
            }
            store.dispatch("addPopup", {
                type: "error",
                message: message
            });
        });
}