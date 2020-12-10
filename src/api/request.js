import store from "../store/app";
import { GraphQLClient } from 'graphql-request';

export function post(endpoint, data = null, waitMessage = null){
    let datas = new FormData();
    if(data !== null){
        for(let key in data){
            datas.append(key, data[key]);
        }
    }
    if(waitMessage !== null){
        store.dispatch("addPopup", {
            type: "wait",
            message: waitMessage
        });
    }
    return fetch("https://api-platform-esgi.herokuapp.com" + endpoint,
    {
        method: "POST",
        body: datas
    }).then(response => response.json())
    .then(datas => {
        return datas;
    }).catch(function(){
        store.dispatch("addPopup", {
            type: "error",
            message: "Oups, une erreur est survenue"
        });
    });
}

export function get(endpoint, datas = null, waitMessage = null){
    return Get_Patch_Delete_Requests(endpoint, datas, waitMessage, "GET");
}

export function patch(endpoint, datas = null, waitMessage = null){
    return Get_Patch_Delete_Requests(endpoint, datas, waitMessage, "PATCH");
}

export function deleteMethod(endpoint, datas = null, waitMessage = null){
    return Get_Patch_Delete_Requests(endpoint, datas, waitMessage, "DELETE");
}

function Get_Patch_Delete_Requests(endpoint, datas, waitMessage, method){
    let parameters = "";
    if(datas !== null){
        parameters = datas.join("/");
    }
    if(waitMessage !== null){
        store.dispatch("addPopup", {
            type: "wait",
            message: waitMessage
        });
    }
    parameters = parameters !== "" ? `/${parameters}`: "";
    return fetch("https://api-platform-esgi.herokuapp.com" + endpoint + parameters,
    {
        method: method,
    }).then(response => response.json())
    .then(datas => {
        return datas;
    }).catch(function(){
        store.dispatch("addPopup", {
            type: "error",
            message: "Oups, une erreur est survenue"
        });
    });
}

export async function reqGraphQL(req, vars = null, waitMessage = null){
    const url = process.env.API_GRAPHQL_URL;

    const graphQLClient = new GraphQLClient("https://graphql-projet.herokuapp.com/", {
      headers: {
        authorization: 'Bearer MY_TOKEN',
      },
    })
    
    return await graphQLClient.request(req, vars);
}