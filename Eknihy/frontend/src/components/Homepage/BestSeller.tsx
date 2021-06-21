import React, { Component, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { BookInterFace } from '../Administrationpage/Shared/BookInterFace';
import { PreviewProduct } from '../Shared/PreviewProduct';

export function BestSeller() {
    const [Books, SetBooks] = useState([]);

    useEffect(() => {
        LoadBooks();
    },[])

    function LoadBooks() {
        fetch('/api/products/bestsellers/3')
            .then(response => response.json())
            .then(data => SetBooks(data));
    }


    return (
        <div>
            <h1 className="d-flex display-6 mt-4 ml-4">Bestsellery</h1>
            <div className="text-center">
                {Books.map((Book: any) => {
                    return (<PreviewProduct id={Book.Id} name={Book.Name} author={Book.Authors.map((Author: any) => {
                        return (Author.AuthorName + " ");
                    })} price={Book.Price} image={Book.ImageAdress} />);
                })}
            </div>
        </div>
    );
}