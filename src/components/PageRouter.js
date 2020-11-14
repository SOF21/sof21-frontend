import React from 'react';

import BasePage from '../pages/pageTypes/BasePage';

import Account from '../pages/account/Account';
import Funkis from '../pages/Funkis';

import Checkout from '../pages/base_pages/Checkout';
import VerifyLiuLogin from './account/VerifyLiuLogin';
import NotFound from '../pages/base_pages/NotFound';
import Committee from '../pages/base_pages/Committee'

import { committees } from '../pages/base_pages/Putte'

import { Switch, Route, withRouter } from 'react-router-dom'

import { PrivateRoute } from '../components/admin/PermissionHandler'
import posed, { PoseGroup } from 'react-pose';

import { openDialog} from '../actions/dialog';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

var qs = require('qs');

const pageSwitchDelay = 600;

const PosedRoutesContainer = posed.div({
  enter:{
    opacity: 1,
    delay: pageSwitchDelay,
    staggerChildren: 175,
    beforeChildren: true
  },
  exit: {
    opacity: 1,
    staggerChildren: 175,
    delay: pageSwitchDelay,
  },
});

class PageRouter extends React.Component{

  scrollToTop(pose){
    if(pose === 'exit'){
      window.scrollTo(0, 0);
    }
  }

  componentDidMount(){
    if(this.props.location.search){
      const params = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      })
      if(params.account_confirmation_success){
        this.props.openDialog(
          this.props.intl.formatMessage({id: 'Register.emailVerifiedTitle'}),
          this.props.intl.formatMessage({id: 'Register.emailVerified'})
        )
        this.props.history.replace(this.props.location.pathname)
      }
    }
  }

  render() {
    const pages = this.props.pages(this.props.intl.formatMessage)
    var navRoutes = Object.keys(pages).map((key) => {
      const PageComp = pages[key];
      if(typeof(PageComp) === 'object') {
        return (Object.keys(PageComp).map((key) => {
          const PageCompInner = PageComp[key];
          return(
            <Route
              exact path = {key}
              render={(props) => (
                <BasePage
                  content={PageCompInner}
                >
                  <PageCompInner {...props} isMobile={this.props.isMobile} />
                </BasePage>
              )}
              key = {key}
            />
          )
        }));
      } else {
        return(
          <Route
            exact path = {key}
            render={(props) => (
              <BasePage
                content={PageComp}
              >
                <PageComp {...props} isMobile={this.props.isMobile} />
              </BasePage>
            )}
            key = {key}
          />
        );
      }
    });
    navRoutes = navRoutes.flat(3)

    //creating routes for all committees 
    const committeeRoutes = Object.keys(committees).map((key) => {
        return(
          <Route
            exact 
            path = {committees[key].path}
            render={(props) => (
              <BasePage
                content={Committee}
              >
                <Committee {...props} committee={key} spots={committees[key].spots} email={committees[key].email} isMobile={this.props.isMobile} />
              </BasePage>
            )}
            key = {key}
          />
        );
      
    });

    return(
    <Route
      render={({ location }) => {
        return(
          <PoseGroup>
            <PosedRoutesContainer
              onPoseComplete={(pose) => this.scrollToTop(pose)}
              key={location.pathname==='/account/login/Verify' ? 'loginVerify' : "route-" + location.pathname.split('/')[1]} //Ugly hack to make rerender account pages from a account redirect after liulogin
              initialPose='exit'
              className='page'
            >
            <Switch location={location}>
              {/* {committeeRoutes} */}
              {navRoutes}
              <Route
                exact
                path = {'/account/login/verify'}
                render={(props) => (
                  <VerifyLiuLogin {...props}/>
                )}
                key = {'/account/login/verify'}
              />
              <PrivateRoute
                exact
                path = {'/checkout'}
                render={(props) => (
                  <BasePage
                    content={Checkout}
                  >
                    <Checkout {...props}/>
                  </BasePage>
                )}
                key = {'/checkout'}
              />
              <Route
                path = {'/account'}
                render={(props) => (
                  <Account {...props} />
                )}
                key = '/account/'
              />
              <Route
                exact
                path={'/funkis'}
                title={'Funkis ansökan'}
                render={props => (
                  <BasePage
                    title='Funkis ansökan'
                  >
                    <Funkis {...props}/>
                  </BasePage>
                  
                )}
                key={'/funkis'}
              />
              <Route
                render={(props) =>(
                  <BasePage
                    content={NotFound}
                  >
                    <NotFound {...props} />
                  </BasePage>
                )}
                key='/NotFound/'
              />
              {/* TODO: Add empty route for 404 handling */}
            </Switch>
          </PosedRoutesContainer>
        </PoseGroup>
        );
      }}
    />
    );
  }
}

export default injectIntl(withRouter(connect(null, {openDialog})(PageRouter)));
