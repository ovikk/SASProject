import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginChanged, passwordChanged, loginUser } from '../../actions';



class AuthForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      onLoginForm: true
    };

    this.renderForm = this.renderForm.bind(this);
    this.onLoginChange = this.onLoginChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLoginLabelClick = this.onLoginLabelClick.bind(this);
    this.onRegisterLabelClick = this.onRegisterLabelClick.bind(this);
  }

  onLoginChange(e) {
    this.props.loginChanged(e.target.value)
  }

  onPasswordChange(e) {
    this.props.passwordChanged(e.target.value)
  }

  onLoginClick(e) {
    e.preventDefault();
    const { login, password } = this.props
    this.props.loginUser({ login, password }, () => {
      this.props.history.push('/accounts')
    });
  }

  onLoginLabelClick() {
    if (!this.state.onLoginForm)
      this.setState({onLoginForm: true})
  }

  onRegisterLabelClick() {
    if (this.state.onLoginForm)
      this.setState({onLoginForm: false})
  }

  renderError() {
    if (this.props.error !== '') {
      return (
        <div className="form-group">
          <div className= "row">
            <div className="col-lg-12">
              <div className="text-center" style={{color: 'red', fontSize: '20px'}}>
                {this.props.error}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderForm() {
    const { onLoginForm } = this.state
    if(onLoginForm) {
      return(
        <form onSubmit={this.onLoginClick}>
          <div className="form-group">
            <input className="form-control" style={styles.panelInput} value={this.props.login} onChange={this.onLoginChange} type="text" placeholder="Username" tabIndex="1"/>
          </div>
          <div className="form-group">
            <input className="form-control" style={styles.panelInput} value={this.props.password} onChange={this.onPasswordChange}  type="password" placeholder="Password" tabIndex="2"/>
          </div>
          {this.renderError()}
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <input className="form-control btn btn-login" style={styles.panelLoginButton} type="submit" value="Log In" tabIndex="4"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <a href="/forgotpassword" tabIndex="5">Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    }
    else {
      return(
        <form>
          <div className="form-group">
            <input className="form-control" style={styles.panelInput} type="text" tabIndex="1" placeholder="Username"/>
          </div>
          <div className="form-group">
            <input className="form-control" style={styles.panelInput} type="email" tabIndex="1" placeholder="Email" />
          </div>
          <div className="form-group">
            <input className="form-control" style={styles.panelInput} type="password" tabIndex="2" placeholder="Password" />
          </div>
          <div className="form-group">
            <input className="form-control" style={styles.panelInput} type="password" tabIndex="2" placeholder=" Confirm Password" />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <input className="form-control btn btn-register" style={styles.panelRegisterButton} type="submit" tabIndex="4" value="Register Now" />
              </div>
            </div>
          </div>
        </form>
      );
    }
  }
  render() {
    return (
      <div className="row" style={styles.body}>
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-login" style={styles.panelLogin}>
            <div className="panel-heading" style={styles.panelHeading}>
              <div className="row">
                <div className="col-xs-6">
                  <a onClick={this.onLoginLabelClick} style={!this.state.onLoginForm?styles.panelHeadingText:styles.PanelHeadingTextActive}>Login</a>
                </div>
                <div className="col-xs-6">
                  <a onClick={this.onRegisterLabelClick} style={this.state.onLoginForm?styles.panelHeadingText:styles.PanelHeadingTextActive}>Register</a>
                </div>
              </div>
              <hr style={styles.panelHr}/>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                    {this.renderForm()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  body: {
    paddingTop: 90,
  },
  panelLogin: {
    borderColor: '#ccc',
    WebkitBoxShadow: '0px 2px 3px 0px rgba(0,0,0,0.2)',
    MozBoxShadow: '0px 2px 3px 0px rgba(0,0,0,0.2)',
    BoxShadow: '0px 2px 3px 0px rgba(0,0,0,0.2)'
  },
  panelHeading: {
    color: '#00415d',
    backgroundColor: '#fff',
    borderColor: '#fff',
    textAlign: 'center'
  },
  panelHeadingText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 15,
  },
  PanelHeadingTextActive: {
    fontWeight: 'bold',
    color: '#029f5b',
    fontSize: 18
  },
  panelHr: {
    marginTop: 10,
    marginBottom: 0,
    clear: 'both',
    border: 0,
    height: 1,
    backgroundImage: '-webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0))'
  },
  panelInput: {
    height: 45,
    border: '1px solid #ddd',
    fontSize: 16
  },
  panelLoginButton: {
    backgroundColor: '#59B2E0',
    outline: 'none',
    color: '#fff',
    fontSize: 14,
    height: 'auto',
    fontWeight: 'normal',
    padding: '14px 0',
    textTransform: 'uppercase',
    borderColor: '#59B2E6'
  },
  panelRegisterButton: {
    backgroundColor: '#1CB94E',
    outline: 'none',
    color: '#fff',
    fontSize: 14,
    height: 'auto',
    fontWeight: 'normal',
    padding: '14px 0',
    textTransform: 'uppercase',
    borderColor: '#1CB94A'
  }
}

const mapStateToProps = ({ auth }) => {
  const { login, password, loading, error } = auth;
  return {
    login,
    password,
    loading,
    error
  };
};

export default connect(mapStateToProps, { loginChanged, passwordChanged, loginUser })(AuthForm);
