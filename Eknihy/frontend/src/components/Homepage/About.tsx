import React from "react";
import { Link } from "react-router-dom";


export function About() {
    return (
        <div className="text-center mt-5 mb-5" >
            <p className="display-3">O nás</p>
            <div className="row mb-4">
                <div className="col-3 col-md-4"></div>
                <div className="AboutUnderline col-6 col-md-4"></div>
                <div className="col-3 col-md-4"></div>
            </div>
            <p className="mb-0 text-muted d-inline">Jsme nová platforma, na které můžete nakupovat knihy a okamžitě je číst, kdekoliv a kdykoliv.<br />
                Knihy můžete číst jak na naší webové platformě, tak i v PC, iOS nebo Android aplikaci, kterou lze jednoduše nainstalovat.
                Návod k instalaci aplikace najdete na adrese</p><Link to="/application" className="DecoratedLink d-inline"> www.myreader.cz/application</Link><p className="text-muted d-inline"> nebo v záložce aplikace.
            </p>
        </div>


        );
}