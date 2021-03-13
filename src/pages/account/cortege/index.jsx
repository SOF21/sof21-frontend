import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

import { GridCell, GridInner } from '@rmwc/grid';
import { Select } from '@rmwc/select';
import { Formik, Form } from 'formik';
import { Button } from '@rmwc/button';
import ScaleLoader from 'react-spinners/ScaleLoader';
import * as Yup from 'yup';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';


import FormTextInput from '../../../components/forms/components/FormTextInput';
import FormCheckbox from '../../../components/forms/components/FormCheckbox';
import InformativeInputWrapper from '../../../components/forms/components/InformativeInputWrapper';


import { FormattedMessage, injectIntl, useIntl } from 'react-intl';
import LoadButton from '../../../components/forms/components/LoadButton';
import { getCurrentCortegeApp, sendCortegeApplication } from '../../../actions/cortege';
import { setTitle } from '../../../actions/title';
import { info } from '../../../constants';

const initialInput = {
  groupName: '',
  contactPerson: '',
  mail: '',
  phonenumber: '',
  contribMotivation: '',
  themeMotivation: '',
  amountPartaking: '',
  image: '',
  gdpr: false,
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  groupName: Yup.string().max(40,
    <FormattedMessage id='Cortege.form.errors.illFormed.max40' />
  ).required(
    <FormattedMessage id='Cortege.form.errors.req.groupName' />
  ),
  contactPerson: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.contactPerson' />
  ),
  mail: Yup.string().email(
    <FormattedMessage id='Cortege.form.errors.illFormed.mail' />
  ).required(
    <FormattedMessage id='Cortege.form.errors.req.mail' />
  ),
  phonenumber: Yup.string().matches(
    phoneRegExp, <FormattedMessage id='Cortege.form.errors.illFormed.phoneNumber'/>
  ).required(
    <FormattedMessage id='Cortege.form.errors.req.phonenumber' />
  ),
  contribMotivation: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.contribMotivation' />
  ),
  themeMotivation: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.themeMotivation' />
  ),
  amountPartaking: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.amountPartaking' />
  ),
  image: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.image' />
  ),
  gdpr: Yup.bool().required(
    <FormattedMessage id='Cortege.form.errors.req.gdpr' />
  ).oneOf([true],
    <FormattedMessage id='Cortege.form.errors.illFormed.gdpr' />
  ),
  reservContactPerson: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.reservContactPerson' />
  ),
  reservMail: Yup.string().email(
    <FormattedMessage id='Cortege.form.errors.illFormed.reservMail' />
  ).required(
    <FormattedMessage id='Cortege.form.errors.req.reservMail' />
  ),
  reservPhonenumber: Yup.string().matches(
    phoneRegExp, <FormattedMessage id='Cortege.form.errors.illFormed.phoneNumber'/>
  ).required(
    <FormattedMessage id='Cortege.form.errors.req.reservPhonenumber' />
  ),
  invoiceAddress: Yup.string().email(
    <FormattedMessage id='Cortege.form.errors.illFormed.mail' />
  ).required(
    <FormattedMessage id='Cortege.form.errors.req.invoiceAddress' />
  ),
})

