import React, { Component, useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export interface BookProps {
    id: string;
    name: string;
    author: string;
    image: string;
    book: string;
}

export function Book(props: BookProps) {
    const [MouseOver, SetMouseOver] = useState(false);

    return (
        <div className="ml-auto mr-auto mb-2 ml-md-1 mr-md-1 ml-lg-3 mr-lg-3 mt-md-2 d-md-inline-block justify-content-center product-preview product-max-width">
            <div className="preview-parent" onMouseOver={() => { setTimeout(() => SetMouseOver(true), 5); }} onMouseLeave={() => { SetMouseOver(false); }}>
                <img className="product-preview-img d-flex justify-content-center" src={props.image} alt="Card image cap" />
                <div className="preview-children">
                    <img className="product-preview-img d-flex justify-content-center invisible" src={props.image} alt="Card image cap" />
                    <div className="d-flex align-items-center justify-content-center h-100 children-icons">
                        <NavLink NavLink tag={Link} className={`p-0 ${!MouseOver ? "d-none w-0" : null}`} to={'/book/' + props.id}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book icon-30-white" viewBox="0 0 16 16">
                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                            </svg>
                        </NavLink>
                        <NavLink NavLink tag={Link} className={`p-0 ${!MouseOver ? "d-none w-0" : null}`} to={props.book} target="_blank" download>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-circle icon-30-white" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                            </svg>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div>
                <h5>{props.name}</h5>
                <h6>{props.author}</h6>
            </div>
        </div>
    );
}