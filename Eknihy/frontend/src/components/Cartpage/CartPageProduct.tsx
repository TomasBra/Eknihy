import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../App";


export function CartPageProduct(props:any) {


    const [Pieces, SetPieces] = useState(props.ItemsInCart.find((Item: any) => Item.name == props.name).pieces);



    function DeleteItemFromCart() {
        var filtered = props.ItemsInCart.filter((Item: any) => { return Item.name != props.name; });
        props.SetItemsInCart(filtered);
    }



    function ChangePieces(e: any) {
        if (parseFloat(e.target.value) == e.target.value) {
            SetPieces(parseInt(e.target.value));
            var Array = props.ItemsInCart;
            Array.find((Item: any) => Item.name == props.name).pieces = e.target.value;
            props.SetItemsInCart(Array);
        }
    }


    return (
        <tr>
            <td className="align-middle"><img src={props.image} className="product-cart-preview-img" /></td>
            <td className="align-middle"><h6 className="">{props.name}</h6></td>
            <td className="align-middle">
                <input type="number" className="ml-md-3 form-control d-inline-block text-center col-8 col-md-2 w-100" value={Pieces} min="1" disabled={true} onChange={(e: any) => { ChangePieces(e); }} />
                <h6 className="ml-md-2 d-inline-block text-center col-md-1">ks</h6>
            </td>
            <td className="align-middle"><h6 className="ml-md-3 d-inline-block text-center ">{parseInt(props.price) * Pieces} Kč</h6></td>
            <td className="align-middle">
                <button className="btn p-0 m-0 " onClick={() => DeleteItemFromCart()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x icon-19" viewBox="0 0 16 16">
                         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}