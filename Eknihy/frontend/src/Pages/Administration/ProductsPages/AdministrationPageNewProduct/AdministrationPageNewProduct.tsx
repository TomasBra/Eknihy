import React, { useEffect, useState } from 'react';
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";
import Select from 'react-select';
import { useHistory } from 'react-router';
import { BookInterFace } from "../../../../components/Administrationpage/Shared/BookInterFace";
import RichTextEditor from 'react-rte';


export function AdministrationPageNewProduct() {
    const [Authors, SetAuthors] = useState([]);
    const [PublishingHouses, SetPublishingHouses] = useState([]);
    const [Categories, SetCategories] = useState([]);
    const [Text, SetText]: any = useState(RichTextEditor.createEmptyValue());

    const [Book, SetBook]: any = useState({
        Name: null,
        Author: {},
        Category: {},
        PublishingHouse: {},
        Price: null,
        Description: null,
        BestSeller: false,
        New: false,
        ImageFile: null,
        BookFile: null
    });

    let history = useHistory();

    useEffect(() => {
        LoadAuthors();
        LoadPublishingHouses();
        LoadCategories();
    }, []);

    function LoadAuthors() {
        fetch('/api/authors')
            .then(response => response.json())
            .then(data => {
                let opt: any = [];
                data.forEach((Author: any) => {
                    opt.push({ value: Author.AuthorName, label: Author.AuthorName, Author: Author });
                }); SetAuthors(opt);
            });
    }

    function LoadPublishingHouses() {
        fetch('/api/publishinghouses')
            .then(response => response.json())
            .then(data => {
                let opt: any = [];
                data.forEach((PublishingHouse: any) => {
                    opt.push({ value: PublishingHouse.Name, label: PublishingHouse.Name, PublishingHouse: PublishingHouse });
                }); SetPublishingHouses(opt);
            });
    }

    function LoadCategories() {
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => {
                let opt: any = [];
                data.forEach((Category: any) => {
                    opt.push({ value: Category.CategoryName, label: Category.CategoryName, Category: Category });
                }); SetCategories(opt);
            });
    }

    function PostNewBook() {
        console.log(Book);
        console.log(Validate());
        if (Validate()) {
            let formData = new FormData();
            formData.append("Name", Book.Name);
            Book.Authors.map((Author: any) => {
                formData.append("AuthorId", Author.Author.AuthorId);

            });
            formData.append("CategoryId", Book.Category.CategoryId);
            formData.append("PublishingHouseId", Book.PublishingHouse.PublishingHouseId);
            formData.append("Price", Book.Price);
            formData.append("Description", Book.Description);
            formData.append("Bestseller", Book.BestSeller);
            formData.append("New", Book.New);
            formData.append("ImageFile", Book.ImageFile);
            formData.append("BookFile", Book.BookFile);

            const requestOptions = {
                method: 'POST',
                'Content-Type': 'multipart/form-data',
                body: formData
            };
            fetch('/api/products/new', requestOptions)
                .then(response => response.text())
                .then((response) => {
                    history.push("/administration/message/" + response);
                });
        }
    }

    function Validate(): boolean {
        if (Book.Name != null && Book.Author != null && Book.Category != null && Book.PublishingHouse != null && Book.Price != null && Book.Description != null && Book.ImageFile != null && Book.BookFile != null) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div className="container">
            <Navigation />
            {Object.keys(Book).length != 0 ?
                <div>
                    <p className="display-4">Nová kniha</p>
                    <input type="text" className="form-control mt-3" placeholder="Název" value={Book.Name} onChange={(e: any) => {
                        SetBook({ ...Book, Name: e.target.value });
                    }} />
                    <Select className="mt-3" placeholder="Vyhledat Autora" isMulti={true} options={Authors} noOptionsMessage={() => "Žádný výsledek..."}
                        onChange={(e: any) => {
                            SetBook({ ...Book, Authors: e });
                        }}
                    />
                    <input type="text" className="form-control mt-3" placeholder="Cena v Kč" value={Book.Price} onChange={(e: any) => {
                        SetBook({ ...Book, Price: e.target.value });
                    }} />
                    <Select className="mt-3" placeholder="Vyhledat nakladatelství" options={PublishingHouses} noOptionsMessage={() => "Žádný výsledek..."}
                        onChange={(e: any) => {
                            SetBook({ ...Book, PublishingHouse: e.PublishingHouse });
                        }}
                    />
                    <Select className="mt-3" placeholder="Vyhledat kategorii" options={Categories} noOptionsMessage={() => "Žádný výsledek..."}
                        onChange={(e: any) => {
                            SetBook({ ...Book, Category: e.Category });
                        }}
                    />
                    <RichTextEditor
                        className="mt-3"
                        value={Text}
                        onChange={(e: any) => {
                             SetText(e); SetBook({ ...Book, Description: e.toString('html') });
                        }}
                    />
                    <div className="form-check mt-3">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"
                            checked={Book.BestSeller}
                            onChange={(e: any) => {
                                SetBook({ ...Book, BestSeller: e.target.checked });
                            }} />
                        <label className="form-check-label">Bestseller</label>
                    </div>
                    <div className="form-check mt-3">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"
                            checked={Book.New}
                            onChange={(e: any) => {
                                SetBook({ ...Book, New: e.target.checked });
                            }} />
                        <label className="form-check-label">Novinka</label>
                    </div>
                    <div className="form-group mt-3">
                        <label>Obrázek</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" accept="image/*" onChange={(e: any) => {
                            SetBook({ ...Book, ImageFile: e.target.files[0] });
                        }} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Kniha: Epub soubor</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" accept=".epub" onChange={(e: any) => {
                            SetBook({ ...Book, BookFile: e.target.files[0] });
                        }} />
                    </div>
                    <div>
                        <button className="btn btn-outline-primary" onClick={() => PostNewBook()}>Vytvořit</button>
                    </div>
                </div>
                : null}
        </div>
    );
}