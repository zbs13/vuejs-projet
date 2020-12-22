import Signup from "../pages/Signup";
import DisconnectedHeader from "../components/Header/DisconnectedHeader";

export default [
    {
        path: "/signup",
        components: {
            default: Signup,
            header: DisconnectedHeader,
        },
        props: {
            header: {
                isLogin: false
            },
            needLogged: false
        }
    }
]