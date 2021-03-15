import React, { Component } from 'react';

import { Switch, Route, Link, Redirect } from 'react-router-dom'

import { FormattedMessage, injectIntl } from 'react-intl'
import AdministrativePageHeader from '../pageTypes/AdministrativePageHeader';
import PageFooter from '../pageTypes/PageFooter';

import { PrivateRoute, isAnyAdmin  } from '../../components/admin/PermissionHandler';

import Profile from './Profile';
import Cortege from './cortege';
import Funkis from './Funkis'
import Admin from '../Admin/AccountAdmin';
import Orchestra from './orchestra/AccountOrchestra';
import Purchases from './Purchases';
import { LoginPage, RegisterPage, ResetPasswordPage } from './LoginPage';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import {
  List,
  ListItem,
  ListItemGraphic,
} from '@rmwc/list';
import { Icon } from '@rmwc/icon';


import posed from 'react-pose';

import {connect} from 'react-redux';

import { setTitle, mapTabToIndex, setActiveTab } from '../../actions/title';
import ChangePassword from '../../components/forms/ChangePassword';

const mapStateToProps = state => ({
  adminPriv: state.reduxTokenAuth.currentUser.attributes.adminPermissions,
  title: state.title.title
});

const PosedPage = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

const sofHeart = <Icon icon='https://s3-eu-west-1.amazonaws.com/lintek-sof/webapp/lintek/SOF_hjarta.png'/>;

class Account extends Component{
  constructor(props) {
    super(props);

    this.intl = this.props.intl;
  }

  changeTitle = (id) => {
    console.log(id);
    this.props.dispatch(setTitle(id));
    this.props.dispatch(setActiveTab(mapTabToIndex.ACCOUNT))
  }

  render() {
    const menuListItems = ['Profil', 'Orkester', 'Admin'].map((key) =>(
      <ListItem
        key={"acc-menu-" + key}
        onClick={() => this.pressListLink(key)}
      >
        <h4>
          {key}
        </h4>
      </ListItem>
    ));

    var { title } = this.props;

    if (!title) title = 'Account.profile';

    return(
      <React.Fragment>
      <AdministrativePageHeader
        color='Red'
        title={<FormattedMessage id={title}/>}
      />
      <PosedPage className='base-page-content' >
        <div className='administrative-page base-page-content'>
          <Grid className="administrative-outer-grid">
            <GridInner className="administrative-inner-grid">
              <GridCell desktop='3' className='hide-mobile account-desktop-menu' >
                <List>
                  <ListItem tag={Link} to='/account/account'>
                    <ListItemGraphic icon={sofHeart}/>
                    <h4>
                      <FormattedMessage id='Account.account'/>
                    </h4>
                  </ListItem>
                  <ListItem tag={Link} to='/account/purchases'>
                    <ListItemGraphic icon={sofHeart}/>
                    <h4>
                      <FormattedMessage id='Account.purchases'/>
                    </h4>
                  </ListItem>
                  <ListItem tag={Link} to='/account/orchestra'>
                    <ListItemGraphic icon={sofHeart}/>
                    <h4>
                      <FormattedMessage id='Account.orchestra'/>
                    </h4>
                  </ListItem>
                  <ListItem tag={Link} to='/account/cortege'>
                    <ListItemGraphic icon={sofHeart}/>
                    <h4>
                      <FormattedMessage id='Account.cortege'/>
                    </h4>
                  </ListItem>
                  <ListItem tag={Link} to='/account/funkis'>
                    <ListItemGraphic icon={sofHeart}/>
                    <h4>
                      <FormattedMessage id='Account.funkis'/>
                    </h4>
                  </ListItem>
                {isAnyAdmin(this.props.adminPriv) ? <ListItem tag={Link} to='/account/admin'>
                    <ListItemGraphic icon={sofHeart}/>
                    <h4>
                      <FormattedMessage id='Account.admin'/>
                    </h4>
                  </ListItem> : null}
                </List>
              </GridCell>
              <GridCell desktop='9' tablet='8' phone='4'>
                <Switch>
                  <PrivateRoute
                    path = {'/account/account'}
                    render={(props) => {
                      return(
                        <Profile {...props} isMobile={this.props.isMobile}/>
                      );
                    }}
                    key = {'/account/account'}
                  />


                  <Route
                    state = {{title: 'Login'}}
                    path = {'/account/login'}
                    render={(props) => (
                      <LoginPage {...props} />
                    )}
                    key = {'/account/login'}
                  />
                  <Route
                    path={'/account/reset_password/new'}
                    render={ (props) => (
                      <ChangePassword {...props} />
                    )}
                    key={'/account/reset_password/new'}
                    exact
                  />
                  <Route
                    path={'/account/reset_password'}
                    render={ (props) => (
                      <ResetPasswordPage {...props} />
                    )}
                    key={'/account/reset_password'}
                    exact
                  />
                  <Route
                    path = {'/account/register'}
                    render={(props) => (
                      <RegisterPage {...props} />
                    )}
                    key = {'/account/register'}
                  />
                  <Route
                    path = {'/account/admin'}
                    render={(props) => (
                      <Admin {...props} />
                    )}
                    key = {'/account/admin'}
                  />
                  <PrivateRoute
                    path = {'/account/orchestra'}
                    render={(props) => (
                      <Orchestra {...props} />
                    )}
                    key = {'/account/orchestra'}
                  />
                  <PrivateRoute
                    path = {'/account/cortege'}
                    render={(props) => (
                      <Cortege {...props} />
                    )}
                    key = {'/account/cortege'}
                  />
                  <PrivateRoute
                    path = {'/account/purchases'}
                    render={(props) => (
                      <Purchases {...props} />
                    )}
                    key = {'/account/purchases'}

                  />
                  <PrivateRoute
                    path = {'/account/funkis'}
                    render={(props) => (
                      <Funkis {...props} />
                    )}
                    key = {'/account/funkis'}

                  />
                  <PrivateRoute
                    render={(props) => (
                      <Redirect to='/account/account' />
                    )}
                    key = {'/account/base'}
                  />

                </Switch>
              </GridCell>
            </GridInner>
          </Grid>
        </div>
      </PosedPage>

      <PageFooter/>
    </React.Fragment>
    );
  }
}

export default injectIntl(connect(mapStateToProps)(Account));
