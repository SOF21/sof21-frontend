import React, { Component } from 'react';

import AllOrchestras from '../../../components/admin/orchestra/AllOrchestras';
import OrchestraCreation from '../../../components/forms/OrchestraCreation';
import GetUser from '../../../components/admin/GetUser';
import OrchestraMemReg from '../../../components/forms/OrchestraMemReg';
import OrchestraMemRegShort from '../../../components/forms/OrchestraMemRegShort';
import AnswerSummary from '../../../components/account/orchestra/AnswerSummary';

import { getOrchestraSignup, deleteOrchestraSignup, updateOrchestraSignup, getOrchestra } from '../../../api/orchestraCalls';
import { getUser } from '../../../api/userCalls';
import { getAnniversaryCSV, getArticlesCSV, getAllergiesCSV, getOverlapCSV } from '../../../api/csvCalls';
import { openDialog} from '../../../actions/dialog';

import { CSVLink } from "react-csv";

import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';
import { Card, CardPrimaryAction } from '@rmwc/card';
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell,
} from '@rmwc/data-table';
import { CircularProgress } from '@rmwc/circular-progress';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import { withRouter } from 'react-router-dom';

import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';


class Orchestras extends Component{
  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Din profil";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  render() {
    return(
      <GridInner>
        {this.props.location.state ?
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h5 style={{margin: '0px'}}> {this.props.location.state.message} </h5>
          </GridCell> : null
        }
        <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
          <Button raised style={{width: '100%'}}
            onClick={() => this.props.history.push('/account/admin/orchestras/new')}
          >
            Skapa ny orkester
          </Button>
        </GridCell>
        <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
          <Button raised style={{width: '100%'}}
            onClick={() => this.props.history.push('/account/admin/signup')}
          >
            Hitta användare
          </Button>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <Button raised style={{width: '100%'}}
            onClick={() => this.props.history.push('/account/admin/orchestras/csv')}
          >
            Hämta CSV data
          </Button>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <AllOrchestras/>
        </GridCell>
      </GridInner>
    );
  }
}

export default withRouter(connect()(Orchestras));

class UNCOrchestraNew extends Component{

  render(){
    return(
      <React.Fragment>
        <OrchestraCreation/>
      </React.Fragment>
    );
  }
}

export const OrchestraNew = withRouter(UNCOrchestraNew);

class UNCOrchestraFindMember extends Component{
  constructor(props){
    super(props);

    this.state = {user: null}
  }

  getUserCallback = (user) =>{
    this.setState({user: user});
  }

  render(){


    const orchestra_list = this.state.user ? (
      this.state.user.orchestra_signup.map( (orch) => (
        <GridCell desktop='12' tablet='8' phone='4' key={orch.id}>
          <SimpleSignupCard name={orch.orchestra.name} id={orch.id}/>
        </GridCell>
      ))
    ): null;

    const orchestraInfo = this.state.user ? (
      <React.Fragment>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <ListDivider style={{width: '100%'}}/>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <h4 style={{margin: '0px'}}> {this.state.user.display_name}'s orkestrar </h4>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <GridInner style={{width: '100%'}}>
            {orchestra_list}
          </GridInner>
        </GridCell>
      </React.Fragment>
    ) : null

    return(
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <GetUser getUserCallback={this.getUserCallback}/>
          </GridCell>
          {orchestraInfo}
        </GridInner>
      </React.Fragment>
    )
  }

}

export const OrchestraFindMember = withRouter(UNCOrchestraFindMember);

const UNCSimpleSignupCard = (props) => {
  return (
    <Card style={{ width: '100%' }}>
      <CardPrimaryAction onClick={() => props.history.push('/account/admin/signup/' + props.id)}>
        <div >
          <h5> {props.name} </h5>
        </div>
      </CardPrimaryAction>
    </Card>
  )
}

const SimpleSignupCard = withRouter(UNCSimpleSignupCard);

class UNCOrchestraSignup extends Component{
  constructor(props){
    super(props);

    this.state = {error: null, signup: null, user:null, deleteDialog: false}
  }


  componentDidMount(){
    getOrchestraSignup(this.props.match.params.id)
      .then( response =>{
        this.setState({signup: response.data})
        getUser(response.data.user_id)
          .then( response => {
            this.setState({user: response.data})
          })
          .catch( error =>{
            this.setState({error: "" + error})
          })
      })
      .catch( error => {
        this.setState({error: "" + error})
      })
  }

