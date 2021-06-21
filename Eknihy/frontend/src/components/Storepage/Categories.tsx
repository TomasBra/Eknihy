import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMobile } from "../Hooks/useMobile";

export function Categories(props: any) {

    const [Mobile, setMobile] = useMobile(false);
    const [Categories, SetCategories] = useState([]);

    useEffect(() => {
        LoadCategories();
    }, []);

    function LoadCategories() {
        fetch('/api/categories')
            .then(response => response.json())
            .then((data) => {
                SetCategories(data);
            });
    }


    return (
        <div>
                <button className="btn w-100 m-0 p-0" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                    <h4 className="col-12 w-100 m-0 p-0 text-left AboutUnderline">KATEGORIE</h4>
                </button>
            <div className="collapse close float-none" id="collapseExample">
                <Link to={props.search != null ? props.url + "/All/10/" + props.search : props.url + "/All/10/"} >
                    <button className="btn mr-2 mt-1 d-flex col-12 categories">Bez kategorie</button>
                </Link>
                {Categories.map((Category: any) => {
                    return (
                        <Link to={props.search != null ? props.url + "/" + Category.CategoryName + "/10/" + props.search : props.url + "/" + Category.CategoryName + "/10/"} >
                            <button className="btn mr-2 mt-1 d-flex col-12 categories">{Category.CategoryName}</button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}