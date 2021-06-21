import React from "react";
import { Link } from "react-router-dom";


export function ProductsTable(props: any) {

    return (
        <div className="table-responsive fixed-table ">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" className="col-6">Název</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Kategorie</th>
                        <th scope="col">Nakladatelství</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Bestseller</th>
                        <th scope="col">Novinka</th>
                        <th scope="col">Obrázek</th>
                        <th scope="col">Kniha</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.Products.map((Product: any) => {
                        return (
                            <tr>
                                <th scope="row">{Product.Id}</th>
                                <td className="text-nowrap">{Product.Name}</td>
                                <td>{Product.Authors.map((Author: any) => {
                                    return (Author.AuthorName + " ");
                                })}</td>
                                <td>{Product.Category.CategoryName}</td>
                                <td>{Product.PublishingHouse.Name}</td>
                                <td>{Product.Price} Kč</td>
                                <td>{Product.Bestseller ? "Ano" : "Ne"}</td>
                                <td>{Product.New ? "Ano" : "Ne"}</td>
                                <td><Link to={Product.ImageAdress} target='_blank'>odkaz</Link></td>
                                <td><Link to={Product.BookAdress} target='_blank'>odkaz</Link></td>
                                <td><Link to={"/administration/products/edit/" + Product.Id}><button className="btn btn-outline-primary">Upravit</button></Link></td>
                                <td><button className="btn btn-outline-danger" onClick={() => props.DeleteProduct({ Id: Product.Id, Name: Product.Name, Author: Product.Author, Category: Product.Category, Price: Product.Price, Bestseller: Product.Bestseller, New: Product.New, ImageAdress: Product.ImageAdress, BookAdress: Product.BookAdress, PublishingHouse: Product.PublishingHouse, Description: Product.Description })}>Odstranit</button></td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
        </div>
    );
}