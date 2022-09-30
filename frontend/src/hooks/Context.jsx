import React, { useState, useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { domain } from "../utils";

export const AppContext = React.createContext();

export async function postData(method, url, data, header) {
    // Opciones por defecto estan marcadas con un *
    var formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: header,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formBody, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export function Context({ children }) {
    const [isLogged, setIsLogged] = useState();

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    const signin = async (usuario, clave) => {
        const data = await postData("POST", `${domain}/auth/signin`, {
            name: usuario,
            password: clave,
        }, {
            "Content-Type": "application/x-www-form-urlencoded",
        });

        if (!data.error) {
            setIsLogged(true);
            localStorage.setItem("auth-token", data.access_token);
            return "OK";
        } else {
            return data.error;
        }
    };

    const signout = () => {
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
