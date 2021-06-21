import React, { useState } from "react";
import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";


export function AdministrationPageCategories(props: any) {
    const [Categories, SetCategories]: any = useState([]);

    useEffect(() => {
        LoadCategories();
    }, []);

    function LoadCategories() {
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => { console.log(data); SetCategories(data); });
    }

    function DeleteCategory(ObjectToDelete: any) {
        if (confirm("Opravdu chcete kategorii odstranit z databáze?") == true) {
            const requestOptions = {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ObjectToDelete)
            };
            fetch('/api/categories/delete', requestOptions)
                .then(response => response.json())
                .then(data => { console.log(data); SetCategories(data); });
        }
    }

    return (
        <div className="container">
            <div className="mb-4">
                <Navigation />
                <Link to="/administration/categories/new" className="ml-2 mt-2 mr-2 mb-4 float-md-right">
                    <button className="btn btn-outline-success mt-2 ">Přidat kategorii</button>
                </Link>
            </div>
            <div className="text-center">
                <p className="display-4">Kategorie</p>
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
                            {Categories.map((Category:any) => {
                                return (
                                    <tr>
                                        <th scope="row">{Category.CategoryId}</th>
                                        <td>{Category.CategoryName}</td>
                                        <td><Link to={"/administration/categories/edit/"+Category.CategoryId}><button className="btn btn-outline-primary">Upravit</button></Link></td>
                                        <td><button className="btn btn-outline-danger" onClick={() => DeleteCategory({ CategoryId: Category.CategoryId, CategoryName: Category.CategoryName })}>Odstranit</button></td>
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