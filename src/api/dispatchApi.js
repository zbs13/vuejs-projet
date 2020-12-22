import { auth as GraphQlAuth } from "./graphql/auth";
import { auth as ApiPlateformAuth } from "./apiPlateform/auth";
import { group as GraphQlGroup } from "./graphql/group";
import { group as ApiPlateformGroup } from "./apiPlateform/group";

export default async function dispatchApi(type, endpoint, values = null){
    if(window.localStorage.getItem("apiSelected") && window.localStorage.getItem("apiSelected") === "graphql"){
        switch(type){
            case "auth":
                return GraphQlAuth[endpoint](values);
            case "group":
                return GraphQlGroup[endpoint](values);
        }
    }else{
        switch(type){
            case "auth":
                return ApiPlateformAuth[endpoint](values);
            case "group":
                return ApiPlateformGroup[endpoint](values);
        }
    }
}