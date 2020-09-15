import * as React from "react";
import "../styles/Start.scss";
import Logo from "../assets/logo-full-black.svg";

import Button from './partials/Button';

import { Link } from "react-router-dom";

const Start: React.FC = () => {
    return (
        <div className="Start">
            <div className="logo"><Logo /></div>
            <div className="start-content">
                <Link to="/Rats/signup"><Button name="Join for free" color="black"/></Link>
                <p>Or</p>
                <Link to="/Rats/login"><Button name="Log in" color="white"/></Link>
                <p>If you already have an account</p>
            </div>
        </div>
    )
}

export default Start;