import React, { useContext } from "react";
import ReactDOM from "react-dom"
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { CartPageProduct } from "../../components/Cartpage/CartPageProduct";
import { CartTable } from "../../components/Cartpage/CartTable";


export function Cartpage() {
    const { ItemsInCart, SetItemsInCart } = useContext(GlobalContext);
    const { User, SetUser } = useContext(GlobalContext);

    return (
        <div className="container-md mt-5 mb-5 pb-1">
            {User != null ?
                <div className="text-center w-100">
                    <button className="btn btn-outline-primary ml-2 mr-2 active mb-2">1. Nákupní košík</button>
                    <button className="btn btn-outline-primary ml-2 mr-2 mb-2">2. Rekapitulace objednávky</button>
                </div>
                :
                <div className="text-center w-100">
                    <button className="btn btn-outline-primary ml-2 mr-2 active mb-2">1. Nákupní košík</button>
                    <button className="btn btn-outline-primary ml-2 mr-2 mb-2">2. Přihlášení uživatele</button>
                    <button className="btn btn-outline-primary ml-2 mr-2 mb-2">3. Rekapitulace objednávky</button>
                </div>
            }
            <CartTable />
            <div className="w-100 mb-5">
                <Link to="/">
                    <button className="btn btn-primary btn-large float-left">ZPĚT</button>
                </Link>
                <Link to={User != null ? "/cart/checkout" : "/login/order"}>
                    <button className="btn btn-primary btn-large float-right">POKRAČOVAT</button>
                </Link>
            </div>
        </div>
    );
}