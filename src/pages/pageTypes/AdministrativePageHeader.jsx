import React, { Component } from 'react';

import { isAnyAdmin  } from '../../components/admin/PermissionHandler';

import { FormattedMessage, injectIntl } from 'react-intl'

import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { TabBar, Tab } from '@rmwc/tabs';
import { ThemeProvider } from '@rmwc/theme';

import { Switch, Route, Link } from 'react-router-dom'

import posed from 'react-pose';

import {connect} from 'react-redux';

const mapStateToProps = state => ({
  adminPriv: state.reduxTokenAuth.currentUser.attributes.adminPermissions,
  activeTab: state.title.activeTab  
});

const PosedHeaderTitle = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

const PosedHeaderImage= posed.div({
  enter: {opacity: 1},
  exit: {opacity: 0 }
});

class AdministrativePageHeader extends Component{

  render() {
    const activeTabIndex = this.props.activeTab !== undefined ? this.props.activeTab : 0

    return(
      <React.Fragment>
        <div className='administrative-page-header'>
          <TopAppBarFixedAdjust/>
          <PosedHeaderImage className='base-page-header-image'>
            {/* <img 
              async='on'
              className='base-page-header-image-left-dots hide-mobile' 
              src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/header-hero-edge.png'
              alt=''
            />
            <img 
              async='on'
              className='base-page-header-image-right-dots hide-mobile' 
              src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/header-hero-edge.png'
              alt=''
            /> */}
          </PosedHeaderImage>
          <PosedHeaderTitle className='base-page-header-content'>
            <ThemeProvider 
              className='hide-desktop'
              style={{width: '100%'}}
              options={{
                primary: 'white',
            }}>
              <TabBar
                activeTabIndex={activeTabIndex}
                // onActivate={evt => this.props.setActiveTab(evt.detail.index)}
                style={{width: '100%'}}
                className='administrative-tabs'
              >
                <Tab tag={Link} to='/account/account'> <FormattedMessage id='Account.account' /> </Tab>
                <Tab tag={Link} to='/account/purchases'> <FormattedMessage id='Account.purchases' /> </Tab>
                <Tab tag={Link} to='/account/orchestra'> <FormattedMessage id='Account.orchestra' /> </Tab>
                {isAnyAdmin(this.props.adminPriv) ? <Tab tag={Link} to='/account/admin'> Admin </Tab> : null}
              </TabBar>
            </ThemeProvider>
            <div className='administrative-page-header-title hide-mobile'>
              <h1 className='hide-mobile'>
                {this.props.title}
              </h1>
            </div>
          </PosedHeaderTitle>
        </div>
      </React.Fragment>
    );
  }
}

export default injectIntl(connect(mapStateToProps)(AdministrativePageHeader));
