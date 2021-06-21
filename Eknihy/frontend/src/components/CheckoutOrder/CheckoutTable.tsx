import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../App";
import { CheckoutProduct } from "./CheckoutProduct";


export function CheckoutTable(props:any) {

    return (
        <div className="table-responsive">
        <table className="table text-center w-100">
            <thead>
                <th className="align-middle"></th>
                <th className="align-middle">Název</th>
                <th className="align-middle">Počet kusů</th>
                <th className="align-middle">Cena</th>
            </thead>
            <tbody>
                {props.ItemsInCart.map((Item: any) => {
                    return (
                        <CheckoutProduct name={Item.name} price={Item.price} productlink={Item.productlink} image={Item.image} pieces={Item.pieces} SetItemsInCart={props.SetItemsInCart} ItemsInCart={props.ItemsInCart} SetTotalPrice={props.SetTotalPrice}></CheckoutProduct>
                    );
                })}
                <tr>
                    <td className="align-middle"></td>
                    <td className="align-middle"></td>
                    <td className="align-middle"></td>
                    <td className="align-middle">Cena celkem: {props.TotalPrice} Kč</td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}