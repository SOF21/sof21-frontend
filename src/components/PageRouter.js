import React from 'react';

import BasePage from '../pages/pageTypes/BasePage';

import Account from '../pages/account/Account';
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

//import { FormattedMessage, injectIntl } from 'react-intl'

const utskottPages = {
    '/economy':  Committee,
    '/security': Committee,
    '/services': Committee,
    '/cooperation': Committee,
    '/staff': Committee,
    '/orchestra': Committee,
    '/premises': Committee,
    '/marketing': Committee,
    '/parade': Committee,
    '/it': Committee,
    '/event': Committee,
    '/art_director': Committee,
};

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

// TODO: solve this way more elegantly

const flatten = function(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

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
    navRoutes = flatten(navRoutes)
    var utskottRoutes = Object.keys(committees).map((key) => {
      const PageComp = Committee;
        return(
          <Route
            exact 
            path = {committees[key].path}
            render={(props) => (
              <BasePage
                content={Committee}
              >
                <Committee {...props} committee={key} spots={committees[key].spots} isMobile={this.props.isMobile} />
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
                          {/*<PageHeader
                title={this.props.pages[location.pathname].pageTitle()}
              />

                <PosedPage  className='page-content'>*/}
            <Switch location={location}>
              {utskottRoutes}
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
                key = {'/account/login/verify'}
              />
              <Route
                path = {'/account'}
                render={(props) => (
                  <Account {...props} />
                )}
                key = '/account/'
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
             {/* </PosedPage>

            <PageFooter/>*/}
          </PosedRoutesContainer>
        </PoseGroup>
        );
      }}
    />
    );
  }
}

export default injectIntl(withRouter(connect(null, {openDialog})(PageRouter)));
