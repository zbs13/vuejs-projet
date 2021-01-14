import store from "../store/app";
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import provider from '../utils/provider';

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


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

export async function reqGraphQL(type, req, vars = null, waitMessage = null, needAuth = false, callback = null){
    let options = null;
    needAuth ? options = {
        headers: {
            Authorization: window.localStorage.getItem("auth_token")
        },
    } : null;
    
    const graphQLClient = new ApolloClient({
        link: new HttpLink({
            uri: provider.url.GRAPHQL,
            headers: {
                Authorization: window.localStorage.getItem("auth_token")
            }
        }),
        cache: new InMemoryCache(),
      });
    
    let waitPopupId;
    if(waitMessage !== null){
        let popupId = await store.dispatch("addPopup", {
            type: "wait",
            message: waitMessage
        });
        waitPopupId = popupId;
    }

    

    let queryDef;
    switch(type){
        case 'query':
            queryDef = graphQLClient.query({
                query: req,
                variables: vars
            })
            break;
        case 'mutation':
            queryDef = graphQLClient.mutate({
                mutation: req,
                variables: vars
            })
            break;
            
    }

    if(type == 'subscription'){
        const httpLink = new HttpLink({
            // You should use an absolute URL here
            uri: provider.url.GRAPHQL,
        })

        // Create the subscription websocket link
        const wsLink = new WebSocketLink({
            uri: provider.url.WEBSOCKET_GRAPHQL,
            options: {
            reconnect: true,
            },
        })
        
        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
            // split based on operation type
            ({ query }) => {
            const definition = getMainDefinition(query)
            return definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            },
            wsLink,
            httpLink
        )
        
        // Create the apollo client
        const graphQLClient = new ApolloClient({
            link,
            cache: new InMemoryCache(),
            connectToDevTools: true,
        })


        return queryDef = graphQLClient.subscribe({
            query: req,
            variables: vars
        })

    }

   

    return queryDef
        .then(function(res){
            store.dispatch("removePopup", waitPopupId);
            if(callback !== null)
                return callback(res.data);
        }).catch(error => {
            console.log(error);
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