import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";
import { ProductsTable } from "../../../../components/AdministrationProductPage/ProductsTable";
import { Sorting } from "../../../../components/Storepage/Sorting";


export function AdministrationPageProducts() {

    const [Products, SetProducts]: any = useState([]);
    const [Option, setOption] = useState("Abecedně");
    let { search, category, content }: any = useParams();

    useEffect(() => {
        LoadProducts();
    }, [useParams(), Option]);

    function LoadProducts() {
        let SendCategory = category;
        if (category == "All") {
            SendCategory = null;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({CategoryName: SendCategory, SearchValue: search, Sorting: Option })
        };
        fetch('/api/products/count/' + content, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                SetProducts(data);
            });
    }

    function DeleteProduct(ObjectToDelete: any) {
        if (window.confirm("Opravdu chcete produkt odstranit z databáze?") == true) {
            const requestOptions = {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ObjectToDelete)
            };
            fetch('/api/products/delete', requestOptions)
                .then(response => response.json())
                .then(data => { LoadProducts();});
        }
        else { }
    }

    return (
        <div className="container">
            <div className="mb-4">
                <Navigation />
                <Link to="/administration/products/new" className="ml-2 mt-2 mr-2 mb-4 float-md-right">
                    <button className="btn btn-outline-success mt-2 ">Přidat Knihu</button>
                </Link>
            </div>
            <div className="text-center">
                <p className="display-4 mb-4">Produkty</p>
            </div>
            <div>
                <Sorting setOption={setOption} />
            </div>
            <div>
                <ProductsTable Products={Products} SetProducts={SetProducts} DeleteProduct={DeleteProduct} />
            </div>
            <Link to={search == null ? '/administration/get/products/' + category + '/' + (parseInt(content) + 10) + '/' : '/administration/get/products/' + category + '/' + (parseInt(content) + 10) + '/' + search}>
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-outline-primary">Načíst další</button>
                </div>
            </Link>
        </div>
    );
}