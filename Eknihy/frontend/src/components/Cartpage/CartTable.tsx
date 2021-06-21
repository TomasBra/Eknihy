import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../App";
import { CartPageProduct } from "./CartPageProduct";


export function CartTable() {
    const { ItemsInCart, SetItemsInCart } = useContext(GlobalContext);

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
        <div className="table-responsive">
        <table className="table text-center">
            <thead>
                <th className="align-middle"></th>
                <th className="align-middle">Název</th>
                <th className="align-middle">Počet kusů</th>
                <th className="align-middle">Cena</th>
                <th className="align-middle"></th>
            </thead>
            <tbody>
                {ItemsInCart.map((Item: any) => {
                    return (
                        <CartPageProduct name={Item.name} price={Item.price} productlink={Item.productlink} image={Item.image} pieces={Item.pieces} SetItemsInCart={SetItemsInCart} ItemsInCart={ItemsInCart} SetTotalPrice={SetTotalPrice}></CartPageProduct>
                    );
                })}
                <tr>
                    <td className="align-middle"></td>
                    <td className="align-middle"></td>
                    <td className="align-middle"></td>
                    <td className="align-middle">Cena celkem: {TotalPrice} Kč</td>
                    <td />
                </tr>
            </tbody>
            </table>
        </div>
    );
}