  deleteSignup = () => {
    deleteOrchestraSignup(this.state.signup.id)
      .then( response => {
        this.props.history.goBack();
        this.props.openDialog(
          'Registrering borttagen!',
          this.state.user.email + "'s registrering till " + this.state.signup.orchestra.name + ' har tagits bort'
        );
      })
      .catch( error => {
        this.props.openDialog(
          'Borttagning misslyckades',
          error.data
        );
      })
  }

  render(){
    if(this.state.error){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            {this.state.error}
          </GridCell>
        </GridInner>
      )
    }
    if (!this.state.signup || !this.state.user){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <CircularProgress size="xlarge" />
          </GridCell>
        </GridInner>
      );
    }
    const sortedArticles = this.state.signup.orchestra_articles.sort((a, b) => a.kind - b.kind)

    const isTicketPickupOrc = !(sortedArticles === undefined || sortedArticles.length === 0);

    return(
      <React.Fragment>
        <Dialog
          open={this.state.deleteDialog}
          onClose={evt => {
            this.setState({deleteDialog: false})
          }}
        >
        <DialogTitle>ÄR DU SÄKER?</DialogTitle>
        <DialogContent>
          Vill du verkligen ta bort <b>{this.state.user.email}</b>'s anmälan till <b>{this.state.signup.orchestra.name}</b>?

          <br/><br/>

          {isTicketPickupOrc ? <b>PSA:</b> : '' }
          {isTicketPickupOrc ? ` Du håller på att ta bort ${this.state.user.email}'s anmälan som som innehåller all information om hens betalning, tröjstorlek osv. Du bör trippelkolla om det är den här anmälan du ska ta bort!` : ''}
        </DialogContent>
        <DialogActions>
          <DialogButton action="close" raised isDefaultAction>Gör ingenting</DialogButton>
          <DialogButton action="accept" onClick={() => this.deleteSignup()}>Ta bort anmälan</DialogButton>
        </DialogActions>
      </Dialog>

        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h4 style={{margin: '0px'}}> <b>{this.state.user.email}</b>'s ({this.state.user.display_name}) anmälan till <b>{this.state.signup.orchestra.name} </b></h4>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <ListDivider style={{width: '100%'}}/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <AnswerSummary full={isTicketPickupOrc} small={!isTicketPickupOrc} signup={this.state.signup}/>
          </GridCell>
          <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
            <Button raised style={{width: '100%'}}
              onClick={() => this.setState({deleteDialog: true})}
            > Ta bort </Button>
          </GridCell>
          <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
            <Button raised style={{width: '100%'}}
              onClick={() => this.props.history.push('/account/admin/signup/'+ this.state.signup.id + '/edit')}
            > Ändra </Button>
          </GridCell>
        </GridInner>
      </React.Fragment>
    )
  }

}

export const OrchestraSignup = connect(null, {openDialog})(injectIntl(withRouter(UNCOrchestraSignup)));

class UNCOrchestraSignupChange extends Component{
  constructor(props){
    super(props)

    this.state = {error: null, signup: null, user:null, deleteDialog: false}
  }

  componentDidMount(){
    getOrchestraSignup(this.props.match.params.id)
      .then( response =>{
        this.setState({signup: response.data})
        getUser(response.data.user_id)
          .then( response => {
            this.setState({user: response.data})
          })
          .catch( error =>{
            this.setState({error: "" + error})
          })
      })
      .catch( error => {
        this.setState({error: "" + error})
      })
  }


  submitCallback = (values, bag) => {
    const sortedArticles = this.state.signup.orchestra_articles.sort((a, b) => a.kind - b.kind)

    values.TshirtID = sortedArticles[0].id;
    values.MedalID = sortedArticles[1].id;
    values.PatchID = sortedArticles[2].id;

    values.allergyId = this.state.signup.special_diets[0].id;
    console.log(this.state.signup.special_diets);

    bag.setSubmitting(true);
    updateOrchestraSignup(this.props.match.params.id, values)
      .then( response => {
        this.props.history.goBack();
        bag.setSubmitting(false);
        this.props.openDialog(
          'Registrering ändrad!',
          this.state.user.email + "'s registrering till " + this.state.signup.orchestra.name + ' har ändrats'
        );
      })
      .catch ( error => {
        bag.setErrors( { error: 'Something went wrong' });
        bag.setSubmitting(false)
      });
  }

