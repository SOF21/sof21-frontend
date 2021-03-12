import React, { Component } from 'react';

import FormTextInput from './components/FormTextInput';

import { GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FormattedMessage, injectIntl } from 'react-intl';
import FormSelect from './components/FormSelect';

import { connect } from 'react-redux';


class OrchestraMemReg extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.fixArrive = this.fixArrive.bind(this);
    this.code = this.props.code;

    this.state = {
      arriveWithFalse: false,
      performWithOther: false,
      codeWasValid: false,
    }
  }



  // TODO: show total sum at bottom, another simple version for orchestramembers already signed up.
  // Verify code skall fungera fast ej i denna component

  //Handles when e.g member says "Not arriving with orchestra"  and chooses Thur but changes mind later
  fixArrive(values) {

    if (values.arriveWith === true) {
      values.arriveDay = this.props.signupOrchestra.orchestra.arrival_date;
    }
    if (values.otherPerformancesTrue === false) {
      values.otherPerformances = null;
    }
  }

  formSubmit(values, bag) {
    this.fixArrive(values);
    if (this.props.submitCallback) {
      this.props.submitCallback({ ...values, code: this.code }, bag);
    }
  }

  handleArriveWithFalse = (val) => {
    this.setState({ arriveWithFalse: !(val === 'true') });
  }

  handlePlayWithOthers = (val) => {
    this.setState({ performWithOther: (val === 'true') });
  }

  render() {
    this.Days = [
      this.props.intl.formatMessage({ id: 'OrchestraMemReg.thur' }),
      this.props.intl.formatMessage({ id: 'OrchestraMemReg.fri' }),
      this.props.intl.formatMessage({ id: 'OrchestraMemReg.sat' }),
    ]
    const answers = this.props.answers;
    return (
      <React.Fragment>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='account-orchestra-signup'>
            <Formik
              initialValues={{
                pickupTicket: this.props.pickupTicket,
                arriveWith: (answers && answers.arriveWith !== null) ? answers.arriveWith : '',
                arriveDay: (answers && answers.arriveDay !== null) ? answers.arriveDay : '',
                oldOrActive: (answers && answers.oldOrActive !== null) ? answers.oldOrActive : '',
                otherPerformances: (answers && answers.otherPerformances !== null) ? answers.otherPerformances : '',
                orchestraType: (answers && answers.orchestraType !== null) ? answers.orchestraType : '',
              }}
              validationSchema={Yup.object().shape({
                arriveWith: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
                arriveDay: Yup.number().when('arriveWith', {
                  is: false,
                  then: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />)
                }),
                oldOrActive: Yup.bool().required(<FormattedMessage id='OrchestraMemReg.required' />),
                otherPerformances: Yup.string().required(<FormattedMessage id='OrchestraMemReg.required' />),
                orchestraType: Yup.number().required(<FormattedMessage id='OrchestraMemReg.required' />),

              })}
              onSubmit={this.formSubmit}
              render={({ values, handleChange, handleBlur, errors, touched, isValid, setFieldValue, setFieldTouched, isSubmitting }) => (
                <Form style={{ width: '100%' }} >
                  <GridInner>
                    {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}

                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.newOrOld' />}
                        value={values.oldOrActive}
                        field='oldOrActive'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.oldOrActive}
                        touched={touched.oldOrActive}
                        options={[
                          {
                            label: this.props.intl.formatMessage({ id: 'OrchestraMemReg.active' }),
                            value: true,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({ id: 'OrchestraMemReg.old' }),
                            value: false,
                            key: 1
                          }
                        ]}
                      />

                    </GridCell>
                    {this.props.signupOrchestra.orchestra.orchestra_type === 2 &&
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={
                          <span>
                            <FormattedMessage id={`OrchestraMemReg.arrive.${this.props.orchestraType}` }/>
                            {" "}({this.Days[this.props.day]})
                          </span>
                        }
                        value={values.arriveWith}
                        field='arriveWith'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.arriveWith}
                        touched={touched.arriveWith}
                        options={[
                          {
                            label: this.props.intl.formatMessage({ id: 'OrchestraMemReg.yes' }),
                            value: true,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({ id: 'OrchestraMemReg.no' }),
                            value: false,
                            key: 1
                          }
                        ]}
                      />
                    </GridCell>}

                    {values.arriveWith === false ? <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.whatDay' />}
                        value={values.arriveDay}
                        field='arriveDay'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.arriveDay}
                        touched={touched.arriveDay}
                        options={[
                          {
                            label: this.props.intl.formatMessage({ id: 'OrchestraMemReg.thur' }),
                            value: 0,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({ id: 'OrchestraMemReg.fri' }),
                            key: 1,
                            value: 1,
                          },
                          {
                            label: this.props.intl.formatMessage({ id: 'OrchestraMemReg.sat' }),
                            key: 2,
                            value: 2,
                          }
                        ]}
                      />
                    </GridCell> : null}

                    {this.props.signupOrchestra.orchestra.orchestra_type === 2 && 
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormSelect
                        label={<FormattedMessage id='OrchestraMemReg.balletOrOrchestra' />}
                        value={values.orchestraType}
                        field='orchestraType'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.orchestraType}
                        touched={touched.orchestraType}
                        options={[
                          {
                            label: this.props.intl.formatMessage({ id: 'OrchestraMemReg.ballet' }),
                            value: 0,
                            key: 0
                          },
                          {
                            label: this.props.intl.formatMessage({ id: 'OrchestraMemReg.orchestra' }),
                            key: 1,
                            value: 1,
                          },
                        ]}
                      />
                    </GridCell>}

                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormTextInput
                        name='otherPerformances'
                        label={<FormattedMessage id='OrchestraMemReg.whichOtherOrchestras' />}
                        value={values.otherPerformances}
                        error={errors.otherPerformances}
                        touched={touched.otherPerformances}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </GridCell>

                    <GridCell desktop='6' tablet='4' phone='2'>
                      <Button raised type='submit' disabled={
                        !isValid ||
                        isSubmitting}>
                        <FormattedMessage id='OrchestraMemReg.Submit' />
                      </Button>
                    </GridCell>
                  </GridInner>
                </Form>
              )}
            />

          </GridCell>
        </GridInner>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  signupOrchestra: state.orchestras.signupOrchestra,
  loading: state.orchestras.loading,
});

export default injectIntl(connect(mapStateToProps)(OrchestraMemReg));
