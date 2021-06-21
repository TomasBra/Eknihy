import React, { useContext, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { GlobalContext } from "../../App";

export function LoginPage(props: any) {
    const { User, SetUser } = useContext(GlobalContext);
    let { action }: any = useParams();
    const [UserToLog, SetUserToLog]: any = useState({});
    const [Message, SetMessage]: any = useState();
    let history = useHistory();

    function Login() {
        if (Validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(UserToLog)
            };
            fetch('/api/users/login', requestOptions)
                .then(response => response.json())
                .then((response) => {
                    console.log(response);
                    if (response.Email != null) {
                        SetUser(response);
                        if (action == "order") {
                            history.push("/cart/checkout");
                        }
                        else {
                            history.push("");
                        }
                    }
                    else {
                        SetMessage(response);
                    }
                });
        }
    }

    function Validate(): boolean {
        if (UserToLog.Email != null && UserToLog.Password != null) {
            return true;
        }
        else {
            SetMessage("Vyplňte všechny údaje");
            return false;
        }
    }


    return (
        <div className="text-center container-md">
            <p className="display-4 mt-5">Přihlášení</p>
            <input type="email" className="ml-auto mr-auto mt-3 col-md-10 row w-100 col-10 form-control" placeholder="Email" onChange={(e) => { SetUserToLog({ ...UserToLog, Email: e.target.value }) }} />
            <input type="password" className="ml-auto mr-auto mt-3 col-md-10 row w-100 col-10 form-control" placeholder="heslo" onChange={(e) => { SetUserToLog({ ...UserToLog, Password: e.target.value }) }} />
            <div>
                <Link to={'/users/reset'}>
                    <p className="mt-2">Zapomněli jste heslo?</p>
                </Link>
                <Link to={props.match.params.action != null ? '/register/'+props.match.params.action : "/register/"}>
                    <p className="mt-2">Nemáte ještě účet?</p>
                </Link>
                <button className="btn btn-outline-primary mt-1" onClick={Login}>
                    Přihlásit se
                </button>
                <p className="text-danger">{Message}</p>
            </div>
        </div>
        );
}