  render() {
    if(this.state.error){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            {this.state.error}
          </GridCell>
        </GridInner>
      )
    }
    if (!this.state.signup || !this.state.user){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <CircularProgress size="xlarge" />
          </GridCell>
        </GridInner>
      );
    }

    const signup = this.state.signup;

    const sortedArticles = signup.orchestra_articles.sort((a, b) => a.kind - b.kind);

    const isTicketPickupOrc = !(sortedArticles === undefined || sortedArticles.length === 0);

    var answers = {};
    var MemRegType = null;

    if(isTicketPickupOrc){
      MemRegType =  OrchestraMemReg;
      answers = {
        arriveWith: (signup.arrival_date === signup.orchestra.arrival_date || signup.arrival_date === null),
        arriveDay: signup.arrival_date !== null ? signup.arrival_date : signup.orchestra.arrival_date,
        festivalPackage: signup.orchestra_ticket.kind,
        foodTickets: signup.orchestra_food_ticket.kind,
        oldOrActive: signup.active_member,
        allergies: signup.special_diets[0].name,
        tenInARow: signup.consecutive_10,
        twoFive: signup.attended_25,
        instrSize: signup.instrument_size,
        dorm: signup.dormitory,
        otherPerformancesTrue: (signup.other_performances !== null && signup.other_performances !== "") ? true : false,
        otherPerformances: signup.other_performances,
        orchestraType: signup.orchestra_role,
        numTshirt: sortedArticles[0].data,
        sizeTshirt: sortedArticles[0].size,
        numMedal: sortedArticles[1].data,
        numPatch: sortedArticles[2].data
      }
    } else{
      MemRegType = OrchestraMemRegShort;
      answers = {
        arriveWith: (signup.arrival_date === signup.orchestra.arrival_date || signup.arrival_date === null),
        arriveDay: signup.arrival_date !== null ? signup.arrival_date : signup.orchestra.arrival_date,
        oldOrActive: signup.active_member,
        otherPerformancesTrue: (signup.other_performances !== null && signup.other_performances !== "") ? true : false,
        otherPerformances: signup.other_performances,
        orchestraType: signup.orchestra_role,
      }
    }

    return(
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h4 style={{margin: '0px'}}> Ändrar <b>{this.state.user.email}</b>'s ({this.state.user.display_name}) anmälan till <b>{this.state.signup.orchestra.name} </b></h4>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <ListDivider style={{width: '100%'}}/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <MemRegType
              submitCallback={this.submitCallback}
              day={this.state.signup.orchestra.arrival_date}
              answers={answers}
            />
          </GridCell>
        </GridInner>
      </React.Fragment>
    );
  }
}

export const OrchestraSignupChange = connect(null, {openDialog})(injectIntl(withRouter(UNCOrchestraSignupChange)));

class UNCOrchestraList extends Component{
  constructor(props){
    super(props)

    this.state = {error: null, orchestra: null}
  }

  componentDidMount(){
    getOrchestra(this.props.match.params.id)
      .then( response =>{
        this.setState({orchestra: response.data})
      })
      .catch( error => {
        this.setState({error: "" + error})
      })
  }


  render() {
    if(this.state.error){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            {this.state.error}
          </GridCell>
        </GridInner>
      )
    }
    if (!this.state.orchestra){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <CircularProgress size="xlarge" />
          </GridCell>
        </GridInner>
      );
    }
    const members = this.state.orchestra.orchestra_signups.map(signup => (
      <DataTableRow
        key={signup.id}
        onClick={() => this.props.history.push('/account/admin/signup/' + signup.id)}
        style={{cursor: 'pointer'}}
      >
        <DataTableCell>{signup.user.email}</DataTableCell>
        <DataTableCell>{signup.user.display_name}</DataTableCell>
        <DataTableCell>{signup.active_member ? 'Aktiv' : 'Gamling'}</DataTableCell>
        <DataTableCell>{signup.total_cost}</DataTableCell>
      </DataTableRow>
    ));
    return(
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4'>
            <h4 style={{margin: '0px'}}> <b>{this.state.orchestra.name}</b></h4>
            <br/>
            <h6 style={{margin: '0px'}}> Medlemmar: {this.state.orchestra.members_count}</h6>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <ListDivider style={{width: '100%'}}/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <DataTable className='rmwc-table-full-width'>
              <DataTableContent>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeadCell>Email</DataTableHeadCell>
                    <DataTableHeadCell>Namn</DataTableHeadCell>
                    <DataTableHeadCell>Aktiv?</DataTableHeadCell>
                    <DataTableHeadCell>Tot. kostnad</DataTableHeadCell>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {members}
                </DataTableBody>
              </DataTableContent>
            </DataTable>
          </GridCell>
        </GridInner>
      </React.Fragment>
    )
  }
}
export const OrchestraList = connect(null, {openDialog})(injectIntl(withRouter(UNCOrchestraList)));

