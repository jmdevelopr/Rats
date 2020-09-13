import * as React from "react";
import "../styles/LogIn.scss";
import Logo from "../assets/logo-full-black.svg";

import { connect, ConnectedProps } from 'react-redux';
import { logInUser } from "../store/auth/actions";

import Button from './partials/Button';

class LogIn extends React.Component<Props, any> {

    private handleLogIn = (e: React.FormEvent) => {
        e.preventDefault();
        const signUp: HTMLFormElement = document.querySelector('#log-in');

        const email: string = signUp.email.value;
        const password: string = signUp.password.value;

        this.props.logInUser({email, password})
    }

    public render(): JSX.Element {
        return(
            <div className="LogIn">
                <div className="logo"><Logo /></div>
                <form id="log-in" onSubmit={(e: React.FormEvent) => this.handleLogIn(e)}>
                    <div className="input-sec">
                        <label className="rats-label" htmlFor="email">Email</label>
                        <input className="rats-input" type="text" name="email" required/>
                        <div className="email-error">{this.props.data ? this.props.data.emailError : ""}</div>
                    </div>
                    
                    <div className="input-sec">
                        <label className="rats-label" htmlFor="password">Password</label>
                        <input className="rats-input" type="password" name="password" required/>
                        <div className="password-error">{this.props.data ? this.props.data.passwordError : ""}</div>
                    </div>
                    
                    <Button name="Log in" color="black"/>
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
            emailError?: string;
            passwordError?: string;
        }
    }
}

const mapState = (state: RootState) => ({
    //mapStateToProps
    data: state.authReducer.data
})

const mapDispatch = {
    //mapDispatchToProps
    logInUser: (user: IUser) => logInUser(user)
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    //backgroundColor: string
    // ^^^ in case I want any other props from other components
}

export default connector(LogIn);