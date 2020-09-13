import * as React from "react";
import "../styles/SignUp.scss";
import Logo from "../assets/logo-full-black.svg";

import { connect, ConnectedProps } from 'react-redux';
import { createUser } from "../store/auth/actions";

import Button from './partials/Button';

class SignUp extends React.Component<Props, any> {

    private handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        const signUp: HTMLFormElement = document.querySelector('#sign-up');

        const errDiv: HTMLDivElement = document.querySelector('.confirm-password-error');
        errDiv.innerHTML = "";

        const username: string  = signUp.username.value;
        const email: string = signUp.email.value;
        const password: string = signUp.password.value;
        const confirmPassword: string = signUp.confirmpassword.value;

        if (password === confirmPassword)
            this.props.createUser({email, password, username})
        else {
            const errDiv: HTMLDivElement = document.querySelector('.confirm-password-error');
            errDiv.innerHTML = "Make sure the passwords are the same";
        }
    }

    private handleRedirect = (id: string|any) => {
        if (id) location.assign('/');
    }

    public render(): JSX.Element {
        if (this.props.data)
            this.handleRedirect(this.props.data.id);
        return(
            <div className="SignUp">
                <div className="logo"><Logo /></div>
                <form id="sign-up" onSubmit={(e: React.FormEvent) => this.handleSignUp(e)}>
                    <div className="input-sec">
                        <label className="rats-label" htmlFor="username">Enter your username</label>
                        <input className="rats-input" type="text" name="username" required/>
                        <div className="username-error">{this.props.data ? this.props.data.usernameError : ""}</div>
                    </div>

                    <div className="input-sec">
                        <label className="rats-label" htmlFor="email">Enter your email</label>
                        <input className="rats-input" type="text" name="email" required/>
                        <div className="email-error">{this.props.data ? this.props.data.emailError : ""}</div>
                    </div>

                    <div className="input-sec">
                        <label className="rats-label" htmlFor="password">Enter the password</label>
                        <input className="rats-input" type="password" name="password" required/>
                        <div className="password-error">{this.props.data ? this.props.data.passwordError : ""}</div>
                    </div>

                    <div className="input-sec">
                        <label className="rats-label" htmlFor="confirmpassword">Confirm the password</label>
                        <input className="rats-input" type="password" name="confirmpassword" required/>
                        <div className="confirm-password-error"></div>
                    </div>

                    <Button name="Create user" color="black"/>
                </form>
            </div>
        )
    }
};

interface RootState {
    //interface for what I want from a store
    authReducer: {
        data: {
            id?: string;
            email?: string;
            usernameError: string;
            emailError: string;
            passwordError: string;
        }
    }
}

const mapState = (state: RootState) => ({
    //mapStateToProps
    data: state.authReducer.data
})

const mapDispatch = {
    //mapDispatchToProps
    createUser: (user: IUser) => createUser(user)
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    //backgroundColor: string
    // ^^^ in case I want any other props from other components
}

export default connector(SignUp);