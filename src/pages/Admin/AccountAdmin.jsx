import React, { Component } from 'react';

import Orchestras, { OrchestraNew, OrchestraFindMember, OrchestraSignup, OrchestraSignupChange, OrchestraList, OrchestraCSV } from './orchestra/AdminOrchestras';
import PermissionModifier from './../../components/admin/PermissionModifier';
import TicketPickup from '../../components/admin/TicketPickup';
import { AdminPriv, isAdmin } from '../../components/admin/PermissionHandler';
import SoldSeparately from '../../components/admin/SoldSeparately';
import CortegeAdmin from './cortege';
import FunkisAdmin from './funkis/funkisApplications'
import FunkisCheckIn from './funkis/funkisCheckIn'
import FunkisTypes from './funkis/funkisTypes'
import FunkisTypeData from './funkis/funkisTypes/FunkisTypeData';
import FunkisTypeCreate from './funkis/funkisTypes/FunkisTypeCreate'
import FunkisTimeslotCreate from './funkis/funkisTypes/FunkisTimeslotCreate';
import OrderInfo from './OrderInfo'

import Header from '../../components/page_components/NiceHeader';

import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';

// import { SimpleDataTable } from '@rmwc/data-table';

import { Switch, Route, withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import { PrivateRoute } from '../../components/admin/PermissionHandler';

import { setTitle, setActiveTab, mapTabToIndex } from '../../actions/title';
class AccountAdmin extends Component {
  static pageTitle() {
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Admin";
  }

  static pageNavTitle() {
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  componentDidMount() {
    this.props.dispatch(setTitle('Account.admin'));
    this.props.dispatch(setActiveTab(mapTabToIndex.ADMIN))
  }

  render() {

    return (
      <Switch>
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path='/account/admin/orchestras'
          render={(props) => {
            return (
              //List orhcestras
              <Orchestras {...props} />
            );
          }}
          key={'/admin/orchestras'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path='/account/admin/orchestras/new'
          render={(props) => {
            return (
              //List orhcestras
              <OrchestraNew {...props} />
            );
          }}
          key={'/admin/orchestras/new'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path='/account/admin/orchestras/csv'
          render={(props) => {
            return (
              //List orhcestras
              <OrchestraCSV {...props} />
            );
          }}
          key={'/admin/orchestras/csv'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          path='/account/admin/orchestras/:id'
          render={(props) => {
            return (
              //List orchestra members
              <OrchestraList {...props} />
            );
          }}
          key={'/admin/orchestras/'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path='/account/admin/signup'
          render={(props) => {
            return (
              //List orchestra member
              <OrchestraFindMember {...props} />
            );
          }}
          key={'/admin/signup'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path='/account/admin/signup/:id/edit'
          render={(props) => {
            return (
              //List orchestra member
              //<OrchestraFindMember {...props}  />
              <OrchestraSignupChange {...props} />
            );
          }}
          key={'/admin/signups/edit'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path='/account/admin/signup/:id'
          render={(props) => {
            return (
              //List orchestra member
              //<OrchestraFindMember {...props}  />
              <OrchestraSignup {...props} />
            );
          }}
          key={'/admin/signups'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.MODIFY_USERS}
          exact
          path='/account/admin/modifypermissions'
          render={(props) => {
            return (
              //List orchestra member
              //<OrchestraFindMember {...props}  />
              <PermissionModifier />
            );
          }}
          key={'/admin/modifypermissions'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.TICKETER}
          exact
          path='/account/admin/ticketpickup'
          render={(props) => {
            return (
              <TicketPickup />
            );
          }}
          key={'/admin/ticketpickup'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.TICKETER}
          exact
          path='/account/admin/soldseparately'
          render={(props) => {
            return (
              <SoldSeparately />
            );
          }}
          key={'/admin/soldseparately'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.TICKETER}
          exact
          path='/account/admin/soldseparately'
          render={(props) => {
            return (
              <SoldSeparately />
            );
          }}
          key={'/admin/soldseparately'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.TICKETER}
          exact
          path='/account/admin/orderinfo'
          render={() => {
            return (
              <OrderInfo />
            );
          }}
          key={'/admin/funkisar'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path='/account/admin/cortege'
          render={(props) => {
            return (
              <CortegeAdmin />
            );
          }}
          key={'/admin/cortege'}
        />
        <PrivateRoute
          admin
          requiredAccess={2}
          exact
          path='/account/admin/funkisar'
          render={(props) => {
            return (
              <FunkisAdmin />
            );
          }}
          key={'/admin/funkisar'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.Funkis}
          exact
          path='/account/admin/funkischeckin'
          render={(props) => {
            return (
              <FunkisCheckIn />
            );
          }}
          key={'/admin/funkisar'}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.FUNKIS}
          exact
          path='/account/admin/funkischeckin/checkin'
          render={(props) => {
            return (
              <FunkisCheckIn />
            )
          }}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.FUNKIS}
          exact
          path='/account/admin/funkistypes'
          render={(props) => {
            return (
              <FunkisTypes />
            )
          }}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.FUNKIS}
          exact
          path='/account/admin/funkistypes/new'
          render={(props) => {
            return (
              <FunkisTypeCreate {...props} />
            )
          }}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.FUNKIS}
          exact
          path='/account/admin/funkistypes/:id/update'
          render={(props) => {
            return (
              <FunkisTypeCreate {...props} />
            )
          }}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.FUNKIS}
          exact
          path='/account/admin/funkistypes/:id'
          render={(props) => {
            return (
              <FunkisTypeData {...props} />
            )
          }}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.FUNKIS}
          exact
          path='/account/admin/funkistypes/:id/newshift'
          render={(props) => {
            return (
              <FunkisTimeslotCreate {...props} />
            )
          }}
        />
        <PrivateRoute
          admin
          requiredAccess={AdminPriv.FUNKIS}
          exact
          path='/account/admin/funkistypes/:id/updateshift/:shiftId'
          render={(props) => {
            return (
              <FunkisTimeslotCreate {...props} />
            )
          }}
        />
        <Route
          path='/account/admin/permissiondenied'
          render={(props) => {
            return (
              //List orchestra member
              <h1> PERMISSION DENIED </h1>
            );
          }}
          key={'/admin/denied'}
        />
        <PrivateRoute
          admin
          render={(props) => {
            return (
              <BaseAdminPage {...props} {...this.props} />
            );
          }}
          key={'/admin/base'}
        />

      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  adminPriv: state.reduxTokenAuth.currentUser.attributes.adminPermissions,
});

export default connect(mapStateToProps)(AccountAdmin);

class UNCBaseAdminPage extends Component {

  render() {
    return (
      <GridInner>
        <GridCell phone="4" tablet="8" desktop='12' >
          <Header tag="h6">
            Orkester
          </Header>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          {(isAdmin(this.props.adminPriv, AdminPriv.ORCHESTRA_ADMIN)) ?
            <Button raised style={{ width: '100%' }} onClick={() => this.props.history.push('admin/orchestras')}> Orkestrar </Button>
            : null
          }
        </GridCell>
        <GridCell phone="4" tablet="8" desktop='12' >
          <Header tag="h6">
            Funkis
          </Header>
        </GridCell>
        <GridCell desktop='4' tablet='8' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.FUNKIS)) ?
            <Button raised style={{ width: '100%' }} onClick={() => this.props.history.push('admin/funkistypes')}> Hantera funkistyper </Button>
            : null
          }
        </GridCell>
        <GridCell desktop='4' tablet='4' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.TICKETER)) ?
            <Button raised style={{ width: '100%' }} onClick={() => this.props.history.push('admin/funkisar')}> Hantera funkisar </Button>
            : null
          }
        </GridCell>
        <GridCell desktop='4' tablet='4' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.FUNKIS)) ?
            <Button raised style={{ width: '100%' }} onClick={() => this.props.history.push('admin/funkischeckin')}> Checka in funkisar </Button>
            : null
          }
        </GridCell>
        <GridCell phone="4" tablet="8" desktop='12' >
          <Header tag="h6">
            Kårtege
          </Header>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.TICKETER)) ?
            <Button raised style={{ width: '100%' }} onClick={() => this.props.history.push('admin/cortege')}> Hantera Kårtege </Button>
            : null
          }
        </GridCell>
        <GridCell phone="4" tablet="8" desktop='12' >
          <Header tag="h6">
            Biljetter
          </Header>
        </GridCell>
        <GridCell desktop='6' tablet='4' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.TICKETER)) ?
            <Button raised style={{ width: '100%' }} onClick={() => this.props.history.push('admin/ticketpickup')}> Biljettuthämtning </Button>
            : null
          }
        </GridCell>
        <GridCell desktop='6' tablet='4' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.TICKETER)) ?
            <Button raised style={{ width: '100%' }} onClick={() => this.props.history.push('admin/soldseparately')}> Biljetter utanför hemsidan </Button>
            : null
          }
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>

          {(isAdmin(this.props.adminPriv, AdminPriv.TICKETER)) ?
            <Button raised style={{ width: '100%' }} onClick={() => this.props.history.push('admin/orderinfo')}> Ordrar </Button>
            : null
          }
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <ListDivider style={{ width: '100%' }} />
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          {(isAdmin(this.props.adminPriv, AdminPriv.MODIFY_USERS)) ?
            <Button raised style={{ width: '100%' }} onClick={() => this.props.history.push('admin/modifypermissions')}> Behörigheter </Button>
            : null
          }
        </GridCell>

      </GridInner>
    );
  }
}

const BaseAdminPage = withRouter(UNCBaseAdminPage);
