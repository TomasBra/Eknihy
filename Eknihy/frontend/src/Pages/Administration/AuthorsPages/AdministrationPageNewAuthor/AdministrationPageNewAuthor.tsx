import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";


export function AdministrationPageNewAuthor() {
    const [Author, SetAuthor] = useState("");
    const [Wrong, SetWrong] = useState(false);
    const history = useHistory();

    function PostNewAuthor() {
        if (Validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ AuthorName: Author })
            };
            fetch('/api/authors/new', requestOptions)
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
                <p className="display-4">Nový autor</p>
                <input type="text" className="form-control" onChange={(e) => SetAuthor(e.target.value)} placeholder="Autor" />
                <p className="text-danger">{Wrong ? "Nevyplněné údaje" : null}</p>
                <button className="btn btn-outline-primary mt-2" onClick={() => PostNewAuthor()}>Přidat Autora</button>
            </div>
        </div>
    );
}