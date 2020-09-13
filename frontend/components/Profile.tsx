import * as React from "react";
import "../styles/Profile.scss";
import "../styles/media/Profile.scss";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { connect, ConnectedProps } from 'react-redux';
import { logOutUser, changePassword, deleteAcc } from '../store/auth/actions';

import Button from './partials/Button';

class Profile extends React.Component<Props, any> {

    private handleChangePass = (id: string) => {
        const form: HTMLFormElement = document.querySelector('#change-pass-form');

        const currentPass: string = form.currentpass.value;
        const newPass: string = form.newpass.value;
        const confNewPass: string = form.confnewpass.value;

        const confNewPassErr: HTMLDivElement = document.querySelector('.confnewpass-error');

        confNewPassErr.innerHTML = "";

        if (newPass === confNewPass) {
            this.props.changePassword(this.props.data.id, currentPass, newPass);
        }
        else 
            confNewPassErr.innerHTML = "Make sure the passwords are the same";
    }

    public render(): JSX.Element {
        return(
            <div className="Profile">
                <AccountCircleIcon className="icon"/>
                <p className="username">{this.props.data ? this.props.data.username : ""}</p>
                <p className="email">{this.props.data ? this.props.data.email : ""}</p>
                <div className="sign-out" onClick={() => this.props.logOutUser()}><Button name="Sign out" color="black"/></div>
                <div className="change-pass" onClick={() => this.handleChangePass(this.props.data.id)}><Button name="Change the password" color="black"/></div>
                <div className="delete-acc" onClick={() => this.props.deleteAcc(this.props.data.id)}><Button name="Delete account" color="red"/></div>
            
                <div className="popup visible change-pass-pop">
                    <form id="change-pass-form">
                        <div className="input-sec">
                            <label className="rats-label" htmlFor="currentpass">Current password</label>
                            <input className="rats-input" type="password" name="currentpass" required/>
                            <div className="currentpass-error">{this.props.data ? this.props.data.emailError : ""}</div>
                        </div>
                        <div className="input-sec">
                            <label className="rats-label" htmlFor="newpass">New password</label>
                            <input className="rats-input" type="password" name="newpass" required/>
                            <div className="newpass-error"></div>
                        </div>
                        <div className="input-sec">
                            <label className="rats-label" htmlFor="confnewpass">Confirm new password</label>
                            <input className="rats-input" type="password" name="confnewpass" required/>
                            <div className="confnewpass-error"></div>
                        </div>
                    </form>
                </div>
                <div className="popup visible delete-acc-pop">
                </div>
            </div>
        )
    }
};

interface RootState {
    //interface for what I want from a store
    authReducer: {
        data: {
            id: string;
            email: string;
            username: string;
            emailError: string;
        }
    }
}
  
const mapState = (state: RootState) => ({
    //mapStateToProps
    data: state.authReducer.data
})

const mapDispatch = {
    //mapDispatchToProps
    logOutUser: () => logOutUser(),
    changePassword: (id: string, currentPass: string, newPass: string) => changePassword(id, currentPass, newPass),
    deleteAcc: (id: string) => deleteAcc(id)
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    //backgroundColor: string
    // ^^^ in case I want any other props from other components
}

export default connector(Profile);