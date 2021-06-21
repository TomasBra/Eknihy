import React, { Component, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { GlobalContext } from '../../App';

export interface ProductPreviewProps{
    id: number;
    name: string;
    author: string;
    price: string;
    image: string;
}

export function PreviewProduct(props: ProductPreviewProps) {

    const { AddedToCart, SetAddedToCart } = useContext(GlobalContext);
    const { ItemsInCart, SetItemsInCart } = useContext(GlobalContext);
    const [ MouseOver, SetMouseOver ] = useState(false);


    function ContainsObject(): boolean {
        if (ItemsInCart.some((Item: any) => Item.name == props.name)) {
            return true;
        } else {
            return false;
        }
    }

    function AddToCart() {
        if (!ContainsObject()) {
            SetAddedToCart({ message: "Přidáno do košíku", boolean: !AddedToCart.boolean });
            SetItemsInCart([...ItemsInCart, { id: props.id, name: props.name, image: props.image, pieces: 1, price: props.price }]);
        }
        else {
            SetAddedToCart({ message: "Produkt se již nachází v košíku", boolean: !AddedToCart.boolean });
        }
    }



    return (
        <div className="ml-auto mr-auto mb-2 ml-md-2 mr-md-2 ml-lg-3 mr-lg-3 mt-md-2 d-md-inline-block justify-content-center product-preview product-max-width">
            <div className="preview-parent" onMouseOver={() => {setTimeout(() => SetMouseOver(true),5); }} onMouseLeave={() => { SetMouseOver(false); }}>
                <img className="product-preview-img d-flex justify-content-center" src={props.image} alt="Card image cap" />
                <div className="preview-children">
                    <img className="product-preview-img d-flex justify-content-center invisible" src={props.image} alt="Card image cap" />
                    <div className="d-flex align-items-center justify-content-center h-100 children-icons">
                        <button className={`btn p-0 ${!MouseOver ? "d-none w-0" : null}`} onClick={() => {
                            setTimeout(
                                () => SetAddedToCart(false),
                                2301
                            ); AddToCart();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus icon-30-white" viewBox="0 0 16 16">
                                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                        </button>
                        <NavLink NavLink tag={Link} className={`p-0 ${!MouseOver ? "d-none w-0" : null}`} to={'/product/'+props.id}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-circle icon-30-white" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                            </svg>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div>
                <h5>{props.name}</h5>
                <h6>{props.author}</h6>
                <h5 className="text-primary">{props.price} Kč</h5>
            </div>
        </div>
    );
}