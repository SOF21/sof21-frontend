import React, { Component } from 'react';

import { verifyToken } from '../../redux-token-auth-config';
import { withRouter, Redirect } from 'react-router-dom';

import {connect} from 'react-redux';

var qs = require('qs');

function storeLiuLogin(props) {
  return new Promise( (resolve, reject) =>{
  });
}

class VerifyLiuLogin extends Component{
  constructor(props){
    super(props)

    this.hasVerified = false;
  }

  verify = (params) =>{
    const tokenParams = {
      'access-token': params.auth_token,
      client: params.client_id,
      uid: params.uid
    }
    this.props.verifyToken(tokenParams)
      .then( (response) => {
        this.hasVerified = true;
      } )
      .catch( (error) => {
      } )
  }


  render() {
    const params = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })

    var display = null;

    if(!this.props.loggedIn && !this.props.isLoading && !this.hasVerified){
      this.verify(params);
    } else if(this.props.loggedIn && !this.props.isLoading){
      //this.props.history.push(params.redirect_url);
      display = <Redirect to={params.redirect_url} />;
    }

    return(
      <React.Fragment>
        {display}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.reduxTokenAuth.currentUser.isLoading,
    loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  };
}

export default withRouter(connect(mapStateToProps, {verifyToken})(VerifyLiuLogin));
