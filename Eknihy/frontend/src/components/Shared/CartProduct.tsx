import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";

export interface CartProductProps{
    name: string;
    price: string;
    productlink: string;
    image: string;
    pieces: number;
}

export function CartProduct(props: CartProductProps) {

    const { ItemsInCart, SetItemsInCart } = useContext(GlobalContext);
    const [Pieces, SetPieces] = useState(ItemsInCart.find((Item: any) => Item.name == props.name).pieces);

    function DeleteItemFromCart() {
        var filtered = ItemsInCart.filter((Item:any) => { return Item.name != props.name; });
        SetItemsInCart(filtered);
    }


    function ChangePieces(e: any) {
        if (parseFloat(e.target.value) == e.target.value) {
            SetPieces(parseInt(e.target.value));
            var Array = ItemsInCart;
            Array.find((Item: any) => Item.name == props.name).pieces = e.target.value;
            SetItemsInCart(Array);
        }
    }

    return (
        <div className="row pl-2 mb-2 cart-product">
            <Link to={props.productlink} className="text-dark">
                <img src={props.image} className="cart-image mt-2 mb-2 ml-2 mr-2" />
            </Link>
            <div className="ml-2 mt-2 mb-2">
                <div>
                    <Link to={props.productlink} className="text-dark d-inline-block cart-product-text">
                        <h6 className="font-weight-normal">{props.name}</h6>
                    </Link>
                    <button className="btn cross p-0 m-0" onClick={() => DeleteItemFromCart()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x icon-19" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </div>
                <div>
                    <input type="number" className="form-control col-3 d-inline-block" value={Pieces} min="1" disabled={true} onChange={(e: any) => { ChangePieces(e); }} />
                    <h6 className="ml-2 d-inline-block">ks</h6>
                    <h6>{parseInt(props.price) * Pieces} Kč</h6>
                </div>
            </div>
       </div>
        );
}