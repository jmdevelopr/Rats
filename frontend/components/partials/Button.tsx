import * as React from "react";
import "../../styles/Button.scss";
import "../../styles/media/Button.scss";

const Button: Function = (props: IProps): JSX.Element => {
    return <button className={`rats-btn ${props.color==="black" ? "black" : props.color==="gray" ? "gray" : props.color==="white" ? "white" : "red"}`}>{props.name}</button>
};
//props.color==="black" ? "rats-btn black" : props.color==="gray" ? "rats-btn gray" : "rats-btn red"
interface IProps {
    name: string;
    color: string;
}

export default Button;