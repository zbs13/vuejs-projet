import store from "../store/app";

export function post(url, data = null, waitMessage = null){
    let datas = new FormData();
    if(data !== null){
        for(let key in data){
            datas.append(key, data[key]);
        };
    }
    if(waitMessage !== null){
        store.dispatch("addPopup", {
            type: "wait",
            message: waitMessage
        });
    }
    return fetch(url,
    {
        method: "POST",
        body: datas
    }).then(response => response.json())
    .then(datas => {
        return datas;
    }).catch(function(data){
        store.dispatch("addPopup", {
            type: "error",
            message: "Oups, une erreur est survenue"
        });
    });
}

export function get(url, datas = null, waitMessage = null){
    return Get_Patch_Delete_Requests(url, datas, waitMessage, "GET");
}

export function patch(url, datas = null, waitMessage = null){
    return Get_Patch_Delete_Requests(url, datas, waitMessage, "PATCH");
}

export function deleteMethod(url, datas = null, waitMessage = null){
    return Get_Patch_Delete_Requests(url, datas, waitMessage, "DELETE");
}

function Get_Patch_Delete_Requests(url, datas, waitMessage, method){
    let parameters = "";
    if(datas !== null){
        parameters = datas.join("/");
    }
    if(waitMessage !== null){
        Status.message("wait", waitMessage);
    }
    parameters = parameters !== "" ? `/${parameters}`: "";
    return fetch(url + parameters,
    {
    method: method,
    }).then(response => response.json())
    .then(datas => {
        //Status.removeMessage();
        return datas;
    }).catch(function(data){
        // Status.removeMessage();
        // Status.message("error", "Oups, une erreur est survenue");
        // return {status: "error"};
    });
}