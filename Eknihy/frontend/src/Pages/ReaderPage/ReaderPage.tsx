import React, { useContext, useEffect, useState } from "react";
import { ReactReader } from "react-reader";
import { useHistory, useParams } from "react-router";
import { GlobalContext } from "../../App";
import { useLocalStorage } from "../../components/Hooks/useLocalStorage";
import { CheckLogin } from "../../components/Shared/CheckLogin";


export function ReaderPage() {

    let { id }: any = useParams();
    const [Location, SetLocation] = useLocalStorage(id, null);
    const [Rendetion, SetRendetion]: any = useState({});
    const [Book, SetBook]: any = useState({});
    const { User, SetUser } = useContext(GlobalContext);
    const [Loaded, SetLoaded] = useState(false);
    let fontsize: number = 100;
    let history = useHistory();

    function getRendition(rendition: any) {
        console.log(rendition);
        SetRendetion(rendition);
    }

    function onToggleFontSize(incerease: boolean) {
        if (incerease) {
            fontsize += 10;
        }
        else if (fontsize > 10) {
            fontsize -= 10;
        }
        Rendetion.themes.fontSize(fontsize.toString() + "%");
    }

    useEffect(() => {
        console.log(Rendetion);
    })

    useEffect(() => {
        LoadBook();
        CheckOwnign();
    }, []);

    function CheckOwnign() {
        console.log(User);
        fetch("/api/check/owning/" + id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(User)
        }).then(response => response.json())
            .then((data) => {
                console.log(data);
                if (data == false) {
                    history.push("/books/All/10");
                }
                SetLoaded(true);
            });
    }

    function LoadBook() {
        fetch("/api/products/" + id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
            .then((data) => {
                console.log(data);
                SetBook(data[0]);
            });
    }



    return (
        <div>
            {
                Loaded ?
                    <div className="container-md mt-md-4 mb-md-4 text-center position-relative">
                        <div className="btn float-right align-top position-absolute font-toogle">
                            <div className="btn d-block" onClick={() => { onToggleFontSize(false); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts icon-33" viewBox="0 0 16 16">
                                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                </svg>
                            </div>
                            <div className="btn d-block" onClick={() => { onToggleFontSize(true); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fonts icon-40" viewBox="0 0 16 16">
                                    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                                </svg>
                            </div>
                        </div>
                        <div className="position-relative">
                            <div className="p-0 w-100 d-block" style={{ position: "relative", height: "80vh" }}>
                                <ReactReader
                                    url={Book.BookAdress}
                                    title={Book.Name}
                                    location={Location}
                                    locationChanged={(epubcifi: any) => {
                                        SetLocation(epubcifi);
                                    }}
                                    swipeable={true}
                                    getRendition={getRendition} />
                            </div>
                        </div>
                    </div> : <div />}
            <CheckLogin />
        </div>
    );
}