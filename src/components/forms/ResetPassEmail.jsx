import React, { Component } from 'react';
import FormTextInput from './components/FormTextInput';

import { GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { FormattedMessage, injectIntl  } from 'react-intl';

import { connect } from 'react-redux';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { sendEmailPassChange } from '../../api/userCalls';
import { openDialog } from '../../actions/dialog';

class ResetPassEmail extends Component{
  constructor(props){
    super(props);

    this.sendEmail = this.sendEmail.bind(this);
    this.state = { success: false }
  }

  sendEmail(values, bag){
    bag.setSubmitting(true);
    sendEmailPassChange(values)
    .then( (response) => {
      bag.setSubmitting(false);
      this.props.dispatch(openDialog(
        this.props.intl.formatMessage({id: 'ForgotPass.passReset'}),
        this.props.intl.formatMessage({id: 'ForgotPass.emailSent'})
      ));
      if(this.props.handleResetCallback){
        this.props.handleResetCallback();
      }
    })
    .catch( (error) => {
      bag.setSubmitting(false);
      if(error.response.data.message){
        bag.setErrors( {email: error.response.data.message} );
      } else {
        bag.setErrors( {email: this.props.intl.formatMessage({id :'ForgotPass.emailNotFound'}) } );
      }
    })
  }


  render(){
    return(
      <React.Fragment>
        <GridCell desktop='12' tablet='8' phone='4'>
          <Formik
            initialValues={{email:''}}
            validationSchema={Yup.object().shape({
              email:Yup.string().email(<FormattedMessage id='Register.EmailRequired'/>).required(<FormattedMessage id="Login.EmailRequired"/>)
            })}
            onSubmit={this.sendEmail}
            render={({values, handleChange, handleBlur, errors, touched,  isValid, isSubmitting, setFieldValue,  setFieldTouched})=>(
              <Form style={{width: '100%'}}>
                <GridInner>
                  <GridCell desktop='12' tablet='8' phone='4'>
                    <FormTextInput
                      style={{width: '100%'}}
                      name='email'
                      label={<FormattedMessage id="Login.Email"/>}
                      value={values.email}
                      error={errors.email}
                      touched={touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </GridCell>

                  <GridCell desktop='12' tablet='8' phone='4'>
                    <Button raised type='submit' style={{width: '100%'}} disabled={!isValid || isSubmitting }> 
                      <FormattedMessage id='ForgotPass.reset'/> 
                    </Button>
                  </GridCell>
                </GridInner>
              </Form>
            )}
          />
        
        </GridCell>
      </React.Fragment>

    );

  }
}

export default injectIntl(connect()(ResetPassEmail));
