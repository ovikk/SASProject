import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthForm from './components/auth/AuthForm';
import AccountList from './components/accounts/AccountList';
import NavBar from './components/NavBar';
import LandingComponent from './components/landing/LandingComponent';

import { isLoggedIn } from './actions'

class App extends Component {

  componentDidMount() {
    this.props.isLoggedIn()
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/accounts" component={AccountList} />
          <Route path="/auth" component={AuthForm} />
          <Route path="/" component={LandingComponent} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(null, { isLoggedIn })(App));
