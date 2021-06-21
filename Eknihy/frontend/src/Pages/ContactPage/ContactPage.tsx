import React, { useState } from "react";
import { useHistory } from "react-router";


export function ContactPage() {
    const [Message, SetMessage]: any = useState({});
    const [ControlMesage, SetControlMesage]: any = useState();
    let history = useHistory();

    function Send() {
        if (Validate()) {
            fetch("/api/contact/email", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Message)
            }).then(response => response.json())
                .then((data) => {
                    alert(data);
                    history.push("");
                });
        }
    }

    function Validate(): boolean {
        if (Message.Email != null && Message.Telephone != null && Message.Message != null) {
            SetControlMesage(null);
            return true;
        }
        else {
            SetControlMesage("Vyplňte všechny údaje.");
            return false;
        }
    }

    return (
        <div className="container text-center">
            <p className="display-4 mt-4">Zanechte nám zprávu</p>
            <input type="email" className="form-control mt-3" placeholder="email" onChange={(e) => { SetMessage({ ...Message, Email: e.target.value }) }} required />
            <input type="tel" className="form-control mt-3" placeholder="telefoní číslo ve formátu: XXX XXX XXX" onChange={(e) => { SetMessage({ ...Message, Telephone: e.target.value }) }} required />
            <textarea className="form-control mt-3" placeholder="zpráva" onChange={(e) => { SetMessage({ ...Message, Message: e.target.value }) }} required />
            <button className="btn btn-outline-primary mt-3" onClick={Send}>Odeslat</button>
            <p className="text-danger">{ControlMesage}</p>
        </div>
    );
}