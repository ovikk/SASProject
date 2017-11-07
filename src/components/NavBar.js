import React, { Component } from 'react';
import { Navbar, NavItem, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class NavBar extends Component {

  renderPullRight() {
    if (this.props.logged) {
      return (
        <div>
          <Navbar.Text pullLeft>
            Logged as: {this.props.user}
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/accounts">
              Accounts
            </Link>
          </Navbar.Text>
          <Navbar.Text pullRight>
            <Link to="/auth">
              Log out
            </Link>
          </Navbar.Text>
        </div>
      )
    }
    else {
      return(
        <Navbar.Text pullRight>
          <Link to="/auth">
            Login
          </Link>
        </Navbar.Text>
      )
    }
  }

  render() {
    return (
      <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
          SAS Service
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {this.renderPullRight()}
      <Nav>
        <NavItem>About us</NavItem>
        <NavItem>Contacts</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { logged, user } = auth;
  return {
    logged,
    user
  };
};

export default connect(mapStateToProps, {})(NavBar);
