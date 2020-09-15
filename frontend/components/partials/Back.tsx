import * as React from "react";
import "../../styles/Back.scss";
import "../../styles/media/Back.scss";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Link } from "react-router-dom";

const Back: React.ReactType = (props: IProps) => (
    <div className="Back">
        <Link to={props.to === "/Rats/start" ? "/Rats/start" : "/Rats"} className="link">
            <ArrowBackIcon className="icon"/>
        </Link>
    </div>
);

interface IProps {
    to: string;
}

export default Back;