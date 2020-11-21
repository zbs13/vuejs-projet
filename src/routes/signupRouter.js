import Signup from "../pages/Signup";
import DisconnectedHeader from "../components/DisconnectedHeader";

export default [
    {
        path: "/signup",
        components: {
            default: Signup,
            header: DisconnectedHeader
        }
    }
]