import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { GlobalContext } from '../../../App';
import { Navigation } from "../../../components/Administrationpage/Shared/Navigation";


export function AdministrationHomePage(props:any) {
    let { message }: any = useParams();

    return (
        <div className="container">
            <Navigation />
            <div className="text-center">
                <p className="display-3 pt-5">Vítejte v administraci serveru</p>
                <p>Zde můžete přidávat nová nakladatelství, kategorie, autory a také samotné knihy a upravovat je.</p>
                {message != null ?
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">{message}</h4>
                    </div>
                    : null}
            </div>
        </div>
        );
}