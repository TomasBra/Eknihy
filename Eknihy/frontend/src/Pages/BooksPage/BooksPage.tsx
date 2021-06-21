import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { GlobalContext } from "../../App";
import { Book } from "../../components/BooksPage/Book";
import { SortingBookPage } from "../../components/BooksPage/SortingBookPage";
import { CheckLogin } from "../../components/Shared/CheckLogin";
import { Categories } from "../../components/Storepage/Categories";
import { Sorting } from "../../components/Storepage/Sorting";

export function BooksPage() {

    const [Books, SetBooks]:any = useState([]);
    const [Option, setOption] = useState("Abecedně");
    const [Category, setCategory] = useState();
    const { User, SetUser }: any = useContext(GlobalContext);
    let { search, category, content }: any = useParams();

    useEffect(() => {
        if (User != null) {
            console.log(category, content, search, Option);
            LoadBooks();
        }
    }, [useParams(), Option]);

    function LoadBooks() {
        let SendCategory = category;
        if (category == "All") {
            SendCategory = null;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Input:{ CategoryName: SendCategory, SearchValue: search, Sorting: Option }, User:User })
        };
        fetch('/api/users/books/' + content, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                SetBooks(data);
            });
    }


    return (
        <div className="container-md mt-3">
            <div className="d-flex justify-content-center">
                <p className="display-4 text-center MybooksUnderline col-12 col-md-5">Mé knihy</p>
            </div>
            <div className="d-inline-block col-md-12">
                <Categories setCategory={setCategory} search={search} url="/books" />
            </div>
            <div className="d-inline-block col-md-12 align-top pt-4 text-center">
                <SortingBookPage setOption={setOption}></SortingBookPage>
                <div className="d-block">
                    {Books.map((book: any) => {
                        return (
                            <div className="col-12 col-sm-6 col-lg-3 d-inline-block text-center">
                                <Book id={book.Id} name={book.Name} author={book.Authors.map((Author: any) => {
                                    return (Author.AuthorName + " ");
                                })} image={book.ImageAdress} book={book.BookAdress}/>
                            </div>
                        );
                    })}
                    <Link to={search == null ? '/books/' + category + '/' + (parseInt(content) + 10) + '/' : '/books/' + category + '/' + (parseInt(content) + 10) + '/' + search}>
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-outline-primary">Načíst další</button>
                        </div>
                    </Link>
                </div>
            </div>
            <CheckLogin />
        </div>
    );
}