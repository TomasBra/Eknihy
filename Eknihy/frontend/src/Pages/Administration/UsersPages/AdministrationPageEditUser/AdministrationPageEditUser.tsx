import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Navigation } from '../../../../components/Administrationpage/Shared/Navigation';


export function AdministrationPageEditUser() {

    const [User, SetUser]: any = useState();
    const [Message, SetMessage]: any = useState();
    let { id }: any = useParams();


    useEffect(() => {
        LoadUser();
    }, []);


    function LoadUser() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/users/' + id, requestOptions)
            .then(response => response.json())
            .then((data) => {
                SetUser(data);
            });
    }

    function Edit() {
        if (Validate()) {
            SetMessage();
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(User)
            };
            fetch('/api/users/edit/' + User.UserId, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    if (data.text == null) {
                        SetMessage(data);
                    }
                    else {
                        SetUser(data.user);
                        SetMessage(data.text);
                    }
                });
        }
    }

    function Validate(): boolean {
        if (User.FirstName != null && User.LastName != null && User.Password != null && User.Role != null && User.Password == User.ConfirmPassword) {

            return true;
        }
        else if (User.FirstName != null && User.LastName != null && User.Role != null && User.Password == null && User.ConfirmPassword == null) {
            return true;
        }
        else if (User.FirstName != null && User.LastName != null && User.Role != null && User.Password != null && User.Password != User.ConfirmPassword) {
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
        <div className="container-md">
            <Navigation />
            { User != null ?
                <div>
                    <div className="text-center mt-5">
                        <p className="display-4">Editace uživatele</p>
                        <input type="text" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="Jméno" value={User.FirstName} onChange={(e: any) => { SetUser({ ...User, FirstName: e.target.value }) }} />
                        <input type="text" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="Přijímení" value={User.LastName} onChange={(e: any) => { SetUser({ ...User, LastName: e.target.value }) }} />
                        <input type="password" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="heslo"  onChange={(e: any) => { SetUser({ ...User, Password: e.target.value }) }} />
                        <input type="password" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="opakujte heslo" value={User.ConfirmPassword} onChange={(e: any) => { SetUser({ ...User, ConfirmPassword: e.target.value }) }} />
                        <input type="email" className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" placeholder="emailová adresa" value={User.Email} onChange={(e: any) => { SetUser({ ...User, Email: e.target.value }) }} />
                        <select className="mt-3 ml-2 mr-2 col-md-5 col-10 form-control d-inline-block" aria-label="Role uživatele" onChange={(e) => { SetUser({ ...User, Role: e.target.value }) }}>
                            <option selected={User.Role == "User" ? true : false} value="User">User</option>
                            <option selected={User.Role == "Admin" ? true : false} value="Admin">Admin</option>
                        </select>
                        <button className="d-flex justify-content-center mr-auto ml-auto mt-3 btn btn-outline-primary" onClick={Edit}>
                            Vytvořit uživatele
                </button>
                        <h3 className="text-danger">{Message}</h3>
                    </div>
                </div>
                : <p>Načítání dat ze serveru</p>
            }
        </div>
    );
}