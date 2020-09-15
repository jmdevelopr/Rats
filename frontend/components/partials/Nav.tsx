import * as React from "react";
import "../../styles/Nav.scss";
import "../../styles/media/Nav.scss";

import LogoLight from "../../assets/logo-white.svg";
import LogoDark from "../../assets/logo-black.svg";

import SettingsIcon from '@material-ui/icons/Settings';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import { NavLink, Link } from "react-router-dom";

import { connect, ConnectedProps } from 'react-redux';

class Nav extends React.Component<Props, any> {

    public render(): JSX.Element {
        const isDark: boolean = this.props.dark ? false : true;
        return(
            <div className={`Nav ${this.props.dark ? 'dark' : ''}`}>
                <Link to="/Rats" className="logo">{this.props.darkMode===isDark ? <LogoLight /> : <LogoDark />}</Link>
                <nav>
                    <NavLink to="/Rats/settings" className="link noSelect" activeClassName="active">
                        <SettingsIcon className="icon" />
                    </NavLink>
                    <NavLink to="/Rats/profile" className="link noSelect" activeClassName="active">
                        <PermIdentityIcon className="icon" />
                    </NavLink>
                </nav>
            </div>
        )
    }
};

interface RootState {
    //interface for what I want from a store
    settingsReducer: {
        darkMode: boolean;
    }
}

const mapState = (state: RootState) => ({
    //mapStateToProps
    darkMode: state.settingsReducer.darkMode
})

const connector = connect(mapState, null);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    dark?: boolean
    // ^^^ in case I want any other props from other components
}

export default connector(Nav);