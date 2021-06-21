import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";


export function AdministrationPagePublishingHouses() {
    const [PublishingHouses, SetPublishingHouses]: any = useState([]);

    useEffect(() => {
        LoadPublishingHouses();
    }, []);

    async function LoadPublishingHouses() {
        await fetch('/api/publishinghouses')
            .then(response => response.json())
            .then(data => { console.log(data); SetPublishingHouses(data); });
    }

    function DeletePublishingHouse(ObjectToDelete: any) {
        if (confirm("Opravdu chcete nakladatelství odstranit z databáze?") == true) {
            const requestOptions = {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ObjectToDelete)
            };
            fetch('/api/publishinghouses/delete', requestOptions)
                .then(response => response.json())
                .then(data => {SetPublishingHouses(data); });
        }
    }

    return (
        <div className="container">
            <div className="mb-4">
                <Navigation />
                <Link to="/administration/publishinghouses/new" className="ml-2 mt-2 mr-2 mb-4 float-md-right">
                    <button className="btn btn-outline-success mt-2 ">Přidat nakladatelství</button>
                </Link>
            </div>
            <div className="text-center">
                <p className="display-4">Nakladatelství</p>
                <div className="table-responsive fixed-table ">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Název</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {PublishingHouses.map((PublishingHouse:any) => {
                                return (
                                    <tr>
                                        <th scope="row">{PublishingHouse.PublishingHouseId}</th>
                                        <td>{PublishingHouse.Name}</td>
                                        <td><Link to={'/administration/publishinghouses/edit/' + PublishingHouse.PublishingHouseId}><button className="btn btn-outline-primary">Upravit</button></Link></td>
                                        <td><button className="btn btn-outline-danger" onClick={() => DeletePublishingHouse({ PublishingHouseId: PublishingHouse.PublishingHouseId, Name: PublishingHouse.Name})}>Odstranit</button></td>
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