import * as React from "react";
import "../styles/App.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { connect, ConnectedProps } from 'react-redux';
import { checkToken } from '../store/auth/actions';

import Nav from "./partials/Nav";
import Back from "./partials/Back";

import Home from './Home';
import Settings from "./Settings";
import Profile from "./Profile";
import Post from './Post';
import Start from './Start';
import SignUp from './SignUp';
import LogIn from './LogIn';

class App extends React.Component<Props, any> {

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

  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    this.checkDarkMode();
    return(
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/Rats">
              <Nav dark/>
              <Home />
            </Route>
            <Route path="/Rats/settings">
              <Nav />
              <Back />
              <Settings />
            </Route>
            <Route path="/Rats/profile">
              <Nav />
              <Back />
              <Profile />
            </Route>
            <Route path="/Rats/start">
              <Start />
            </Route>
            <Route path="/Rats/signup">
              <Back to="start"/>
              <SignUp />
            </Route>
            <Route path="/Rats/login">
              <Back to="start"/>
              <LogIn />
            </Route>
            <Route path="/Rats/:id">
              <Nav />
              <Back />
              <Post />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

interface RootState {
  //interface for what I want from a store
  settingsReducer: {
      nameDisplay: boolean;
      darkMode: boolean;
  }
}

const mapState = (state: RootState) => ({
  //mapStateToProps
  nameDisplay: state.settingsReducer.nameDisplay,
  darkMode: state.settingsReducer.darkMode
})

const mapDispatch = {
  checkToken: () => checkToken()
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  //backgroundColor: string
  // ^^^ in case I want any other props from other components
}

export default connector(App);