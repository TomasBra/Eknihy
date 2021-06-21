import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../App";

export function CheckAdminLogin(): any {
    let history = useHistory();
    const { User, SetUser }: any = useContext(GlobalContext);

    useEffect(() => {
        if (User != null && Object.keys(User).length !== 0) {
            console.log(User);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(User)
            };
            fetch('/api/users/check', requestOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response.Role == null) {
                        history.push("/login");
                    }
                    else if (response.Role != "Admin") {
                        history.push("");
                        SetUser(response);
                    }
                });
        }
        else {
            history.push("/login")
        }
    },[]);
    return (<div/>);
}