import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { PreviewProduct } from "../../components/Shared/PreviewProduct";


export function ProductPage() {

    const { AddedToCart, SetAddedToCart } = useContext(GlobalContext);
    const { ItemsInCart, SetItemsInCart } = useContext(GlobalContext);
    const [Pieces, SetPieces] = useState(1);
    let { id }: any = useParams();
    const [Book, SetBook]: any = useState();
    const [SimBooks, SetSimBooks]: any = useState([]);

    useEffect(() => {
        LoadBook();
        LoadSimBooks();
    }, [id]);

    function LoadBook() {
        fetch('/api/products/' + id)
            .then(response => response.json())
            .then(data => {
                SetBook(data[0]);
            });
    }

    function LoadSimBooks() {
        fetch('/api/products/random/' + 4 + "/" + id)
            .then(response => response.json())
            .then(data => {
                SetSimBooks(data);
            });
    }

    function ContainsObject(): boolean {
        if (ItemsInCart.some((Item: any) => Item.name == Book.Name)) {
            return true;
        } else {
            return false;
        }
    }

    function AddToCart() {
        if (!ContainsObject()) {
            SetAddedToCart({ message: "Přidáno do košíku", boolean: !AddedToCart.boolean });
            SetItemsInCart([...ItemsInCart, { id: Book.Id, name: Book.Name, image: Book.ImageAdress, pieces: Pieces, price: Book.Price }]);
        }
        else {
            SetAddedToCart({ message: "Produkt se již nachází v košíku", boolean: !AddedToCart.boolean });
        }
    }

    return (
    <div>
        { Book != null ?
            <div className="container mt-5">
                <div className="d-lg-inline-block col-12 col-lg-5 text-center d-flex justify-content-center align-top">
                    <img src={Book.ImageAdress} className="product-image" />
                </div>
                <div className="d-inline-block col-lg-7">
                    <div>
                        <div className="dashed-bottom">
                            <h2>{Book.Name}</h2>
                                <p><strong>Autor:</strong>{Book.Authors.map((Author: any) => {
                                    return (<p><Link to={"/store/All/10/" + Author.AuthorName}>{Author.AuthorName + ' '}</Link></p>);
                                })}
                                </p>
                        </div>
                        <div className="dashed-bottom mt-3">
                            <p><strong>Základní popis</strong></p>
                                <p dangerouslySetInnerHTML={{ __html: Book.Description.substr(0, 200) + "..." }} />
                                <p><strong>Kategorie:</strong><Link to={"/store/" + Book.Category.CategoryName+"/10"}>{Book.Category.CategoryName}</Link></p>
                            <p><strong>Nakladatelství:</strong> {Book.PublishingHouse.Name}</p>
                        </div>
                        <div className="mt-3">
                            <div>
                                <h3 className="d-inline-block">{Book.Price} Kč</h3>
                            </div>
                            <div className="mt-2">
                                <p className="mb-0"><strong>Množství</strong></p>
                                <input type="number" className="form-control d-inline-block text-center mr-2 col-md-2 w-100 col-3 col-md-1" disabled={true} value={Pieces} min="1" onChange={(e: any) => { SetPieces(parseInt(e.target.value)); }} />
                                <button className="btn btn-outline-primary rounded-0" onClick={() => {
                                    setTimeout(
                                        () => SetAddedToCart(false),
                                        2301
                                    ); AddToCart();
                                }}>Přidat do košíku</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 w-100 mt-4">
                    <h3 className="w-100 col-12 AboutUnderline">Popis</h3>
                        <h6 className="description" dangerouslySetInnerHTML={{ __html: Book.Description }} />
                </div>
                <div className="col-12 w-100 mt-4">
                        <h3>Podobné zboží</h3>
                        <div className="text-center">
                        {SimBooks.map((SimBook: any) => {
                            return (
                                    <PreviewProduct id={SimBook.Id} name={SimBook.Name} author={SimBook.Authors.map((Author: any) => {
                                        return (Author.AuthorName + " ");
                                    })} price={SimBook.Price} image={SimBook.ImageAdress} />
                            );
                        })}
                        </div>
                </div>
            </div>
                : null}
        </div>
    );
}