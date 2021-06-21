import React, { Component, useState, useEffect, useContext } from 'react';
import { Check } from 'react-bootstrap-icons';
import {Link, useLocation} from  'react-router-dom'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {GlobalContext} from '../../App'
import { checkUrl } from '../Functions/shared/checkUrl';

export function Search() {

    const { SetSearchVisible, SearchVisible } = useContext(GlobalContext);
    const [SearchValue, SetSearchValue] = useState("");
    const location: any = useLocation();

    return (
        <div className="searchparent">
            <div className="close float-right input-group-btn">
                <button className="btn" onClick={() => SetSearchVisible(!SearchVisible)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x icon-40-white mr-2 mt-2" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            </div>
            <div className="input group search col-12">
                <div className="input-group">
                    <div className="col-2"></div>
                    <input type="text" className="input-bottom-border col-8" placeholder="Vyhledat" value={SearchValue} onChange={(input) => { SetSearchValue(input.target.value) }} />
                    <div className="input-group-append">
                        <Link to={checkUrl({ location: location, SearchValue: SearchValue })} onClick={() => { SetSearchVisible(false); }}>
                            <button className="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search icon-19-white" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}