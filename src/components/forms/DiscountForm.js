import React, { Component } from 'react';

import FormSelect from './components/FormSelect';
import FormTextInput from './components/FormTextInput'; 
import LoadButton  from './components/LoadButton';
import { openDialog} from '../../actions/dialog';

import { updateShirtSize } from '../../api/orchestraCalls';

import { FormattedMessage, injectIntl } from 'react-intl';

import { Formik, Form } from 'formik';


import { GridInner, GridCell } from '@rmwc/grid';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import * as Yup from 'yup';

import {connect} from 'react-redux';

import api from '../../api/axiosInstance';

class ShirtSizeFormPopup extends Component{
  constructor(props) {
    super(props);

    this.state = {open: true}
  }

  submitCode = (values, bag) =>{
    bag.setSubmitting(true)
    api.put('/cart/discount', {discount: {code: values.code}})
      .then( response => {
        bag.setSubmitting(false);
        if(this.props.successCallback){
          this.props.successCallback(response)
        }

      })
      .catch( (error) => {
        bag.setSubmitting(false);
        bag.setErrors({code: error.response.data})
      } )
  }

  render(){
    return(
      <React.Fragment>
        <Formik
          initialValues={{code: ''}}
          validationSchema={Yup.object().shape({
            code: Yup.string().required(<FormattedMessage id='Checkout.codeReq' />),
          })}
          onSubmit={this.submitCode}
          render={ ({values, setFieldValue, setFieldTouched, errors, touched, handleChange, handleBlur, isValid, isSubmitting, submitForm}) => (
            <Form style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
              <FormTextInput
                outlined
                name='code'
                label={<FormattedMessage id='Checkout.code'/>}
                value={values.code}
                error={errors.code}
                touched={touched.code}
                onChange={handleChange}
                onBlur={handleBlur}
                tabIndex='1'
              />
              <LoadButton 
                style={{height: '56px'}}
                raised 
                loading={isSubmitting}
                disabled={!isValid}
              >
                <FormattedMessage id='Checkout.useCode'/>
              </LoadButton>
            </Form>
                )}
              />
      </React.Fragment>
    );
  }
}

export default injectIntl(connect(null, { openDialog})(ShirtSizeFormPopup));
