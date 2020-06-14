import React, { Component } from 'react';

import FormSelect from './components/FormSelect';
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

class ShirtSizeFormPopup extends Component{
  constructor(props) {
    super(props);

    this.state = {open: true}
  }

  changeSize = (values, bag) => {
    values = {...values, TshirtID: this.props.shirtId};
    bag.setSubmitting(true);
    updateShirtSize(this.props.orchId, values)
      .then( response =>{
        bag.setSubmitting(false);
        this.setState({open: false});
        this.props.openDialog(
          this.props.intl.formatMessage({id: 'OrchestraMemReg.thanks'}),
          this.props.intl.formatMessage({id: 'OrchestraMemReg.fixTshirtChanged'})
        );
        if(this.props.successCallback){
          this.props.successCallback();
        }
      })
      .catch( error => {
        bag.setSubmitting(false);
        bag.erros = {global: error.message}
      })
  }

  render(){
    return(
      <React.Fragment>
        <Formik
          initialValues={{sizeTshirt: ''}}
          validationSchema={Yup.object().shape({
            sizeTshirt: Yup.number().required(<FormattedMessage id='Login.EmailRequired' />),
          })}
          onSubmit={this.changeSize}
          render={ ({values, setFieldValue, setFieldTouched, errors, touched, isValid, isSubmitting, submitForm}) => (
            <Form style={{width: '100%'}} >
              <Dialog
                open={this.state.open}
                onClose={() => this.setState({open: false})}
                className='unclickable-scrim-dialog'
              >
                <DialogTitle><FormattedMessage id='OrchestraMemReg.fixTshirtTitle'/></DialogTitle>
                <DialogContent> 
                  
                  <GridInner>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormattedMessage id='OrchestraMemReg.fixTshirt'/>
                    </GridCell>
                    {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        style={{width: '100%'}}
                        name='sizeTshirt'
                        field='sizeTshirt'
                        label={<FormattedMessage id='OrchestraMemReg.sizeTshirt'/>}
                        value={values.sizeTshirt}
                        error={errors.sizeTshirt}
                        touched={touched.sizeTshirt}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        options={[
                          {
                            label: "Woman S",
                            key: 0,
                            value: 0,
                          },
                          {
                            label: "Woman M",
                            key: 1,
                            value: 1,
                          },
                          {
                            label: "Woman L",
                            value: 2,
                            key: 2,
                          },
                          {
                            label: "Woman XL",
                            value: 3,
                            key: 3,
                          },
                          {
                            label:"Woman XXL",
                            value: 4,
                            key: 4,
                          },
                          {
                            label: "Man S",
                            value: 5,
                            key: 5,
                          },
                          {
                            label: "Man M",
                            value: 6,
                            key: 6,
                          },
                          {
                            label: "Man L",
                            value: 7,
                            key: 7,
                          },
                          {
                            label: "Man XL",
                            value: 8,
                            key: 8,
                          },
                          {
                            label: "Man XXL",
                            value: 9,
                            key: 9,
                          }
                        ]}
                      />
                        </GridCell>
                      </GridInner>
                    </DialogContent>
                    <DialogActions>
                      <DialogButton action="close" type='button' isDefaultAction>Senare</DialogButton>
                      <DialogButton type='submit' >Ändra</DialogButton>
                    </DialogActions>
              </Dialog>
            </Form>
                )}
              />
      </React.Fragment>
    );
  }
}

export default injectIntl(connect(null, { openDialog})(ShirtSizeFormPopup));
