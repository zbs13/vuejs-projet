import { auth as GraphQlAuth } from "./graphql/auth";
import { auth as ApiPlateformAuth } from "./apiPlateform/auth";

export default async function dispatchApi(type, endpoint, values){
    if(window.localStorage.getItem("apiSelected") && window.localStorage.getItem("apiSelected") === "graphql"){
        switch(type){
            case "auth":
                return GraphQlAuth[endpoint](values);
        }
    }else{
        switch(type){
            case "auth":
                return ApiPlateformAuth[endpoint](values);
        }
    }
}