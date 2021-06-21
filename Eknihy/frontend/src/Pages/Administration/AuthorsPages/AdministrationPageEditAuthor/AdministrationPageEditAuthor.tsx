import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";

export function AdministrationPageEditAuthor(props: any) {
    const [Author, SetAuthor] = useState('');
    const [Wrong, SetWrong] = useState(false);
    const history = useHistory();
    let { id }: any = useParams();

    useEffect(() => {
        GetAuthor();
    }, [])

    //získá informace o nakladatelství pomocí id z databáze
    async function GetAuthor() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch('/api/authors/' + id, requestOptions)
            .then(response => response.json())
            .then(response => SetAuthor(response[0].AuthorName));

    }

    //Odešle úpravy na server
    function PostEditAuthor() {
        if (Validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ AuthorName: Author, AuthorId: parseInt(id) })
            };
            fetch('/api/authors/edit', requestOptions)
                .then(response => response.text())
                .then((response) => {
                    history.push("/administration/message/" + response);
                });

        }
    }

    function Validate(): boolean {
        if (Author.replace(/ /g, '').length !== 0) {
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
                <p className="display-4">Editace Autora</p>
                <input type="text" className="form-control mt-5" value={Author} onChange={(e: any) => { SetAuthor(e.target.value); }} placeholder="Jméno Autora" />
                <p className="text-danger">{Wrong ? "Nevyplněné údaje" : null}</p>
                <button className="btn btn-outline-primary mt-3" onClick={() => PostEditAuthor()}>Uložit změny</button>
            </div>
        </div>
    );
}