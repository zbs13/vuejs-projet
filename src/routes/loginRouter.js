import Login from "../pages/Login";
import DisconnectedHeader from "../components/DisconnectedHeader";

export default [
    {
        path: "/login",
        components: {
            default: Login,
            header: DisconnectedHeader,
        },
        props: {
            header: {
                isLogin: true
            }
        }
    }
]