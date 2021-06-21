import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";

export function AdministrationPageEditPublishingHouse(props: any) {
    const [PublishingHouse, SetPublishingHouse] = useState('');
    const [Wrong, SetWrong] = useState(false);
    const history = useHistory();
    let { id }: any = useParams();

    useEffect(() => {
        GetPublshingHouse();
    },[])

    //získá informace o nakladatelství pomocí id z databáze
    async function GetPublshingHouse() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
        await fetch('/api/publishinghouses/' + id, requestOptions)
            .then(response => response.json())
            .then(response => SetPublishingHouse(response[0].Name));

    }

    //Odešle úpravy na server
    function PostEditPusblishingHouse() {
        if (Validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Name: PublishingHouse, PublishingHouseId: parseInt(id) })
            };
            fetch('/api/publishinghouses/edit', requestOptions)
                .then(response => response.text())
                .then((response) => {
                    history.push("/administration/message/" + response);
                });

        }
    }

    function Validate(): boolean {
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
                <p className="display-4">Editace nakladatelství</p>
                <input type="text" className="form-control mt-5" value={PublishingHouse} onChange={(e: any) => { SetPublishingHouse(e.target.value); }} placeholder="Název nakladatelství" />
                <p className="text-danger">{Wrong ? "Nevyplněné údaje" : null}</p>
                <button className="btn btn-outline-primary mt-3" onClick={() => PostEditPusblishingHouse()}>Uložit změny</button>
            </div>
        </div>
    );
}