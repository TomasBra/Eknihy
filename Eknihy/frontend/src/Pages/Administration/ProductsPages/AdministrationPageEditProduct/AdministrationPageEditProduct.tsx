import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Select from 'react-select';
import { BookInterFace } from "../../../../components/Administrationpage/Shared/BookInterFace";
import { Navigation } from "../../../../components/Administrationpage/Shared/Navigation";
import RichTextEditor from 'react-rte';

export function AdministrationPageEditProduct() {
    const [Authors, SetAuthors] = useState([]);
    const [PublishingHouses, SetPublishingHouses] = useState([]);
    const [Categories, SetCategories] = useState([]);
    const [Book, SetBook]: any = useState<BookInterFace>({} as BookInterFace);
    const [DefaultAuthorsValue, SetDefaultAuthorsValue] = useState();
    const [Text, SetText] = useState(RichTextEditor.createEmptyValue());


    let history = useHistory();
    let { id }: any = useParams();

    useEffect(() => {
        LoadAuthors();
        LoadPublishingHouses();
        LoadCategories();
        LoadBook();
    }, []);

    function LoadBook() {
        fetch('/api/products/' + id)
            .then(response => response.json())
            .then(data => {
                let ArrayData: any = [];
                data[0].Authors.forEach((Author: any) => {
                    ArrayData.push({ value: Author.AuthorName, label: Author.AuthorName, Author: Author });
                });
                SetDefaultAuthorsValue(ArrayData);
                SetBook({ ...data[0], Authors: ArrayData });
                SetText(RichTextEditor.createValueFromString(data[0].Description, "html"));
            });
    }

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
            formData.append("Bestseller", Book.Bestseller);
            formData.append("New", Book.New);
            formData.append("ImageFile", Book.ImageFile);
            formData.append("BookFile", Book.BookFile);

            const requestOptions = {
                method: 'POST',
                'Content-Type': 'multipart/form-data',
                body: formData
            };
            fetch('/api/products/edit/' + id, requestOptions)
                .then(response => response.text())
                .then((response) => {
                    history.push("/administration/message/" + response);
                });
        }
    }

    function Validate(): boolean {
        if (Book.Name != null && Book.Authors != null && Book.Category != null && Book.PublishingHouse != null && Book.Price != null && Book.Description != null) {
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
                    <p className="display-4">Editace knihy</p>
                    <input type="text" className="form-control mt-3" placeholder="Název" value={Book.Name} onChange={(e: any) => {
                        SetBook({ ...Book, Name: e.target.value });
                    }} />
                    <Select className="mt-3" placeholder="Vyhledat Autora" isMulti={true} options={Authors} noOptionsMessage={() => "Žádný výsledek..."}
                        onChange={(e: any) => {
                            SetBook({ ...Book, Authors: e});
                        }}
                        defaultValue={DefaultAuthorsValue}
                    />
                    <input type="text" className="form-control mt-3" placeholder="Cena v Kč" value={Book.Price} onChange={(e: any) => {
                        SetBook({ ...Book, Price: e.target.value });
                    }} />
                    <Select className="mt-3" placeholder="Vyhledat nakladatelství"  options={PublishingHouses} noOptionsMessage={() => "Žádný výsledek..."}
                        onChange={(e: any) => {
                            SetBook({ ...Book, PublishingHouse: e.PublishingHouse });
                        }}
                        defaultValue={{ label: Book.PublishingHouse.Name, value: Book.PublishingHouse.Name, PublishingHouse: Book.PublishingHouses }}
                    />
                    <Select className="mt-3" placeholder="Vyhledat kategorii" options={Categories} noOptionsMessage={() => "Žádný výsledek..."}
                        onChange={(e: any) => {
                            SetBook({ ...Book, Category: e.Category });
                        }}
                        defaultValue={{ label: Book.Category.CategoryName, value: Book.Category.CategoryName, Category: Book.Category}}
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
                            checked={Book.Bestseller}
                            onChange={(e: any) => {
                                SetBook({ ...Book, Bestseller: e.target.checked});
                            }} />
                        <label className="form-check-label">Bestseller</label>
                    </div>
                    <div className="form-check mt-3">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"
                            checked={Book.New}
                            onChange={(e: any) => {
                                SetBook({ ...Book, New: e.target.checked});
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
                        <button className="btn btn-outline-primary" onClick={() => PostNewBook()}>Uložit změny</button>
                    </div>
                </div>
                : null}
        </div>
    );
}