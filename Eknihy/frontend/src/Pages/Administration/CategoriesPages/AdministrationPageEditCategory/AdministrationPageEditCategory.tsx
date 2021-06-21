import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";

export function AdministrationPageEditCategory(props: any) {
    const [Category, SetCategory] = useState('');
    const [Wrong, SetWrong] = useState(false);
    const history = useHistory();
    let { id }: any = useParams();

    useEffect(() => {
        GetCategory();
    }, [])

    //získá informace o nakladatelství pomocí id z databáze
    async function GetCategory() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch('/api/categories/' + id, requestOptions)
            .then(response => response.json())
            .then(response => SetCategory(response[0].CategoryName));

    }

    //Odešle úpravy na server
    function PostEditCategory() {
        if (Validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ CategoryName: Category, CategoryId: parseInt(id) })
            };
            fetch('/api/categories/edit', requestOptions)
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
                <p className="display-4">Editace kategorie</p>
                <input type="text" className="form-control mt-5" value={Category} onChange={(e: any) => { SetCategory(e.target.value); }} placeholder="Název kategorie" />
                <p className="text-danger">{Wrong ? "Nevyplněné údaje" : null}</p>
                <button className="btn btn-outline-primary mt-3" onClick={() => PostEditCategory()}>Uložit změny</button>
            </div>
        </div>
    );
}