import React, { useContext, useState } from "react";
import { Button } from "@chakra-ui/react";
import { AppContext } from "../hooks/Context";

export function LogOut() {
    const auth = useContext(AppContext);

    return (
        <>
            {" "}
            {auth.isLogged ? (
                <Button
                    ml="3"
                    fontSize="0.8em"
                    colorScheme="purple"
                    onClick={auth.signout}
                >
                    Cerrar sesión
                </Button>
            ) : (
                <></>
            )}
        </>
    );
}