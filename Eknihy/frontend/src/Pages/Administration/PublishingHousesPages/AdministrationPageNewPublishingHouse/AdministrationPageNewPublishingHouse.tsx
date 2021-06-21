import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";

export function AdministrationPageNewPublishingHouse() {
    const [PublishingHouse, SetPublishingHouse] = useState("");
    const [Wrong, SetWrong] = useState(false);
    const history = useHistory();

    function PostNewPusblishingHouse() {
        if (Validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Name: PublishingHouse })
            };
            fetch('/api/publishinghouses/new', requestOptions)
                .then(response => response.text())
                .then((response) => {
                    history.push("/administration/message/" + response);
                });

        }
    }

    function Validate(): boolean{
        if (PublishingHouse.replace(/ /g, '').length !== 0) {
            return true;
        }
        else {
            SetWrong(true);
            return false;
        }
    }

    return (
        <div className="container">
            <Navigation />
            <div className="text-center">
                <p className="display-4">Nové nakladatelství</p>
                <input type="text" className="form-control mt-5" value={PublishingHouse} onChange={(e: any) => { SetPublishingHouse(e.target.value); }} placeholder="Název nakladatelství" />
                <p className="text-danger">{Wrong ? "Nevyplněné údaje" : null}</p>
                <button className="btn btn-outline-primary mt-3" onClick={() => PostNewPusblishingHouse()}>Přidat vydavatelství</button>
            </div>
        </div>
    );
}