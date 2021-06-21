import React, { useContext, useState } from "react";
import { useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../../../../App";
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";



export function AdministrationPageAuthors() {
    const [Authors, SetAuthors]: any = useState([]);

    useEffect(() => {
        LoadAuthors();
    }, []);

    function LoadAuthors() {
        fetch('/api/authors')
            .then(response => response.json())
            .then(data => { console.log(data); SetAuthors(data); });
    }

    function DeleteAuthor(ObjectToDelete: any) {
        if (confirm("Opravdu chcete autora odstranit z databáze?") == true) {
            const requestOptions = {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ObjectToDelete)
            };
            fetch('/api/authors/delete', requestOptions)
                .then(response => response.json())
                .then(data => { console.log(data); SetAuthors(data); });
        }
    }

    return (
        <div className="container">
            <div className="mb-4">
                <Navigation />
                <Link to="/administration/authors/new" className="ml-2 mt-2 mr-2 mb-4 float-md-right">
                    <button className="btn btn-outline-success mt-2 ">Přidat autora</button>
                </Link>
            </div>
            <div className="text-center">
                <p className="display-4">Autoři</p>
                <div className="table-responsive">
                    <table className="table fixed-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Název</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Authors.map((Author: any) => {
                                return (
                                    <tr>
                                        <th scope="row">{Author.AuthorId}</th>
                                        <td>{Author.AuthorName}</td>
                                        <td><Link to={'/administration/authors/edit/' + Author.AuthorId}><button className="btn btn-outline-primary">Upravit</button></Link></td>
                                        <td><button className="btn btn-outline-danger" onClick={() => DeleteAuthor({ AuthorId: Author.AuthorId, AuthorName: Author.AuthorName })}>Odstranit</button></td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}