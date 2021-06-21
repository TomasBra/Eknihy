import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export function RegistrationConfirmPage() {
    const [Message, SetMessage]: any = useState();
    let { id }: any = useParams();

    useEffect(() => {
        if (id != null) {
            ConfirmAccount();
        }
        else {
            SetMessage("Uživatel není v databázi");
        }
    }, []);

    function ConfirmAccount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('/api/users/confirm/' + id, requestOptions)
            .then(response => response.json())
            .then((response) => {
                SetMessage(response);
            });
    }


    return (
        <div className="container text-center">
            <p className="display-4 text-success pt-5 pb-5 mt-5 mb-5">{Message}</p>
        </div>
        );
}