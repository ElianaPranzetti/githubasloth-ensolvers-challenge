import React, { useState, useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

export const AppContext = React.createContext();

export async function postData(url, data) {
    // Opciones por defecto estan marcadas con un *
    var formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage.getItem("auth-token"),
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formBody, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export function Context({ props, children }) {
    const [isLogged, setIsLogged] = useState();

    useEffect(() => {

    }, [isLogged]);

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    let signin = async (usuario, clave) => {
        const data = await postData("http://192.168.1.23:3000/auth/signin", {
            name: usuario,
            password: clave,
        });

        if (!data.error) {
            setIsLogged(true);
            localStorage.setItem("auth-token", data.access_token);
            return "OK";
        } else {
            return data.error;
        }
    };

    let signout = () => {
        localStorage.removeItem("auth-token");
        setIsLogged(false);
    };

    return (
        <AppContext.Provider
            value={{ isLogged, setIsLogged, signin, signout }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function RequireAuth({ children, props }) {
    const auth = useContext(AppContext);

    let location = useLocation();

    //if (!auth.isLogged) {

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    //  return <Navigate to="/login" state={{ from: location }} replace />;
    //}

    return (
        <Context.Consumer>
            {" "}
            {(value) => {
                if (value.isLogged) return children;
                else return <Navigate to="/login" state={{ from: location }} replace />;
            }}{" "}
        </Context.Consumer>
    );
}