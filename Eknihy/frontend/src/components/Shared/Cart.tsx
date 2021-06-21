import React, { Component, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { GlobalContext } from '../../App'
import { CartProduct } from './CartProduct';



export function Cart() {

    const { CartVisible, SetCartVisible } = useContext(GlobalContext);
    const { ItemsInCart, SetItemsInCart } = useContext(GlobalContext);

    return (
        <div className="Cartparent col-9 col-sm-5 col-lg-4 col-md-5 ">
            {ItemsInCart.map((Item:any) =>
            {
                return (
                    <CartProduct name={Item.name} price={Item.price} productlink={Item.productlink} image={Item.image} pieces={Item.pieces}  />);
            })}
            <div className="row justify-content-center mb-2 mt-2">
                <Link to="/cart" onClick={() => { SetCartVisible(!CartVisible);}} className="col-8 justify-content-center mb-1 mt-1 btn btn-outline-primary">
                        Přejít do košíku
                </Link>
            </div>
        </div>
    );
}