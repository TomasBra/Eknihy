import React, { Component, useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../App';

export function AddedToCartLog(props:any) {

    const [SearchValue, SetSearchValue] = useState(null);
    const [SearchVisible, SetSearchVisible] = useState(false);
    const [CartVisible, SetCartVisible] = useState(false);



    return (
        <div className="checkparent">
            <div className="check">
                {props.message == "Přidáno do košíku" ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2 icon-80-white icon-check" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                    : null}
                <p className="text-center checkText">{props.message}</p>
            </div>
        </div>
        );
}