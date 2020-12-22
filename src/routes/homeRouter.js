import Home from "../pages/Home";
import ConnectedHeader from "../components/Header/ConnectedHeader";
import Tchat from "../components/Home/Tchat";

export default [
    {
        path: "/groups",
        components: {
            default: Home,
            header: ConnectedHeader
        },
        props: {
            needLogged: true
        },
        children: [
            {
                path: ':groupId/:groupName',
                name: 'group',
                component: Tchat
            }
        ]
    }
]