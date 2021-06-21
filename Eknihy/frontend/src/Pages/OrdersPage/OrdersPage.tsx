import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../App";
import { Navigation } from "../../components/Administrationpage/Shared/Navigation";
import { CheckLogin } from "../../components/Shared/CheckLogin";


export function OrdersPage() {

    const [Orders, SetOrders]: any = useState([]);
    const { User, SetUser } = useContext(GlobalContext);
    let { search, content }: any = useParams();

    useEffect(() => {
        LoadOrders();
    },[])

    function LoadOrders() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ SearchValue: search })
        };
        fetch('/api/orders/'+User.UserId+'/count/' + content, requestOptions)
            .then(response => response.json())
            .then((data) => {
                SetOrders(data);
            });
    }

    return (
        <div className="container">
            <div className="text-center">
                <p className="display-4">Objednávky</p>
                <div className="table-responsive">
                    <table className="table fixed-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Datum</th>
                                <th scope="col">Knihy</th>
                                <th scope="col">Cena</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Orders.map((Order: any) => {
                                return (
                                    <tr>
                                        <th scope="row">{Order.OrderId}</th>
                                        <td>{Order.Date}</td>
                                        <td>{Order.Books.map((book: any) => {
                                            return (<Link to={"/product/" + book.Id}>{book.Name}</Link>);
                                        })}</td>
                                        <td>{Order.Price}</td>
                                        <td>{Order.Status}</td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <Link to={search == null ? '/administration/get/orders/' + (parseInt(content) + 10) + '/' : '/administration/get/orders/' + (parseInt(content) + 10) + '/' + search}>
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-outline-primary">Načíst další</button>
                    </div>
                </Link>
            </div>
            <CheckLogin />
        </div>
    );
}