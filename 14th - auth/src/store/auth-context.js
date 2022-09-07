import React, {useCallback, useEffect} from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {
    },
    logout: () => {
    }
});

let logoutTimer;

const calcRemainingTime = (expTime) => {
    const currentTime = new Date().getTime();
    const adjExpTime = new Date(expTime).getTime();

    return adjExpTime - currentTime;

}
const retrieveValidStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    //check to see if we have time left for the stored token
    const remainingTime = calcRemainingTime(storedExpirationDate);
    if (remainingTime < 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }
    return {
        token: storedToken,
        duration: remainingTime
    }
}
export const AuthContextProvider = (props) => {
    const tokenData = retrieveValidStoredToken();
    let initialToken;
    if (tokenData) initialToken = tokenData.token;
    const [token, setToken] = React.useState(initialToken);

    const userIsLoggedIn = !!token;

    // this function is used ass useEffect dependency so we used "useCallback"
    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if (logoutTimer) clearTimeout(logoutTimer);
    }, []);
    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        const remainingTime = calcRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
    // Setting logoutHandler to remaining time if we automatically logged in the user
    // Getting calculated duration by the stored duration time
    useEffect(() => {
        if (tokenData) logoutTimer = setTimeout(logoutHandler, tokenData.duration);

    }, [tokenData, loginHandler])

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;
