import * as React from "react";
import "../styles/Settings.scss";
import "../styles/media/Settings.scss";

import { connect, ConnectedProps } from 'react-redux';
import { toggleNameDisplay, toggleDarkMode } from '../store/settings/actions';

import Switch from './partials/Switch';

class Settings extends React.Component<Props, any> {

    private handleNameDisplay = (id: string, nameDisplay: boolean, darkMode: boolean) => {
        const preferences = {
            nameDisplay,
            darkMode
        }
        this.props.toggleNameDisplay(id, preferences)
    }

    private handleDarkMode = (id: string, nameDisplay: boolean, darkMode: boolean) => {
        const preferences = {
            nameDisplay,
            darkMode
        }
        this.props.toggleDarkMode(id, preferences);
    }

    private checkDarkMode = () => {
        if (this.props.darkMode === true) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.setAttribute('nav-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');  
            document.documentElement.setAttribute('nav-theme', 'light');
        }
    }

    render() {
        this.checkDarkMode();
        return (
            <div className="Settings">
                <div className="option">
                    <p>Display my name in the comments</p>
                    <Switch value={this.props.nameDisplay} setValue={() => this.handleNameDisplay(this.props.data.id, this.props.nameDisplay, this.props.darkMode)}/>
                </div>
                <div className="option">
                    <p>Dark mode</p>
                    <Switch value={this.props.darkMode} setValue={() => this.handleDarkMode(this.props.data.id, this.props.nameDisplay, this.props.darkMode)}/>
                </div>
            </div>
        );
    }
};

interface RootState {
    //interface for what I want from a store
    authReducer: {
        data: {
            id: string;
        }
    },
    settingsReducer: {
        nameDisplay: boolean;
        darkMode: boolean;
    }
}
  
const mapState = (state: RootState) => ({
    //mapStateToProps
    data: state.authReducer.data,
    nameDisplay: state.settingsReducer.nameDisplay,
    darkMode: state.settingsReducer.darkMode
})

const mapDispatch = {
    //mapDispatchToProps
    toggleNameDisplay: (id: string, preferences: IPreferences) => toggleNameDisplay(id, preferences),
    toggleDarkMode: (id: string, preferences: IPreferences) => toggleDarkMode(id, preferences)
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    //backgroundColor: string
    // ^^^ in case I want any other props from other components
}

export default connector(Settings);