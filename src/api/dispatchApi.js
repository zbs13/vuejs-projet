import { auth as GraphQlAuth } from "./graphql/auth";
import { auth as ApiPlateformAuth } from "./apiPlateform/auth";
import { group as GraphQlGroup } from "./graphql/group";
import { group as ApiPlateformGroup } from "./apiPlateform/group";
import { message as GraphQlMessage } from "./graphql/message";
import { message as ApiPlateformMessage } from "./apiPlateform/message";
import { role as GraphQlRole } from "./graphql/role";
import { role as ApiPlateformRole } from "./apiPlateform/role";
import { users as GraphQlUsers } from "./graphql/users";
import { right as GraphQlRight } from "./graphql/right";

export default async function dispatchApi(type, endpoint, values = null) {
    if (window.localStorage.getItem("apiSelected") && window.localStorage.getItem("apiSelected") === "graphql") {
        switch (type) {
            case "auth":
                return GraphQlAuth[endpoint](values);
            case "group":
                return GraphQlGroup[endpoint](values);
            case "message":
                return GraphQlMessage[endpoint](values);
            case "role":
                return GraphQlRole[endpoint](values);
            case "users":
                return GraphQlUsers[endpoint](values);
            case "right":
                return GraphQlRight[endpoint](values);
        }
    } else {
        switch (type) {
            case "auth":
                return ApiPlateformAuth[endpoint](values);
            case "group":
                return ApiPlateformGroup[endpoint](values);
            case "message":
                return ApiPlateformMessage[endpoint](values);
            case "role":
                return ApiPlateformRole[endpoint](values);
            // TODO faire pour apiplat les searchusers
        }
    }
}