import React, { Component, useContext, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Search } from './Search';
import { GlobalContext } from '../../App'
import { Cart } from './Cart';
import { BottomHeader } from './BottomHeader';
import { AddedToCartLog } from './AddedToCartLog';

export function Layout(props: any) {
    const { SearchVisible, SetSearchVisible } = useContext(GlobalContext);
    const { CartVisible, SetCartVisible } = useContext(GlobalContext);
    const { AddedToCart, SetAddedToCart } = useContext(GlobalContext);

    const [Mobile, setMobile] = useState(false);

        return (
            <div>
                <NavMenu />
                    <div style={{ position: "relative" }} className="container">
                        {SearchVisible ?
                            <Search></Search>
                            : null}
                        {CartVisible ?
                            <Cart></Cart>
                            : null}
                        {AddedToCart.boolean ?
                            <AddedToCartLog message={AddedToCart.message}></AddedToCartLog>
                            : null}
                    </div>
                {props.children}
                <BottomHeader />
            </div>
        );
}