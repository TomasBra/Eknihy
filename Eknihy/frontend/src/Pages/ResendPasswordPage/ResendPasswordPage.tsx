import React, { useState } from 'react';

export function ResendPasswordPage() {

    const [Email, SetEmail]: any = useState();
    const [Message, SetMessage]: any = useState();


    function Send() {
        if (Validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: Email })
            };
            fetch('/api/users/resetpassword', requestOptions)
                .then(response => response.json())
                .then((data) => {
                    SetMessage(data);
                });
        }
    }

    function Validate(): boolean {
        if (Email !== null) {
            SetMessage("Nové heslo bylo odesláno na email.");
            return true;
        }
        else {
            SetMessage("Vyplňte potřebné údaje.");
            return (false);
        }
    }

    return (
        <div className="container text-center">
            <p className="display-4 mt-5">Resetování hesla</p>
            <input type="email" className="form-control mt-3" placeholder="email" onChange={(e: any) => { SetEmail(e.target.value); }} />
            <button className="btn btn-outline-primary mt-3" onClick={Send}>Resetovat heslo</button>
            <p className="text-danger">{Message}</p>
        </div>
    );
}