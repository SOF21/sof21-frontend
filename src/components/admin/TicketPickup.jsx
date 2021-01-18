import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import { GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { getOrderItemsFromUUID, collectItems, getOrderFromLiUCardCode } from '../../api/ticketPickupCalls';
import { openDialog } from '../../actions/dialog';
import { connect } from 'react-redux';

import FormTextInput from '../../components/forms/components/FormTextInput'
import LoadButton from '../forms/components/LoadButton';
import ShowTickets from './ShowTickets';

import { Formik, Form } from 'formik/dist/index';
import * as Yup from 'yup';


const focusUsernameInputField = input => {
  if (input) {
    setTimeout(() => input.focus(), 100);
  }
};

class TicketPickup extends Component {
  constructor(props){
    super(props)
    this.state = {
      uuid: '',
      currUser: null,
      loading: false
    }
  };


  handleScan = data => {
    if (data) {
      this.setState( { uuid: data })
      getOrderItemsFromUUID(data)
        .then( (res) => {
          this.setState( { currUser: res.data, qrRead: false, loading: false });

        })
        .catch( err => {
          this.setState({ uuid: '', qrRead: false, loading:false});
        });
    }
  };

  handleError = err => {
    this.props.openDialog('Så jäkla icke-tungt', 'Något gick fel döh');
  };


  formSubmit = (values, bag) => {
    bag.setSubmitting(true);
    getOrderFromLiUCardCode(values.blipp)
      .then( res => {
        this.setState( { currUser: res.data, qrRead: false, showCollect: true } );
        bag.setSubmitting(false);
      })
      .catch( err => {
        this.props.openDialog('Ajaj', 'Denna person verkar inte ha lagt till sin kod rätt, be hen ta upp sin QR istället');
        bag.setSubmitting(false);
      })

    bag.resetForm();
  }

  render(){
    return (
      <React.Fragment>
        <GridInner>
          {(this.state.currUser === null) ?
            <React.Fragment>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <LoadButton raised onClick={() => this.setState( { qrRead: !this.state.qrRead, loading: true, showCollect:false } )} loading={this.state.loading} style={{ width: '100%' }}>
                  Scanna QR
                </LoadButton>
              </GridCell >
              {!this.state.loading ?
                <GridCell desktop='12' tablet='8' phone='4'>
                    <Formik
                      initialValues={{blipp: ''}}
                      onSubmit={this.formSubmit}
                      render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
                        <Form style={{width: '100%'}} >
                          <GridInner>
                            {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}

                            <GridCell desktop='12' tablet='8' phone='4'>
                              <FormTextInput
                                name='blipp'
                                label={'Kod här'}
                                value={values.blipp}
                                error={errors.blipp}
                                touched={touched.blipp}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                inputRef={focusUsernameInputField}
                              />

                            </GridCell>
                            <GridCell desktop='6' tablet='4' phone='2'>
                              <Button raised type='submit' disabled={!isValid || isSubmitting}>
                                Skicka
                              </Button>
                            </GridCell>
                          </GridInner>
                        </Form>
                      )}
                    />
                </GridCell >
              : null
              }
              { this.state.qrRead?
                <React.Fragment>
                  <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                    <QrReader
                      delay={300}
                      onError={this.handleError}
                      onScan={this.handleScan}
                      style={{ width: '100%' }}
                    />
                  </GridCell>
                  <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                    <Button raised style={{width:"100%"}} onClick={() => this.setState({qrRead: false, loading:false})} >
                      Avbryt scan
                    </Button>
                  </GridCell>
                </React.Fragment>
                : null
              }
            </React.Fragment>
            :
            <React.Fragment>
                { (!this.state.loading) ?
                  <React.Fragment>
                    <ShowTickets user={this.state.currUser} resetUser={() => this.setState({currUser:null})} />
                  </React.Fragment>
                :
                  null
                }
            </React.Fragment>
          }
        </GridInner>
      </React.Fragment>
    );
  }

};

export default connect(null, { openDialog })(TicketPickup);
