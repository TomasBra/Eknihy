import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";


export function AdministrationPageUsers() {

    const [Users, SetUsers] = useState([]);
    let { search, content }: any = useParams();


    useEffect(() => {
        LoadUsers();
    }, [])


    function LoadUsers() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({SearchValue: search, Sorting: Option })
        };
        fetch('/api/users/count/' + content, requestOptions)
            .then(response => response.json())
            .then((data) => {
                SetUsers(data);
            });
    }

    function DeleteUser(props: any) {
        if (window.confirm("Opravdu chcete uživatele odstranit z databáze?") == true) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ UserId: props.UserId, Email: props.Email })
            };
            fetch('/api/users/delete/' + content, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    LoadUsers();
                });
        }
    }



    return (
        <div className="container">
            <div className="mb-4">
                <Navigation />
                <Link to="/administration/users/new" className="ml-2 mt-2 mr-2 mb-4 float-md-right">
                    <button className="btn btn-outline-success mt-2 ">Přidat uživatele</button>
                </Link>
            </div>
            <div className="text-center">
                <p className="display-4">Uživatelé</p>
                <div className="table-responsive fixed-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Jméno</th>
                                <th scope="col">Přijmení</th>
                                <th scope="col">Role</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Users.map((User: any) => {
                                return (
                                    <tr>
                                        <th scope="row">{User.UserId}</th>
                                        <td>{User.Email}</td>
                                        <td>{User.FirstName}</td>
                                        <td>{User.LastName}</td>
                                        <td>{User.Role}</td>
                                        <td><Link to={"/administration/users/edit/" + User.UserId}><button className="btn btn-outline-primary">Upravit</button></Link></td>
                                        <td><button className="btn btn-outline-danger" onClick={() => DeleteUser({ UserId: User.UserId, Email: User.Email })}>Odstranit</button></td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <Link to={search == null ? '/administration/get/users/'  + (parseInt(content) + 10) + '/' : '/administration/get/users/' + (parseInt(content) + 10) + '/' + search}>
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-outline-primary">Načíst další</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}