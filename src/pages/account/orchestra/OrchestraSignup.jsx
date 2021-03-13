import React, { Component } from 'react';

import OrchestraMemReg from '../../../components/forms/OrchestraMemReg';
import OrchestraMemRegShort from '../../../components/forms/OrchestraMemRegShort';

import {  GridCell, GridInner } from '@rmwc/grid';
import { CircularProgress } from '@rmwc/circular-progress';

import { Select } from '@rmwc/select'
import { FormattedMessage, injectIntl } from 'react-intl';

import { fetchSignupOrchestra } from '../../../actions/orchestraSignups'
import { createOrchestraSignup } from '../../../api/orchestraCalls';
import { Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

class OrchestraSignup extends Component{
  constructor(props) {
    super(props);
    this.state = {
      failedFetchCode: false,
      successRegister: false,
      pickupTicket: false,
    }
  }

  componentDidMount() {
    const { signupOrchestra, loading } = this.props;
    const code = this.props.match.params.id;

    if (!signupOrchestra.orchestra && !loading) {
      this.props.dispatch(fetchSignupOrchestra(code))
        .then((res) => {
          if(res){ //Returns something on fail
            this.setState({ failedFetchCode: true });
          }
        })
    } else if(!loading){
      if(signupOrchestra.code !== code){
        this.setState({ failedFetchCode: true });
      } 
    }
  }

  formSubmit = (values, bag) => {
    bag.setSubmitting(true);
    createOrchestraSignup(values)
    .then( res => {
      bag.setSubmitting(false);
      this.setState({successRegister: true});
    })
    .catch( error => {
      bag.setErrors( { error: error.response.data.message });
      bag.setSubmitting(false)
      //this.setState( {successfullySubmitted: 'Success!'} )
    });
  }

  handleChange = (event) => {
    if (event.target.value === 'yes') this.setState({pickupTicket: true})
    else this.setState({pickupTicket: false})
  }

  render() {
    const {signupOrchestra, loading } = this.props;

    if(this.state.failedFetchCode){
      return <Redirect to={{pathname: '/account/orchestra/', 
        //message: this.props.intl.formatMessage({id: 'Orchestra.invalidCode'}),
        message: signupOrchestra.error.response.data.message
      }} />
    }

    if(loading || !signupOrchestra.orchestra){
      return(
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <CircularProgress size="large" />
          </GridCell>
        </GridInner>
      )
    }

    if(this.state.successRegister){
      return <Redirect to={{pathname: '/account/orchestra/',
        message: this.props.intl.formatMessage({id: 'Orchestra.successReg1'})
        + signupOrchestra.orchestra.name 
        + this.props.intl.formatMessage({id: 'Orchestra.successReg2'}),
      }} />
    }

    if(signupOrchestra.double_signup){
      return <Redirect to={{pathname: '/account/orchestra/', 
        message: this.props.intl.formatMessage({id: 'Orchestra.alreadyRegistered'})
        + signupOrchestra.orchestra.name 
      }} />
    }
    const MemRegType =  this.state.pickupTicket ? OrchestraMemReg: OrchestraMemRegShort
    return(
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <h5> <FormattedMessage id='OrchestraMemReg.registerTo' /> <b>{signupOrchestra.orchestra.name}</b> </h5>
        </GridCell>
        { signupOrchestra.has_ticket_pickup ?
        <GridCell desktop='12' tablet='8' phone='4'>
          <Select
            label={this.props.intl.formatMessage({id: 'OrchestraMemReg.ticketPickupWithWho'})}
            options={[
              {
                label: this.props.intl.formatMessage({id :'OrchestraMemReg.yes'}),
                value: 'yes',
                key: 0
              },
              {
                label: this.props.intl.formatMessage({id: 'OrchestraMemReg.no'}),
                value: 'no',
                key: 1
              }
            ]}
            onChange={(evt) => this.handleChange(evt)}
            style={{ width: '100%' }}
          />
        </GridCell>
        : null }
        {/* <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <h6 style={{marginTop: '-40px'}}> <b> <FormattedMessage id='OrchestraMemReg.closed' /> </b> </h6>
        </GridCell>  */}
        <GridCell desktop='12' tablet='8' phone='4'>
          <MemRegType 
            late={signupOrchestra.late_signup}
            submitCallback={this.formSubmit} 
            code={this.props.match.params.id} 
            day={signupOrchestra.orchestra.arrival_date}
            pickupTicket={this.state.pickupTicket}/> 
        </GridCell>
      </GridInner>
    );
  }
}

const mapStateToProps = state => ({
  signupOrchestra : state.orchestras.signupOrchestra,
  loading: state.orchestras.signupOrchestra.loading,
});

export default injectIntl(connect(mapStateToProps)(OrchestraSignup));
