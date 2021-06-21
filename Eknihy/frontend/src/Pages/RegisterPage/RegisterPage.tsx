import React, { useState } from "react";
import { Link } from "react-router-dom";


export function RegisterPage() {

    const [User, SetUser]: any = useState({});
    const [Message, SetMessage]: any = useState();

    function Register() {
        console.log(User);
        if (Validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(User)
            };
            fetch('/api/users/register', requestOptions)
                .then(response => response.json())
                .then((response) => {
                    console.log(response);
                    SetMessage(response);
                });
        }
    }

    function Validate(): boolean {
        if (User.Password != User.ConfirmPassword) {
            SetMessage("Hesla se neshodují");
        }
        if (User.FirstName != null && User.LastName != null && User.Email != null  && User.Password != null && User.ConfirmPassword != null && User.Password == User.ConfirmPassword) {
            return true;
        }
        else if (User.FirstName != null && User.LastName != null && User.Email != null && User.Password != null && User.ConfirmPassword != null && User.Password != User.ConfirmPassword) {
            SetMessage("Hesla se neshodují");
        }
        else {
            SetMessage("Vyplňte všechny údaje");
        }
        return false;
    }


    return (
        <div className="container-md text-center mt-5">
            <p className="display-4">Registrace</p>
            <input type="text" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="Jméno" value={User.FirstName} onChange={(e: any) => { SetUser({ ...User, FirstName: e.target.value }) }} />
            <input type="text" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="Přijímení" value={User.LastName} onChange={(e: any) => { SetUser({ ...User, LastName: e.target.value }) }} />
            <input type="password" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="heslo" value={User.Password} onChange={(e: any) => { SetUser({ ...User, Password: e.target.value }) }} />
            <input type="password" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="opakujte heslo" value={User.ConfirmPassword} onChange={(e: any) => { SetUser({ ...User, ConfirmPassword: e.target.value }) }} />
            <input type="email" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="emailová adresa" value={User.Email} onChange={(e: any) => { SetUser({ ...User, Email: e.target.value }) }} />
            <div className="mt-3 ml-2 mr-2 col-md-5 col-10 d-inline-block" />
            <Link to={'/users/reset'}>
                <p className="mt-2">Zapomněli jste heslo?</p>
            </Link>
            <button className="d-flex justify-content-center mr-auto ml-auto mt-3 btn btn-outline-primary" onClick={Register}>
                Registrovat
            </button>
            <h3 className="text-danger">{Message}</h3>
        </div>
        );
}