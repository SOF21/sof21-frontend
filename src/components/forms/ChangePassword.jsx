import React, { Component } from 'react';
import FormTextInput from './components/FormTextInput';

import { GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { resetPassword } from '../../api/userCalls';
import qs from 'qs';
import { setTitle } from '../../actions/title';
import { openDialog } from '../../actions/dialog';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ChangePassword extends Component{
  constructor(props){
    super(props);

    this.sendNewPassword = this.sendNewPassword.bind(this);
    this.state = {tokenParams: null}
  }

  verify = (params) =>{
    const tokenParams = {
      'access-token': params.token,
      client: params.client_id,
      uid: params.uid
    }
    this.setState({ tokenParams: tokenParams });
  }

  componentDidMount(){

    this.props.dispatch(setTitle('ForgotPass.reset'));

    const params = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    this.verify(params);
  }


  sendNewPassword(values, bag){
    bag.setSubmitting(true);

    if (this.state.tokenParams && this.state.tokenParams.uid) {
      console.log('hello')
      resetPassword(values, this.state.tokenParams)
      .then( (response) => {
        this.props.dispatch(openDialog(
          this.props.intl.formatMessage({id: 'ForgotPass.successTitle'}),
          this.props.intl.formatMessage({id: 'ForgotPass.success'})
        ));
        this.props.history.push('/account/profile');
    
      })
      .catch( (error) => {
        bag.setErrors( {confirmPassword: error.response.data.message} );
        this.props.dispatch(openDialog(
          this.props.intl.formatMessage({id: 'ForgotPass.failTitle'}),
          this.props.intl.formatMessage({id: 'ForgotPass.fail'})
        ));
      });
    } else {
        this.props.dispatch(openDialog(
          this.props.intl.formatMessage({id: 'ForgotPass.failTitle'}),
          this.props.intl.formatMessage({id: 'ForgotPass.fail'})
        )); 
    }
    bag.setSubmitting(false);
  }

  render(){

    return(
      <React.Fragment>
        <GridCell desktop='12' tablet='8' phone='4'>
          <Formik
            initialValues={{newPassword:'', confirmPassword: ''}}
            validationSchema={Yup.object().shape({
              newPassword: Yup.string().required(<FormattedMessage id='Register.PasswordRequired' />).min(8, <FormattedMessage id='Register.PasswordMinLen'/>),
              confirmPassword: Yup.string()
              .oneOf([Yup.ref("newPassword"), null], <FormattedMessage id='Register.PasswordConfirmWrong' />)
              .required(<FormattedMessage id='Register.PasswordConfirmRequired'/>)
            })}

            onSubmit={this.sendNewPassword}
            render={({values, handleChange, handleBlur, errors, touched,  isValid, isSubmitting, setFieldValue,  setFieldTouched})=>(
              <Form style={{width: '100%'}}>
                <GridInner>
                  <GridCell desktop='12' tablet='8' phone='4'>
                    <FormTextInput
                      style={{width: '100%'}}
                      name='newPassword'
                      type='password'
                      label={<FormattedMessage id="ForgotPass.newPass"/>}
                      value={values.newPassword}
                      error={errors.newPassword}
                      touched={touched.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </GridCell>

                  <GridCell desktop='12' tablet='8' phone='4'>
                    <FormTextInput
                      style={{width: '100%'}}
                      name='confirmPassword'
                      type='password'
                      label={<FormattedMessage id="ForgotPass.confirmPass"/>}
                      value={values.confirmPassword}
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </GridCell>

                  <GridCell desktop='12' tablet='8' phone='4'>
                    <Button raised type='submit' style={{width: '100%'}} disabled={!isValid || isSubmitting }> {/* disabled={!isValid || isSubmitting}> */ }
                      <FormattedMessage id='ForgotPass.change'/>
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

export default injectIntl(withRouter(connect()(ChangePassword)));
