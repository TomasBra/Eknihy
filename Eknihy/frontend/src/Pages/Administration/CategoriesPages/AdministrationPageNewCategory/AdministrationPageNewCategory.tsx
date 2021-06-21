import React, { useState } from "react";
import { useHistory } from "react-router";
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";


export function AdministrationPageNewCategory() {
    const [Category, SetCategory] = useState("");
    const [Wrong, SetWrong] = useState(false);
    const history = useHistory();

    function PostNewCategory() {
        if (Validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ CategoryName: Category })
            };
            fetch('/api/categories/new', requestOptions)
                .then(response => response.text())
                .then((response) => {
                    history.push("/administration/message/" + response);
                });

        }
    }

    function Validate(): boolean {
        if (Category.replace(/ /g, '').length !== 0) {
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
                <p className="display-4">Nová kategorie</p>
                <input type="text" className="form-control" value={Category} onChange={(e) => SetCategory(e.target.value)} placeholder="Název kategorie" />
                <p className="text-danger">{Wrong ? "Nevyplněné údaje" : null}</p>
                <button className="btn btn-outline-primary mt-2" onClick={()=>PostNewCategory()}>Přidat kategorii</button>
            </div>
        </div>
    );
}