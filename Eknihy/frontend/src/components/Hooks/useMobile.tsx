import React, { useState } from "react";

export function useMobile(initialValue: any) {

    const [Mobile, setMobile] = useState(checkMobile());

    function checkMobile(): boolean {
        if (window.innerWidth <= 575) {
            return (true);
        }
        else {
            return (false);
        }
    }

    window.addEventListener("resize", (e) => { checkMobileUpdate(e) });

    function checkMobileUpdate(value: any){
        if (value.currentTarget.innerWidth <= 575) {
            setMobile(true);
        }
        else {
            setMobile(false);
        }
    }

    const setValue = () => {
        if (window.innerWidth <= 575) {
            setMobile(true);
        }
        else {
            setMobile(false);
        }
    }
    return [Mobile, setValue];
}