import { faAppleAlt, faDesktop, faKeyboard, faMouse, faRobot} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAndroid, faApple, fab, faWindows } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import { faHdd } from "@fortawesome/free-regular-svg-icons";


export function SelectDevicePage() {

    return (
        <div className="container">
            <div className="mt-sm-3 mt-0 pt-5 w-100 text-center">
                <p className="display-4 mb-5">Zvolte si typ zařízení</p>
                <Link to={"/application/ios"} className="d-inline-block ml-5 mr-5 text-center mt-sm-4 mt-2">
                    <FontAwesomeIcon className="icon" icon={faApple} size="8x" color="gray" />
                    <p>iOS</p>
                </Link>
                <Link to={"/application/android"} className="d-inline-block ml-5 mr-5 text-center mt-sm-4 mt-2">
                    <FontAwesomeIcon className="icon" icon={faAndroid} size="8x" color="#63d62e" />
                    <p>Android</p>
                </Link>
                <Link to={"/application/pc"} className="d-inline-block ml-5 mr-5 text-center mt-sm-4 mt-2">
                    <FontAwesomeIcon className="icon" icon={faWindows} size="8x" />
                    <p>PC</p>
                </Link>
            </div>
        </div>
    );
}