import React, { Component, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { PreviewProduct } from '../Shared/PreviewProduct';

export function News() {
    const [Books, SetBooks] = useState([]);

    useEffect(() => {
        LoadBooks();
    }, [])

    function LoadBooks() {
        fetch('/api/products/news/3')
            .then(response => response.json())
            .then(data => SetBooks(data));
    }



    return (
        <div className="mt-5">
            <h1 className="d-flex display-6 mt-5 ml-4">Novinky</h1>
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