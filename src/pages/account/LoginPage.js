import React, { Component } from 'react';

import { FormattedMessage} from 'react-intl'

import { GridCell, GridInner } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';

import { Redirect } from 'react-router-dom';

import LoginForm from '../../components/forms/LoginForm';
import RegisterForm from '../../components/forms/RegisterForm';
import ResetPassEmail from '../../components/forms/ResetPassEmail';

import {connect} from 'react-redux';

import { setTitle } from '../../actions/title';


const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  loading: state.reduxTokenAuth.currentUser.isLoading,
});

class UNCLoginPage extends Component{
  constructor(props){
    super(props)

    this.state = {register: false, regEmail: "", regPass: "", forgotPass: false}
  }

  handleClickRegFromLogin = (email, password) => {
    this.setState({register: true, regEmail: email, regPass: password});
  };

  handleClickForgotPass = () => {
    this.props.dispatch(setTitle('ForgotPass.reset'));
    this.setState({ forgotPass: true });
  }
  

  componentDidMount() {
    this.props.dispatch(setTitle('Account.login'));
  }

  render(){

    var fromPath = null;
    try{
      fromPath = this.props.location.state.from.pathname;
    } catch{
      fromPath = null;
    }

    var content = 
      <LoginForm 
        from={fromPath}
        handleRegister={(email, password) => this.handleClickRegFromLogin(email, password)}
        handleForgotPass={() => this.handleClickForgotPass()}/>;
    if(this.props.loggedIn && fromPath){
      content = <Redirect to={fromPath} />
    } else if(this.props.loggedIn && !fromPath){
      content = <Redirect to='/account/profile' />
    } else if(this.state.register){
      content = <Redirect 
        push 
        to={{pathname: '/account/register',
          state:{from: this.props.location.state.from ? this.props.location.state.from : this.props.location }
        }} 
      />;
    } else if (this.state.forgotPass) {
      content = <Redirect
        push
        to='/account/reset_password'
        />;
    }

    return(
      <GridInner className='login-page'>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <h6 style={{margin: '0'}}> <FormattedMessage id='Login.LoginRequired'/> </h6>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <FormattedMessage id='Login.Login' />
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' >
          <ListDivider/>
        </GridCell>
        {content}
      </GridInner>
    );
  }
}

class UNCResetPassPage extends Component{

  componentDidMount() {
    this.props.dispatch(setTitle('ForgotPass.reset'));
  }

  handleResetCallback = () => {
    this.props.history.goBack();
  }

  render(){
    var fromPath = null;
    try{
      fromPath = this.props.location.state.from.pathname;
    } catch{
      fromPath = null;
    }

    var content = <ResetPassEmail handleResetCallback={this.handleResetCallback} />;
    if(this.props.loggedIn && fromPath){
      content = <Redirect to={fromPath} />
    } else if(this.props.loggedIn && !fromPath){
      content = <Redirect to='/account/profile' />
    }

    return(
      <GridInner className='login-page'>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <h6 style={{margin: '0'}}> <FormattedMessage id='Login.LoginRequired'/> </h6>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <FormattedMessage id='ForgotPass.reset' />
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' >
          <ListDivider/>
        </GridCell>
        {content}
      </GridInner>
    );
  }
}

class UNCRegisterPage extends Component{


  componentDidMount() {
    this.props.dispatch(setTitle('Register.Register'));
  }

  render(){
    var fromPath = null;
    try{
      fromPath = this.props.location.state.from.pathname;
    } catch{
      fromPath = null;
    }

    var content = <RegisterForm />;
    if(this.props.loggedIn && fromPath){
      content = <Redirect to={fromPath} />
    } else if(this.props.loggedIn && !fromPath){
      content = <Redirect to='/account/profile' />
    }

    return(
      <GridInner className='login-page'>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <h6 style={{margin: '0'}}> <FormattedMessage id='Login.LoginRequired'/> </h6>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <FormattedMessage id='Login.Register' />
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' >
          <ListDivider/>
        </GridCell>
        {content}
      </GridInner>
    );
  }
}

export const ResetPasswordPage = connect(mapStateToProps)(UNCResetPassPage);
export const LoginPage =  connect(mapStateToProps)(UNCLoginPage);
export const RegisterPage =  connect(mapStateToProps)(UNCRegisterPage);
