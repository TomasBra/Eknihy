import React from "react";
import { Link } from "react-router-dom";
import { CheckAdminLogin } from "../../Shared/CheckAdminLogin";


export function Navigation() {
    return (
        <div className="mt-2 text-md-left text-center d-inline-block">
            <Link to="/administration/get/products/All/10" className="ml-1 ml-md-2 mr-md-2">
                <button className="btn btn-outline-primary mt-2 ">Knihy</button>
            </Link>
            <Link to="/administration/categories/" className="ml-1 ml-md-2 mr-md-2">
                <button className="btn btn-outline-primary  mt-2 ">Kategorie</button>
            </Link>
            <Link to="/administration/publishinghouses/" className="ml-1 ml-md-2 mr-md-2">
                <button className="btn btn-outline-primary mt-2 ">Nakladatelství</button>
            </Link>
            <Link to="/administration/authors/" className="ml-1 ml-md-2 mr-md-2">
                <button className="btn btn-outline-primary  mt-2 ">Autoři</button>
            </Link>
            <Link to="/administration/get/users/10" className="ml-1 ml-md-2 mr-md-2">
                <button className="btn btn-outline-primary mt-2 ">Uživatelé</button>
            </Link>
            <Link to="/administration/get/orders/10" className="ml-1 ml-md-2 mr-md-2">
                <button className="btn btn-outline-primary mt-2">Objednávky</button>
            </Link>
            <CheckAdminLogin />
        </div>
    );
}