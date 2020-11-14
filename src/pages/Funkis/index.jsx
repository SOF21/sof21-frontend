import React, {useEffect, useState} from 'react';

import { GridCell, Grid } from '@rmwc/grid';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';

import FormTextInput from '../../components/forms/components/FormTextInput';

import { FormattedMessage, injectIntl } from 'react-intl';

// TODO: Replace, this is not nice.
const funkisPositions = ['God', 'Pleb', 'General', 'Nattvakt']; 
const workDates = ["1/1", "2/2", "3/3", "4/4"];
const shirtSizes = ["S", "M", "L", "XL"];
const availableAllergies = ["Gluten", "Laktos", "Other"];


const initialInput = {
  name: '',
  liuid: '',
  mail: '',
  phonenumber: '',
  address: '',
  postcode: '',
  city: '',
  funkisOne: '',
  funkisTwo: '',
  funkisThree: '',
  firstPrefferedDate: '',
  secondPrefferedDate: '',
  thirdPrefferedDate: '',
  shirtSize: '',
  allergies: '',
  otherAllergy: '',
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.name' />
  ),
  liuid: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.liuid' />
  ),
  mail: Yup.string().email().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.mail' />
  ),
  phonenumber: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.phonenumber' />
  ),
  address: Yup.string(),
  postcode: '',
  city: Yup.string(),
  //funkisOne: '',
  //funkisTwo: '',
  //funkisThree: '',
  //firstPrefferedDate: '',
  //secondPrefferedDate: '',
  //thirdPrefferedDate: '',
  //shirtSize: '',
  //allergies: '',
  otherAllergy: Yup.string(),
})

const FunkisComponent = () => {

  const onSubmit = () => {
    console.log("test");
    return
  }

  return ( // TODO: Add errormessages for inputs
    <>
      <Formik
      initialValues={initialInput}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      >
        {({
         values,
         isValid,
         errors,
         touched,
         handleChange,
         handleBlur,
         isSubmitting,
       }) => (
         <Form className='funkis-form'>
        <Grid base-outer-grid base-outer-grid--first>
        <GridCell desktop='12' tablet='8' phone='4'>
          <h6 className='funkis-info'><FormattedMessage id='Funkis.recruitment.info'/></h6>
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.name' />}
            name='name'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.name}
            error={errors.name}
            value={values.name}
          />
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.liuid' />}
            name='liuid'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.liuid}
            error={errors.liuid}
            value={values.liuid}
          />
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.mail' />}
            name='mail'
            type='email'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.mail}
            error={errors.mail}
            value={values.mail}
          />
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.phonenumber' />}
            name='phonenumber'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.phonenumber}
            error={errors.phonenumber}
            value={values.phonenumber}
          />
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.address' />}
            name='address'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.address}
            error={errors.address}
            value={values.address}
          />
        </GridCell>
        <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.postcode' />}
            name='postcode'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.postcode}
            error={errors.postcode}
            value={values.postcode}
          />
        </GridCell>
        <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.city' />}
            name='city'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.city}
            error={errors.city}
            value={values.city}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.funkisOne' />}
            name='funkisOne'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.funkisOne}
            error={errors.funkisOne}
            value={values.funkisOne}
            options={funkisPositions}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.funkisTwo' />}
            name='funkisTwo'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.funkisTwo}
            error={errors.funkisTwo}
            value={values.funkisTwo}
            options={funkisPositions.filter((val) => values.funkisOne !== val)}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.funkisThree' />}
            name='funkisThree'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.funkisThree}
            error={errors.funkisThree}
            value={values.funkisThree}
            options={funkisPositions.filter((val) => (values.funkisOne !== val && values.funkisTwo !== val))}
          />
        </GridCell>

        {[values.funkisOne, values.funkisTwo, values.funkisThree].includes("Nattvakt")  && <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.requestedPartner' />}
            name='requestedPartner'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.requestedPartner}
            error={errors.requestedPartner}
            value={values.requestedPartner}
          />
        </GridCell>}

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.firstPrefferedDate' />}
            name='firstPrefferedDate'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.firstPrefferedDate}
            error={errors.firstPrefferedDate}
            value={values.firstPrefferedDate}
            options={workDates}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.secondPrefferedDate' />}
            name='secondPrefferedDate'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.secondPrefferedDate}
            error={errors.secondPrefferedDate}
            value={values.secondPrefferedDate}
            options={workDates.filter((val) => ![values.firstPrefferedDate].includes(val))}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.thirdPrefferedDate' />}
            name='thirdPrefferedDate'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.thirdPrefferedDate}
            error={errors.thirdPrefferedDate}
            value={values.thirdPrefferedDate}
            options={workDates.filter((val) => ![values.firstPrefferedDate, values.secondPrefferedDate].includes(val))}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.shirtSize' />}
            name='shirtSize'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.shirtSize}
            error={errors.shirtSize}
            value={values.shirtSize}
            options={shirtSizes}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.allergies' />}
            name='allergies'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.allergies}
            error={errors.allergies}
            value={values.allergies}
            options={availableAllergies}
          />
        </GridCell>

        {values.allergies === 'Other'  && <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.otherAllergy' />}
            name='otherAllergy'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.otherAllergy}
            error={errors.otherAllergy}
            value={values.otherAllergy}
          />
        </GridCell>}

        <GridCell desktop='12' tablet='8' phone='4'>
          <Button raised type='submit' disabled= { isSubmitting || !isValid
          }>
            <FormattedMessage id='Funkis.recruitment.submit'/>
          </Button>
        </GridCell>
        {errors.error && <GridCell desktop='12' tablet='8' phone='4'> {errors.error}</GridCell>}
      </Grid>
      </Form>
      )}
      </Formik>
    </>
  );
}

FunkisComponent.pageTitle = () => {
  return "TESTAR"
}

export default injectIntl(FunkisComponent)