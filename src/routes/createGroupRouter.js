import CreateGroup from "../pages/CreateGroup";
import ConnectedHeader from "../components/Header/ConnectedHeader";

export default [
    {
        path: "/create-group",
        components: {
            default: CreateGroup,
            header: ConnectedHeader,
        },
        props: {
            header: {
                isLogin: true
            },
            needLogged: true
        }
    }
]