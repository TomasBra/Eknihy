import React, { useState, useContext, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../../App";
import { CheckoutTable } from "../../components/CheckoutOrder/CheckoutTable";
import { CheckLogin } from "../../components/Shared/CheckLogin";


export function CheckoutPage() {


    const { ItemsInCart, SetItemsInCart } = useContext(GlobalContext);
    const { User, SetUser } = useContext(GlobalContext);
    let history = useHistory();
    const [TotalPrice, SetTotalPrice] = useState(() => {
        let Sum: any = 0;
        ItemsInCart.forEach((item: any) => {
            Sum += item.price * item.pieces;
        });
        return Sum;
    });

    useEffect(() => {
        SetTotalPrice(() => {
            let Sum: any = 0;
            ItemsInCart.forEach((item: any) => {
                Sum += item.price * item.pieces;
            });
            return Sum;
        });
    }, [ItemsInCart]);

    return (
        <div>
            <div className="container-md mt-5 mb-5 pb-1">
                    {User != null ?
                        <div className="text-center w-100">
                            <Link to="/cart"><button className="btn btn-outline-primary ml-2 mr-2 mb-2">1. Nákupní košík</button></Link>
                            <button className="btn btn-outline-primary ml-2 mr-2 mb-2 active">2. Rekapitulace objednávky</button>
                        </div>
                        :
                        <div className="text-center w-100">
                            <Link to="/cart"><button className="btn btn-outline-primary ml-2 mr-2 mb-2">1. Nákupní košík</button></Link>
                            <button className="btn btn-outline-primary ml-2 mr-2 mb-2">2. Přihlášení uživatele</button>
                            <button className="btn btn-outline-primary ml-2 mr-2 mb-2 active">3. Rekapitulace objednávky</button>
                        </div>
                    }
                <CheckoutTable ItemsInCart={ItemsInCart} TotalPrice={TotalPrice} SetTotalPrice={SetTotalPrice} SetItemsInCart={SetItemsInCart} />
                <div className="mt-md-5">
                    <div className="col-md-6 d-inline-block align-top text-center">
                        <label className="">Knihy budou připsány na účet uživatele:</label>
                        <input className="form-control text-center" type="email" value={User.Email} disabled={true} />
                        <label className="">Celková částka:</label>
                        <input className="form-control text-center" type="text" value={TotalPrice + " Kč"} disabled={true} />
                    </div>
                    <div className="col-md-6 d-inline-block align-top text-center">
                        <label>Platba:</label>
                        <PayPalButton
                            amount={TotalPrice}
                            onSuccess={(details: any, data: any) => {
                            // OPTIONAL: Call your server to save the transaction
                                return fetch("/api/checkout", {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        Products: ItemsInCart,
                                        User: User
                                    })
                                }).then(() => { SetItemsInCart([]); alert("Knihy byly úspěšně připsány na Váš účet"); history.push("/books/All/10") });
                        }}
                            options={{
                                clientId: "AWb98TgOymjs0Ojn5smXkmRVEDLhmzXPYz7vT5bYr4oTQ6KKzvSx6nMmdQR1kocZYJzEc3TTaCZO-F7c",
                            currency: "CZK"
                        }}
                        />
                    </div>
                </div>
                <div className="w-100 mb-5">
                    <Link to="/cart">
                        <button className="btn btn-primary btn-large float-left">ZPĚT</button>
                    </Link>
                </div>
            </div>
            <CheckLogin/>
        </div>
    );
}