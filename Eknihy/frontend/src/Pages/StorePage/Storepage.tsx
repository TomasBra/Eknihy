import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Book } from "../../components/BooksPage/Book";
import { useMobile } from "../../components/Hooks/useMobile";
import { PreviewProduct } from "../../components/Shared/PreviewProduct";
import { Categories } from "../../components/Storepage/Categories";
import { Sorting } from "../../components/Storepage/Sorting";


export function Storepage(props: any) {

    const [Option, setOption] = useState("Abecedně");
    const [Category, setCategory] = useState();
    const [Books, SetBooks] = useState([]);
    let { search, category, content }: any = useParams();

    useEffect(() => {
        console.log(category, content, search, Option);
        LoadBooks();
    }, [useParams(), Option]);



    function LoadBooks() {
        let SendCategory = category;
        if (category == "All") {
            SendCategory = null;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ CategoryName: SendCategory, SearchValue: search, Sorting: Option })
        };
        fetch('/api/products/count/' + content, requestOptions)
            .then(response => response.json())
            .then((data) => {
                SetBooks(data);
                console.log(data);
            });
    }

    return (
        <div className="container-md mt-5">
            <div className="d-inline-block col-md-12">
                <Categories setCategory={setCategory} search={search} url="/store"/>
            </div>
            <div className="d-inline-block col-md-12 align-top pt-4 text-center">
                <Sorting setOption={setOption}></Sorting>
                <div className="d-block">
                    {Books.map((Book: any) => {
                        return (
                            <div className="col-12 col-sm-6 col-lg-3 d-inline-block text-center">
                                <PreviewProduct id={Book.Id} name={Book.Name} author={Book.Authors.map((Author: any) => {
                                    return (Author.AuthorName + " ");
                                })} price={Book.Price} image={Book.ImageAdress} />
                            </div>
                                );
                    })}
                    <Link to={search == null ? '/store/' + category + '/' + (parseInt(content) + 10)+ '/': '/store/' + category + '/' + (parseInt(content) + 10)+ '/' + search}>
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-outline-primary">Načíst další</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}