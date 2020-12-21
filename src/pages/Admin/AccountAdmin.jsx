import React, { Component } from 'react';

import Orchestras, { OrchestraNew, OrchestraFindMember, OrchestraSignup, OrchestraSignupChange, OrchestraList, OrchestraCSV } from './orchestra/AdminOrchestras';
import PermissionModifier from './../../components/admin/PermissionModifier';
import TicketPickup from '../../components/admin/TicketPickup';
import { AdminPriv, isAdmin } from '../../components/admin/PermissionHandler';
import SoldSeparately from '../../components/admin/SoldSeparately';
import {  GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

// import { ListDivider } from '@rmwc/list';

// import { SimpleDataTable } from '@rmwc/data-table';

import { Switch, Route,  withRouter } from 'react-router-dom'

import {connect} from 'react-redux';

import { PrivateRoute } from '../../components/admin/PermissionHandler';

import { setTitle, setActiveTab, mapTabToIndex } from '../../actions/title';
import CortegeAdmin from './CortegeAdmin';

class AccountAdmin extends Component{
  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Admin";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  componentDidMount() {
    this.props.dispatch(setTitle('Account.admin'));
    this.props.dispatch(setActiveTab(mapTabToIndex.ADMIN))
  }

  render() {

    return(
      <Switch>
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/orchestras'
          render={(props) => {
            return(
              //List orhcestras
              <Orchestras {...props} />
            );
          }}
          key = {'/admin/orchestras'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/orchestras/new'
          render={(props) => {
            return(
              //List orhcestras
              <OrchestraNew {...props} />
            );
          }}
          key = {'/admin/orchestras/new'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/orchestras/csv'
          render={(props) => {
            return(
              //List orhcestras
              <OrchestraCSV {...props} />
            );
          }}
          key = {'/admin/orchestras/csv'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          path = '/account/admin/orchestras/:id'
          render={(props) => {
            return(
              //List orchestra members
              <OrchestraList {...props} />
            );
          }}
              key = {'/admin/orchestras/'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/signup'
          render={(props) => {
            return(
              //List orchestra member
              <OrchestraFindMember {...props}  />
            );
          }}
          key = {'/admin/signup'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/signup/:id/edit'
          render={(props) => {
            return(
              //List orchestra member
              //<OrchestraFindMember {...props}  />
              <OrchestraSignupChange {...props}/>
            );
          }}
          key = {'/admin/signups/edit'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path = '/account/admin/signup/:id'
          render={(props) => {
            return(
              //List orchestra member
              //<OrchestraFindMember {...props}  />
              <OrchestraSignup {...props}/>
            );
          }}
          key = {'/admin/signups'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.MODIFY_USERS}
          exact
          path = '/account/admin/modifypermissions'
          render={(props) => {
            return(
              //List orchestra member
              //<OrchestraFindMember {...props}  />
              <PermissionModifier />
            );
          }}
          key = {'/admin/modifypermissions'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.TICKETER}
          exact
          path = '/account/admin/ticketpickup'
          render={(props) => {
            return(
              <TicketPickup />
            );
          }}
          key = {'/admin/ticketpickup'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.TICKETER}
          exact
          path = '/account/admin/soldseparately'
          render={(props) => {
            return(
              <SoldSeparately />
            );
          }}
          key = {'/admin/soldseparately'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.TICKETER}
          exact
          path = '/account/admin/soldseparately'
          render={(props) => {
            return(
              <SoldSeparately />
            );
          }}
          key = {'/admin/soldseparately'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path='/account/admin/orchestra'
          render={(props) => {
            return(
              <CortegeAdmin />
            );
          }}
          key = {'/admin/orchestra'}
        />
        <Route
          path = '/account/admin/permissiondenied'
          render={(props) => {
            return(
              //List orchestra member
              <h1> PERMISSION DENIED </h1>
            );
          }}
          key = {'/admin/denied'}
        />
        <PrivateRoute
          admin
          render={(props) => {
            return(
              <BaseAdminPage {...props} {...this.props} />
            );
          }}
          key = {'/admin/base'}
        />

      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  adminPriv: state.reduxTokenAuth.currentUser.attributes.adminPermissions,
});

export default connect(mapStateToProps)(AccountAdmin);

class UNCBaseAdminPage extends Component{

  render() {
    return(
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          {(isAdmin(this.props.adminPriv, AdminPriv.ORCHESTRA_ADMIN)) ?
            <Button raised style={{width: '100%'}} onClick={() => this.props.history.push('admin/orchestras')}> Orkestrar </Button>
            : null
          }
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          {(isAdmin(this.props.adminPriv, AdminPriv.MODIFY_USERS)) ?
            <Button raised style={{width: '100%'}} onClick={() => this.props.history.push('admin/modifypermissions')}> Behörigheter </Button>
            : null
          }
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.TICKETER)) ?
            <Button raised style={{width: '100%'}} onClick={() => this.props.history.push('admin/ticketpickup')}> Biljettuthämtning </Button>
            : null
          }
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.TICKETER)) ?
            <Button raised style={{width: '100%'}} onClick={() => this.props.history.push('admin/soldseparately')}> Biljetter utanför hemsidan </Button>
            : null
          }
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.TICKETER)) ?
            <Button raised style={{width: '100%'}} onClick={() => this.props.history.push('admin/orchestra')}> Hantera orkestrar </Button>
            : null
          }
        </GridCell>
      </GridInner>
    );
  }
}

const BaseAdminPage = withRouter(UNCBaseAdminPage);