const CortegeComponent = ({
  loading,
  success,
  error,
  submitCortegeApplication,
  cortegeAppId,
  loadCortegeId,
  setTitle,
  lang,
}) => {

  const onSubmit = (values) => {
    submitCortegeApplication(values);
  }

  const intl = useIntl();

  useEffect(() => {
    loadCortegeId();
    setTitle(intl.formatMessage({ id: 'Account.cortege' }));
  }, [loadCortegeId, setTitle, intl])

  const openApp = new Date("Mar 15, 2021").getTime()
  const closeApp = new Date("Apr 5, 01:00:00 2021").getTime()
  const currentTime = new Date().getTime()

  const [coronaDialogOpen, setCoronaDialogOpen] = useState(false)
  const [code, setCode] = useState('')
  const [isOpen, setOpen] = useState(currentTime >= openApp && currentTime < closeApp)

  const handlePasscode = (e) => {
    e.preventDefault()
    if (code === info.adminPassword) {
      setOpen(true)
    }
  }

  return ( // TODO: Add errormessages for inputs
    <>
      {!loading && !isOpen && lang === 'sv' && !(success || cortegeAppId) && 
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' style={{ textAlign: 'center' }}>
            <h5>
              <FormattedMessage id='Cortege.status.error.closed' />
            </h5>
            <form onSubmit={handlePasscode}>
              <FormTextInput
                label="Adminkod"
                type='text'
                onChange={(e) => setCode(e.target.value)}
                onSubmit={(e) => handlePasscode(e)}
                value={code}
              />
            </form>
          </GridCell>
        </GridInner>}
      {!loading && !success && !error && !cortegeAppId &&
        <Dialog open={coronaDialogOpen} onClose={(e) => setCoronaDialogOpen(false)}>
          <DialogTitle>
            <FormattedMessage id='Cortege.info.coronaModal.header' />
          </DialogTitle>
          <DialogContent style={{ maxHeight: '70vh' }}>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p1' />
            </p>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p2' />
            </p>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p3' />
            </p>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p4' />
            </p>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p5' />
            </p>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p7.header' />
            </p>
            <ul>
              <li><FormattedMessage id='Cortege.info.coronaModal.p7.i1' /></li>
              <li><FormattedMessage id='Cortege.info.coronaModal.p7.i2' /></li>
              <li><FormattedMessage id='Cortege.info.coronaModal.p7.i3' /></li>
            </ul>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p8' />
            </p>
            <p>
              <b>Tips! </b><FormattedMessage id='Cortege.info.coronaModal.p9' />
            </p>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p10' />
            </p>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p11' />
            </p>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p12' />
              <br></br>
              <b>OBS! </b><FormattedMessage id='Cortege.info.coronaModal.p13' />
            </p>
            <p>
              <FormattedMessage id='Cortege.info.coronaModal.p14.a' />
              <br></br>
              <FormattedMessage id='Cortege.info.coronaModal.p14.b' />
            </p>

          </DialogContent>
          <DialogActions>
            <DialogButton raised action="ok">Ok</DialogButton>
          </DialogActions>
        </Dialog>
      }
      {!loading && error && isOpen && <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' style={{ textAlign: 'center' }}>
          <h5>
            <FormattedMessage id='Cortege.status.error.p1' />
          </h5>
          <p>
            <FormattedMessage id='Cortege.status.error.p2' />
          </p>
          <p>
            {error.message}
          </p>
        </GridCell>
      </GridInner>}
      {loading && !error && 
        <GridInner className='h-center v-center' style={{ height: '100%' }}>
          <ScaleLoader
            loading={true}
            color={'red'}
          />
        </GridInner>
      }
      {!loading && (success || cortegeAppId) && !error && lang === 'sv' &&
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' style={{ textAlign: 'center' }}>
            <h5>
              <FormattedMessage id='Cortege.status.success.p1' />
            </h5>
            <h5>
              <FormattedMessage id='Cortege.status.success.p2' />
            </h5>
          </GridCell>
        </GridInner>}
      {!loading && lang !== 'sv' && !error &&
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' style={{ textAlign: 'center' }}>
            <h5>
              <FormattedMessage id='Cortege.error.english' />
            </h5>
          </GridCell>
        </GridInner>}
      {!loading && !success && !error && !cortegeAppId && lang === 'sv' && isOpen && <Formik
        initialValues={initialInput}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          handleSubmit,
        }) => (
          <Form
            className='cortege-form '
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <GridInner /* base-outer-grid base-outer-grid--first */>
              <GridCell desktop='12' tablet='8' phone='4'>
                <p>
                  <span><FormattedMessage id='Cortege.info.p1' /></span>
                  <br></br>
                </p>
                <p>
                  <span><b><FormattedMessage id='Cortege.info.p2' /></b></span>
                  <br></br>
                  <span><FormattedMessage id='Cortege.info.p3' /></span>
                </p>
                <p>
                  <span><FormattedMessage id='Cortege.info.outro1' /></span>
                  <br></br>
                  <span><FormattedMessage id='Cortege.info.outro2' /></span>
                </p>
                <p>
                  <span><FormattedMessage id='Cortege.info.corona' /> <Button dense outlined onClick={(e) => {
                    e.preventDefault();
                    setCoronaDialogOpen(true);
                  }}>Här</Button></span>
                </p>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  label={<FormattedMessage id='Cortege.form.fieldLabels.groupName' />}
                  name='groupName'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.groupName}
                  error={errors.groupName}
                  value={values.groupName}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  label={<FormattedMessage id='Cortege.form.fieldLabels.contactPerson' />}
                  name='contactPerson'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.contactPerson}
                  error={errors.contactPerson}
                  value={values.contactPerson}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  label={<FormattedMessage id='Cortege.form.fieldLabels.mail' />}
                  name='mail'
                  type='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.mail}
                  error={errors.mail}
                  value={values.mail}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  label={<FormattedMessage id='Cortege.form.fieldLabels.phonenumber' />}
                  name='phonenumber'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.phonenumber}
                  error={errors.phonenumber}
                  value={values.phonenumber}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  label={<FormattedMessage id='Cortege.form.fieldLabels.reservContactPerson' />}
                  name='reservContactPerson'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.reservContactPerson}
                  error={errors.reservContactPerson}
                  value={values.reservContactPerson}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  label={<FormattedMessage id='Cortege.form.fieldLabels.reservMail' />}
                  name='reservMail'
                  type='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.reservMail}
                  error={errors.reservMail}
                  value={values.reservMail}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  label={<FormattedMessage id='Cortege.form.fieldLabels.reservPhonenumber' />}
                  name='reservPhonenumber'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.reservPhonenumber}
                  error={errors.reservPhonenumber}
                  value={values.reservPhonenumber}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <FormTextInput
                  label={<FormattedMessage id='Cortege.form.fieldLabels.invoiceAddress' />}
                  type='email'
                  name='invoiceAddress'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.invoiceAddress}
                  error={errors.invoiceAddress}
                  value={values.invoiceAddress}
                />
              </GridCell>

              <GridCell desktop='12' tablet='4' phone='4'>
                <InformativeInputWrapper
                  infoText={<FormattedMessage id='Cortege.form.info.contribMotivation' />}
                >
                  <FormTextInput
                    label={<FormattedMessage id='Cortege.form.fieldLabels.contribMotivation' />}
                    name='contribMotivation'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.contribMotivation}
                    error={errors.contribMotivation}
                    value={values.contribMotivation}
                    textarea
                  />
                </InformativeInputWrapper>
              </GridCell>
              <GridCell desktop='12' tablet='4' phone='4'>
                <InformativeInputWrapper
                  infoText={<FormattedMessage id='Cortege.form.info.image' />}
                >
                  <FormTextInput
                    label={<FormattedMessage id='Cortege.form.fieldLabels.image' />}
                    name='image'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.image}
                    error={errors.image}
                    value={values.image}
                  />
                </InformativeInputWrapper>
              </GridCell>
              <GridCell desktop='12' tablet='4' phone='4'>
                <InformativeInputWrapper
                  infoText={<FormattedMessage id='Cortege.form.info.themeMotivation' />}
                >
                  <FormTextInput
                    label={<FormattedMessage id='Cortege.form.fieldLabels.themeMotivation' />}
                    name='themeMotivation'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.themeMotivation}
                    error={errors.themeMotivation}
                    value={values.themeMotivation}
                    textarea
                  />
                </InformativeInputWrapper>
              </GridCell>
              <GridCell desktop='12' tablet='4' phone='4'>
                <InformativeInputWrapper
                  infoText={<FormattedMessage id='Cortege.form.info.amountPartaking' />}
                >
                  <FormTextInput
                    label={<FormattedMessage id='Cortege.form.fieldLabels.amountPartaking' />}
                    name='amountPartaking'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.amountPartaking}
                    error={errors.amountPartaking}
                    value={values.amountPartaking}
                  />
                </InformativeInputWrapper>
              </GridCell>
              <GridCell desktop='12' tablet='4' phone='4'>
                <InformativeInputWrapper
                  infoText={<FormattedMessage id='Cortege.form.info.gdpr' />}
                >
                  <FormCheckbox
                    label={intl.formatMessage({ id: 'Cortege.form.fieldLabels.gdpr' })}
                    name='gdpr'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.gdpr}
                    error={errors.gdpr}
                    value={values.gdpr}
                  />
                </InformativeInputWrapper>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <LoadButton loading={isSubmitting || loading} type='submit' raised disabled={isSubmitting
                }>
                  <FormattedMessage id='Cortege.form.submit' />
                </LoadButton>
              </GridCell>

              {errors.error && <GridCell desktop='12' tablet='8' phone='4'> {errors.error}</GridCell>}
            </GridInner>
          </Form>
        )}
      </Formik>}
    </>
  );
}

const mapStateToProps = state => ({
  loading: state.cortege.loading,
  success: state.cortege.success,
  error: state.cortege.error,
  cortegeAppId: state.cortege.cortegeAppId,
  lang: state.locale.lang
});

const mapDispatchToProps = dispatch => ({
  submitCortegeApplication: (values) => dispatch(sendCortegeApplication(values)),
  loadCortegeId: (userId) => dispatch(getCurrentCortegeApp({ userId })),
  setTitle: (title) => dispatch(setTitle(title)),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CortegeComponent))