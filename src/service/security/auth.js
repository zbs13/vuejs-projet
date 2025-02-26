import dispatchApi from '../../api/dispatchApi';

const Auth = {
    isConnected: async() => {
        let isLogged = window.localStorage.getItem("isLogged");
        if(isLogged && (isLogged === "true" || isLogged === "false")){
            return (isLogged === "true");
        }

        await Auth.checkConnectionStatus();
        return Auth.isConnected();
    },
    checkConnectionStatus: async(callback = null) => {
        if(window.localStorage.getItem("auth_token")){
            let isConnected = await dispatchApi("auth", "checkIfUserConnected"); // variables a changer (isUserConnected) selon api
            window.localStorage.setItem("isLogged", isConnected);
            if(callback !== null){
                callback();
            }
            return;
        }

        window.localStorage.setItem("isLogged", false);
        if(callback !== null){
            callback();
        }
    }
}

export default Auth;