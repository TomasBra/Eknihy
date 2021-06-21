import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../App";
import { CheckLogin } from "../../components/Shared/CheckLogin";


export function SettingsPage() {
    const { User, SetUser } = useContext(GlobalContext);
    const [LocalUser, SetLocalUser]: any = useState(User);
    const [Message, SetMessage]: any = useState();

    useEffect(() => {
        SetLocalUser({ ...LocalUser, Password: null });
    }, []);

    function SendSettings() {
        if (Validate()) {
            SetMessage();
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(LocalUser)
            };
            fetch('/api/users/edit/' + LocalUser.UserId, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    SetUser(data.user);
                    SetMessage(data.text);
                });
        }
    }

    function Validate(): boolean {
        console.log(LocalUser);
        if (LocalUser.FirstName != null && LocalUser.LastName != null && LocalUser.Password != null && LocalUser.Password == LocalUser.ConfirmPassword) {

            return true;
        }
        else if (LocalUser.FirstName != null && LocalUser.LastName != null && LocalUser.Password == null && LocalUser.ConfirmPassword == null) {
            return true;
        }
        else if (LocalUser.FirstName != null && LocalUser.LastName != null && LocalUser.Password != null && LocalUser.Password != LocalUser.ConfirmPassword) {
            SetMessage("Hesla se neshodují");
            return false;
        }
        else {
            SetMessage("Vyplňte všechny údaje");
            false;
        }
        return false;
    }

    return (
        <div className="container-md text-center mt-5">
            <p className="display-4">Nastavení účtu</p>
            <input type="text" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" onChange={(e) => { SetLocalUser({ ...LocalUser, FirstName: e.target.value }) }} value={LocalUser.FirstName} placeholder="Jméno" />
            <input type="text" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" onChange={(e) => { SetLocalUser({ ...LocalUser, LastName: e.target.value }) }} value={LocalUser.LastName} placeholder="Přijímení" />
            <input type="password" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" onChange={(e) => { SetLocalUser({ ...LocalUser, Password: e.target.value }) }} placeholder="heslo" />
            <input type="password" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" onChange={(e) => { SetLocalUser({ ...LocalUser, ConfirmPassword: e.target.value }) }} placeholder="opakujte heslo" />
            <input type="email" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" value={User.Email} placeholder="emailová adresa" readOnly={true} />
            <div className="mt-3 ml-2 mr-2 col-md-5 col-10 d-inline-block" />
            <button className="d-flex justify-content-center mr-auto ml-auto mt-3 btn btn-outline-primary" onClick={SendSettings}>
                Změnit
            </button>
            <p className="text-danger">{Message}</p>
            <CheckLogin />
        </div>
    );
}