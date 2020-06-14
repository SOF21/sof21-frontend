import React, { Component} from 'react';

import FormTextInput from './FormTextInput';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form } from 'formik/dist/index';
import * as Yup from 'yup';
import { setOrchestraFromCode } from '../../actions/orchestras';
import { FormattedMessage } from 'react-intl';
import { sendCode } from '../../api/orchestraCalls';

class VeriyCode extends Component{

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(values, bag) {
    console.log(values);
    bag.setSubmitting(true);
    sendCode(values.code)
      .then(response => {
        console.log(response)
        bag.setSubmitting(false);
        this.props.dispatch(setOrchestraFromCode())
        this.props.verify(values.code);
      })
      .catch( error => {
        console.log(error)
        bag.setSubmitting(false);
        bag.setErrors({code: 'Something went wrong!'})
        this.props.verify();
      });
  }

  render(){

    return(
      <React.Fragment>
            <GridCell desktop='12' tablet='8' phone='4'>
              <Formik
                initialValues={{code: ''}}
                validationSchema={Yup.object().shape({
                  code: Yup.string().required(<FormattedMessage id='OrchestraMemReg.codeRequired' />),
                })}
                onSubmit={this.formSubmit}
                render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
                  <Form style={{width: '100%'}} >
                    <GridInner>
                      {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}

                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='code'
                          label={<FormattedMessage id='OrchestraMemReg.code'/>}
                          value={values.code}
                          error={errors.code}
                          touched={touched.code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'>
                        <Button raised type='submit' disabled={!isValid || isSubmitting}>
                          <FormattedMessage id='OrchestraMemReg.Submit'/>
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

export default VeriyCode;
