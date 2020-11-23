import React, { Component } from 'react';

import { Switch, Route, Redirect} from 'react-router-dom';

import { connect } from 'react-redux';

export const AdminPriv = {
  NONE: 0,
  ALL: 1,
  ORCHESTRA_ADMIN: 2,
  LIST_ORCHESTRA_SIGNUPS: 4,
  MODIFY_ARTICLES: 8,
  LIST_USERS: 16,
  MODIFY_USERS: 32,
  DELETE_USERS: 64,
  LIST_CORTEGE_APPL: 128,
  APPRIVE_CORTEGE_APPL: 256,
  LIST_FUNKIS_APPL: 512,
  ANALYS: 1028,
  TICKETER: 2048,
  EDITOR: 4096
};

const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  adminPriv: state.reduxTokenAuth.currentUser.attributes.adminPermissions,
  loading: state.reduxTokenAuth.currentUser.isLoading,
});

export function isAnyAdmin(adminPrivs){
  return adminPrivs && adminPrivs !== AdminPriv.NONE;
}

export function isAdmin(adminPrivs, checkType){
  return adminPrivs && ((adminPrivs & checkType) === checkType || (adminPrivs & AdminPriv.ALL) === AdminPriv.ALL);
}

class UNCPrivateRoute extends Component{ 

  hasAccess = () => {
    if(!this.props.loggedIn){
      return false;
    }
    if(this.props.admin && this.props.adminPriv === AdminPriv.NONE){
      return false;
    }
    if(this.props.requiredAccess && !isAdmin(this.props.adminPriv, this.props.requiredAccess)){
      return false;
    }
    return true;
  };

  render(){
    const {render, ...rest} = this.props;

    return(
      <Route
        {...rest}
        render={(props) =>
          this.props.loggedIn ? (
            this.hasAccess() ?(
              <React.Fragment>
                {render(props)}
              </React.Fragment>
            ) : (
              <Redirect
                to={{
                  pathname: "/account/admin/permissiondenied",
                  state: { from: this.props.location }
                }}
              />
            )
          ) : !this.props.loading ? ( // Makes sure that login verifications is done before redirect
            <Redirect
              to={{
                pathname: "/account/login",
                state: { from: this.props.location }
              }}
            />
          ) : null // Meaning we render nothing while 'logging in'
        }
      />

    );
  }
}

export const PrivateRoute = connect(mapStateToProps)(UNCPrivateRoute);
