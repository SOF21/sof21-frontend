import React, { Component } from 'react';
import FormTextInput from '../forms/components/FormTextInput';

import { GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';


import { Formik, Form } from 'formik/dist/index';
import * as Yup from 'yup';

import { getUserFromEmail } from '../../api/userCalls';


class GetUser extends Component{
  constructor(props){
    super(props);

    this.getUser = this.getUser.bind(this);
  }

  getUserCallback = (response) => {
    if (this.props.getUserCallback){
      this.props.getUserCallback(response);
    }
  }

  getUser(values, bag){
    bag.setSubmitting(true);
    getUserFromEmail(values)
    .then( (response) => {
      console.log(response);
      this.getUserCallback(response.data);
    })
    .catch( (error) => {
      bag.setErrors( {email: error.response.data.message} );
    })
    bag.setSubmitting(false);
  }

  render(){
    return(
      <React.Fragment>
        <Formik
          initialValues={{email:''}}
          validationSchema={Yup.object().shape({
            email:Yup.string().required("Men lol skriv in email noob...")
          })}
          onSubmit={this.getUser}
          render={({values, handleChange, handleBlur, errors, touched,  isValid, isSubmitting, setFieldValue,  setFieldTouched})=>(
            <Form style={{width: '100%'}} classname='get-user'>
              <GridInner>
                <GridCell desktop='12' tablet='8' phone='4'>
                  <FormTextInput
                    style={{width: '100%'}}
                    name='email'
                    label={"Email på användare"}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </GridCell>

                <GridCell desktop='12' tablet='8' phone='4'>
                  <Button raised type='submit' style={{width: '100%'}} disabled={!isValid || isSubmitting }> {/* disabled={!isValid || isSubmitting}> */ }
                    Hämta användare
                  </Button>
                </GridCell>
              </GridInner>
            </Form>
          )}
        />
      </React.Fragment>

    );

  }
}

export default GetUser;
