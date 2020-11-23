import React, { Component } from 'react';

import FormTextInput from './components/FormTextInput';

import { GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Checkbox } from '@rmwc/checkbox';

import { Formik, Form } from 'formik';
import LoadButton from './components/LoadButton';
import * as Yup from 'yup';

import { FormattedMessage, injectIntl } from 'react-intl';
import { registerUser } from '../../redux-token-auth-config';
import { openDialog} from '../../actions/dialog';
import { pushCart, fetchCart } from '../../actions/cart';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom'

import { frontEndPath } from '../../constants';

class RegisterForm extends Component{

  constructor(props){
    super(props);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.state = { error : "" };
  }

  registerSubmit(values, bag) {
    const { registerUser, pushCart, fetchCart } = this.props;
    const {
      username,
      email,
      password,
      passwordConfirmation
    } = values;
    var urlSuffix = "";
    try{
      urlSuffix = this.props.location.state.from.pathname;
    } catch{
      urlSuffix = this.props.location.pathname;
    }

    const confirmSuccessUrl = frontEndPath + urlSuffix;
    bag.setSubmitting(true);

    registerUser({ email, displayName: username, password, passwordConfirmation, confirmSuccessUrl })
      .then( (response) => {
        bag.setSubmitting(false);
        this.props.openDialog(
          this.props.intl.formatMessage({id: 'Register.welcome'}),
          this.props.intl.formatMessage({id: 'Register.confirmEmail1'})
          + email
          + this.props.intl.formatMessage({id: 'Register.confirmEmail2'})
        );
      } )
      .catch( (error) => {
        console.log(error);
        let errors = {};
        for (let key in error.response.data.errors) {
          errors[key] = error.response.data.errors[key][0]; // for now only take the first error of the array
        }
        console.log("errors object", errors);
        bag.setErrors( errors );

        bag.setSubmitting(false);
      } )
   }

  render(){
    return(
            <GridCell desktop='12' tablet='8' phone='4'>
              <Formik
                initialValues={{email: '', username: '', password: '', password_conf: '', accept_integrity: false}}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required(<FormattedMessage id='Register.EmailRequired' />)
                  .email(<FormattedMessage id='Register.MustBeEmail' />),
                  username: Yup.string().required(<FormattedMessage id='Register.usernameRequired' />),
                  password: Yup.string().required(<FormattedMessage id='Register.PasswordRequired' />).min(8, <FormattedMessage id='Register.PasswordMinLen'/>),
                  password_conf: Yup.string()
                  .oneOf([Yup.ref("password"), null], <FormattedMessage id='Register.PasswordConfirmWrong' />)
                  .required(<FormattedMessage id='Register.PasswordConfirmRequired'/>),
                  accept_integrity: Yup.bool().oneOf([true])

                })}
                onSubmit={this.registerSubmit}
                render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting, onChange, onBlur}) => (
                  <Form style={{width: '100%'}} >
                    <GridInner>
                      {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='email'
                          label={<FormattedMessage id='Register.Email'/>}
                          value={values.email}
                          error={errors.email}
                          touched={touched.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='username'
                          label={<FormattedMessage id='Register.username'/>}
                          value={values.username}
                          error={errors.username}
                          touched={touched.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='password'
                          type='password'
                          label={<FormattedMessage id='Register.Pass'/>}
                          value={values.password}
                          error={errors.password}
                          touched={touched.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='password_conf'
                          type='password'
                          label={<FormattedMessage id='Register.PassConfirm'/>}
                          value={values.password_conf}
                          error={errors.password_conf}
                          touched={touched.password_conf}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                          <Checkbox
                            name='accept_integrity'
                            label={this.props.intl.formatMessage({id: 'Register.acceptPolicy'})}
                            checked={values.accept_integrity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <div className='mdc-form-field'>
                            <label>
                              <a
                                href={process.env.PUBLIC_URL + '/Integritetspolicy_SOF.pdf'}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{color: 'var(--mdc-theme-secondary)'}}
                              >
                                <FormattedMessage id='Register.policy'/>
                              </a>
                            </label>
                          </div>
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <LoadButton loading={isSubmitting} raised type='submit' disabled={!isValid}>
                          <FormattedMessage id='Login.Register'/>
                        </LoadButton>
                      </GridCell>
                    </GridInner>
                  </Form>
                )}
              />
            </GridCell>
    );
  }
}

export default withRouter(injectIntl(connect(null, { openDialog, registerUser, pushCart, fetchCart })(RegisterForm)));