class UNCOrchestraCSV extends Component{
  constructor(props){
    super(props)

    this.csvLinkRef = React.createRef();
    this.state = {csvData: "", csvFileName: "", loading: false}
  }

  downloadAnniversaryData = () => {
    this.setState({loading: true});
    getAnniversaryCSV()
      .then( response => {
        this.setState({loading: false});
        console.log('test');
        console.log(this.csvLinkRef);
        this.setState({csvData: response.data,
          csvFileName: "10/25_SOF_" + (new Date()).toISOString()}, () =>{
            this.csvLinkRef.current.link.click();
        });
      }).catch(error => {
        this.setState({loading: false});
        console.log(error);
      });
  }

  downloadArticleData = () => {
    this.setState({loading: true});
    getArticlesCSV()
      .then( response => {
        this.setState({loading: false});
        console.log('test');
        console.log(this.csvLinkRef);
        this.setState({csvData: response.data,
          csvFileName: "SVAR_SOF_" + (new Date()).toISOString()}, () =>{
            this.csvLinkRef.current.link.click();
        });
      }).catch(error => {
        this.setState({loading: false});
        console.log(error);
      });
  }

  downloadAllergiesData = () => {
    this.setState({loading: true});
    getAllergiesCSV()
      .then( response => {
        this.setState({loading: false});
        console.log('test');
        console.log(this.csvLinkRef);
        this.setState({csvData: response.data,
          csvFileName: "ALLERGIER_SOF_" + (new Date()).toISOString()}, () =>{
            this.csvLinkRef.current.link.click();
        });
      }).catch(error => {
        this.setState({loading: false});
        console.log(error);
      });
  }

  downloadOverlapData = () => {
    this.setState({loading: true});
    getOverlapCSV()
      .then( response => {
        this.setState({loading: false});
        console.log(this.csvLinkRef);
        this.setState({csvData: response.data,
          csvFileName: "OVERLAP_SOF" + (new Date()).toISOString()}, () =>{
            this.csvLinkRef.current.link.click();
        });
      }).catch(error => {
        this.setState({loading: false});
        console.log(error);
      });
  }


  render() {
    return(
      <React.Fragment>
        <GridInner>
          <CSVLink
            ref={this.csvLinkRef}
            data={this.state.csvData}
            style={{display: 'none'}}
            filename={this.state.csvFileName + '.csv'}
            target="_blank"
          >
              test
          </CSVLink>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Button raised disabled={this.state.loading}
              onClick={(e) => {e.stopPropagation(); this.downloadAnniversaryData()}} style={{width: '100%'}}>
              Hämta 10 raka/25 totala
            </Button>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Button raised disabled={this.state.loading}
              onClick={(e) => {e.stopPropagation(); this.downloadArticleData()}} style={{width: '100%'}}>
              Hämta Svarsinformation/Artiklar
            </Button>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Button raised disabled={this.state.loading}
              onClick={(e) => {e.stopPropagation(); this.downloadAllergiesData()}} style={{width: '100%'}}>
              Hämta Allerginformation
            </Button>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Button raised disabled={this.state.loading}
              onClick={(e) => {e.stopPropagation(); this.downloadOverlapData()}} style={{width: '100%'}}>
              Hämta krockande orkestrar
            </Button>
          </GridCell>
          {this.state.loading ? <GridCell desktop='12' tablet='8' phone='4' className="h-center">
            <CircularProgress size="xlarge" />
          </GridCell> : null}
        </GridInner>
      </React.Fragment>
    );
  }
}
export const OrchestraCSV = connect(null, {openDialog})(injectIntl(withRouter(UNCOrchestraCSV)));
