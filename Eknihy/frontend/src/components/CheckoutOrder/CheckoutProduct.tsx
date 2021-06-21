import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../App";


export function CheckoutProduct(props: any) {


    const [Pieces, SetPieces] = useState(props.ItemsInCart.find((Item: any) => Item.name == props.name).pieces);

    return (
        <tr>
            <td className="align-middle"><img src={props.image} className="product-cart-preview-img" /></td>
            <td className="align-middle"><h6 className="">{props.name}</h6></td>
            <td className="align-middle">
                <input type="number" className="ml-md-3 form-control d-inline-block text-center col-8 col-md-2 w-100" value={Pieces} min="1" disabled={true} />
                <h6 className="ml-md-2 d-inline-block text-center col-md-1">ks</h6>
            </td>
            <td className="align-middle"><h6 className="ml-md-3 d-inline-block text-center ">{parseInt(props.price) * Pieces} Kč</h6></td>
        </tr>
    );
}