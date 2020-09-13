import * as React from "react";
import "../../styles/Switch.scss";

function Switch(props: IProps): JSX.Element {
    return (
        <label className="switch noSelect">
            {props.value===true ? 
                <input type="checkbox" onClick={() => props.setValue(props.value)} defaultChecked/>
                :
                <input type="checkbox" onClick={() => props.setValue(props.value)} />
            }
            <span className="slider"></span>
        </label>
    )
} 

interface IProps {
    value: boolean|string;
    setValue: React.Dispatch<React.SetStateAction<boolean|string>>
}

export default Switch;