import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { GridCell, GridInner } from '@rmwc/grid';
import { Select } from '@rmwc/select';
import { Formik, Form} from 'formik';
import ScaleLoader from 'react-spinners/ScaleLoader';
import * as Yup from 'yup';

import FormTextInput from '../../../components/forms/components/FormTextInput';
import InformativeInputWrapper from '../../../components/forms/components/InformativeInputWrapper';


import { FormattedMessage, injectIntl } from 'react-intl';
import LoadButton from '../../../components/forms/components/LoadButton';

const buildTypes = {
  macro: 'Macrobygge',
  friBygge: 'Fri bygge',
};


const initialInput = {
  groupName: '',
  contactPerson: '',
  mail: '',
  phonenumber: '',
  buildType: '',
  contribMotivation: '',
  themeMotivation: '',
  amountPartaking: '',
}

const validationSchema = Yup.object().shape({
  groupName: Yup.string().required(
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
  phonenumber: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.phonenumber' />
  ),
  buildType: Yup.string().required(
    <FormattedMessage id='Corteg.form.errors.req.buildType' />
  ),
  contribMotivation: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.contribMotivation' />
  ),
  themeMotivation: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.themeMotivation' />
  ),
  amountPartaking: Yup.string().required(
    <FormattedMessage id='Cortege.form.errors.req.amountPartaking' />
  )
})

const CortegeComponent = ({
  loading,
  success,
  error,
}) => {

  const onSubmit = (values) => {
    console.log(values);
  }
  return ( // TODO: Add errormessages for inputs
    <>
      {!loading && error && <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' style={{textAlign: 'center'}}>
          <p>
            <FormattedMessage id='Cortege.status.error.p1' />
          </p>
          <p>
          <FormattedMessage id='Cortege.status.error.p2' />
          </p>
          <p>
            {error.message}
          </p>
        </GridCell>
      </GridInner>}
      {loading && !error &&
      <GridInner className='h-center v-center' style={{height: '100%'}}>
          <ScaleLoader
            loading={true}
            color={'red'}
          />
      </GridInner>
      }
      {!loading && success && !error && 
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' style={{textAlign: 'center'}}>
          <p>
            <FormattedMessage id='Cortege.status.success.p1' />
          </p>
          <p>
            <FormattedMessage id='Cortege.status.success.p2' />
          </p>
        </GridCell>
      </GridInner>}
      {!loading && !success && !error && <Formik
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
        <GridInner base-outer-grid base-outer-grid--first>
        <GridCell desktop='12' tablet='8' phone='4'>
          <p>
            <span><FormattedMessage id='Cortege.info.p1'/></span>
            <br></br>
            <span><FormattedMessage id='Cortege.info.p2'/></span>
          </p>
          <p>
            <span><FormattedMessage id='Cortege.info.outro1'/></span>
            <br></br>
            <span><FormattedMessage id='Cortege.info.outro2'/></span>
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
        <GridCell desktop='12' tablet='4' phone='4'>
          <InformativeInputWrapper
            infoText={<FormattedMessage id='Cortege.form.info.buildType' />}
          >
            <Select 
              label={<FormattedMessage id='Cortege.form.fieldLabels.buildType' />}
              name='buildType'
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.buildType}
              error={errors.buildType}
              value={values.buildType}
              options={buildTypes}
            />
          </InformativeInputWrapper>
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
        {console.log(values)}
        <GridCell desktop='12' tablet='8' phone='4'>
          <LoadButton loading={isSubmitting || loading} type='submit' raised disabled= { isSubmitting
          }>
            <FormattedMessage id='Cortege.form.submit'/>
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
});

const mapDispatchToProps = dispatch => ({
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CortegeComponent))