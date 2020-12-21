import Home from "../pages/Home";
import ConnectedHeader from "../components/ConnectedHeader";

export default [
    {
        path: "/",
        components: {
            default: Home,
            header: ConnectedHeader
        },
        props: {
            needLogged: true
        }
    }
]