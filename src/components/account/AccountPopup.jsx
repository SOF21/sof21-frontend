import React, { Component } from 'react';

import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import ResetPassEmail from '../forms/ResetPassEmail';

import { signOutUser } from '../../redux-token-auth-config'

import { setAccountPopupOpen } from '../../actions/login';

import { getUserUuid } from '../../api/userCalls';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenuSurface } from '@rmwc/menu';
import { CircularProgress } from '@rmwc/circular-progress';

import ScrollLock, { TouchScrollable } from 'react-scrolllock';

import { withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import posed from 'react-pose/lib/index';
import { FormattedMessage } from 'react-intl';

import { IconButton } from '@rmwc/icon-button';

import QRCode from "qrcode.react";


const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
  isOpen: state.login.accountPopupOpen,
});

class UNCDesktopAccountPopup extends React.PureComponent {

  setPopupState = (state) => {
    this.props.setAccountPopupOpen(state);
  }

  render(){

    return(
      <SimpleMenuSurface
        className='login-popup-surface'
        //open={this.props.isOpen}
        //onOpen={()=>this.setPopupState(true)}
        //onClose={()=>this.setPopupState(false)}
        handle={<TopAppBarActionItem icon='account_circle'/>}
      >
        <LoginContent {...this.props}/>
      </SimpleMenuSurface>
    );
  }
}

export const DesktopAccountPopup = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser}) (UNCDesktopAccountPopup));

const MobileAccountModal = posed.div({
  open:{
    height: 'auto',
    applyAtEnd: {overflow: 'auto'},
  },
  closed:{
    height: '0',
    applyAtStart: {overflow: 'hidden'},
  }
});

const MobileAccountScrim = posed.div({
  open:{
    opacity: 1,
    applyAtStart: {display: 'initial'},
  },
  closed:{
    opacity: 0,
    applyAtEnd: {display: 'none'},
  }
});

export class UNCMobileAccountPopup extends Component {

  setPopupState = (state) => {
      this.props.setAccountPopupOpen(state);
  }

  componentDidUpdate() {
    window.onpopstate = e => { 
      if(this.props.isOpen) {
        this.props.setAccountPopupOpen(false);
        window.history.go(1)
      }
    }
  }

  render(){
    return(
      <React.Fragment>
        <IconButton 
          style={{marginTop: '-6px'}}
          icon='account_circle'
          onClick={()=>this.setPopupState(true)}
        />
          <ScrollLock isActive={this.props.isOpen}/>
          <TouchScrollable>
            <MobileAccountModal
              className='mobile-account-modal'
              pose={this.props.isOpen ? 'open' : 'closed'}
            >
              <LoginContent {...this.props}/>
            </MobileAccountModal>
          </TouchScrollable>
        <MobileAccountScrim
          className='mobile-account-scrim'
          pose={this.props.isOpen ? 'open' : 'closed'}
          onClick={() => this.setPopupState(false)}
        />
      </React.Fragment>
    );
  }
}
export const MobileAccountPopup = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser})(UNCMobileAccountPopup));

class UNCLoginContent extends Component{
  constructor(props){
    super(props)

    this.state = {register: false, regEmail: "", regPass: "", forgotPass: false}
  }

  handleClickRegFromLogin = (email, password) => {
    this.setState({register: true, regEmail: email, regPass: password});
  };

  handleClickForgotPassFromLogin  = () => {
    this.setState( {forgotPass: true });
  };

  handleResetCallback = () => {
    this.setState( {forgotPass: false});
  }


  render(){
    var content = 
      <LoginForm 
        from={this.props.from} 
        handleRegister={(email, password) => this.handleClickRegFromLogin(email, password)}
        handleForgotPass={() => this.handleClickForgotPassFromLogin()}
      />;

    if(this.props.loggedIn && !this.props.from){
      content = <Account {...this.props}/>;
    } else if(this.props.loggedIn && this.props.from){
      content = <Redirect to={this.props.from} />
    } else if(this.state.register){
      content = <RegisterForm/>;
    } else if(this.state.forgotPass) {
      content = <ResetPassEmail handleResetCallback={this.handleResetCallback}/>;
    }

    var logInBar = null
    
    if(!this.props.loggedIn && !this.state.register && !this.state.forgotPass){
      logInBar = (
        <Grid style={{paddingBottom: '0'}}>
            <GridInner>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <FormattedMessage id='Login.Login'/>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' >
                <ListDivider/>
              </GridCell>
              
            </GridInner>
        </Grid>
      );

    } else if(!this.props.loggedIn && this.state.register){
      logInBar = (
        <Grid style={{paddingBottom: '0'}}>
            <GridInner>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <Button
                  style={{width: '30%', justifySelf: 'flex-start'}}
                  onClick={()=>this.setState({register: false})}
                >
                  <FormattedMessage id='Register.back'/>
                </Button>

                
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <FormattedMessage id='Register.Register'/>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' >
                  <ListDivider/>
              </GridCell>
            </GridInner>
        </Grid>
      );


    } else if(!this.props.loggedIn && this.state.forgotPass) {
      logInBar = (
        <Grid style={{paddingBottom: '0'}}>
            <GridInner>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <Button
                  style={{width: '30%', justifySelf: 'flex-start'}}
                  onClick={()=>this.setState({forgotPass: false})}
                >
                  <FormattedMessage id='Register.back'/>
                </Button>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <FormattedMessage id='ForgotPass.reset'/>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' >
                <ListDivider/>
              </GridCell>
            </GridInner>
        </Grid>
      );
    }

    return(
      <React.Fragment>
        {logInBar}
        <Grid>
          <GridInner>
            {content}
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }

}

export const LoginContent = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser})(UNCLoginContent));

class UNCAccount extends Component{
  constructor(props) {
    super(props);
    this.state = {uuid: null}
  }

  componentDidMount(){
    getUserUuid()
    .then( response =>{
      this.setState({uuid: response.data.uuid});
    })
  }

  handleClickProfile = () => {
    this.props.history.push('/account/account');
    this.props.setAccountPopupOpen(false);
  }

  handleLogout = () => {
    this.props.signOutUser()
      .then( (response) => {
      }).catch( (error) => {
      });
  }

  render(){
    return(
      <React.Fragment>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              {this.state.uuid ? 
                  <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#FF0000"
                    level="Q"
                    className='user-code'
                    size={256}
                    value={this.state.uuid}
                    renderAs={"canvas"}
                  />
                  : 
                  <CircularProgress size="xlarge" />
              }
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <h4 style={{margin: '0'}}> {this.props.name} </h4>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised onClick={() => this.handleClickProfile()}> 
                <FormattedMessage id='Account.myAccount'/>
              </Button>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised onClick={() => this.handleLogout()}> 
                <FormattedMessage id='Account.logOut'/>
              </Button>
            </GridCell>
      </React.Fragment>
    );
  }
}
export const Account = withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser})(UNCAccount));
