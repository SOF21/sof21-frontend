import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { GridCell, Grid, GridInner } from '@rmwc/grid';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';
import { Dialog } from '@rmwc/dialog';
import { Formik, Form} from 'formik';
import { Checkbox } from '@rmwc/checkbox';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Modal from '../../components/page_components/Modal';
import * as Yup from 'yup';

import { sendFunkisApplication, getFunkisTypes } from '../../actions/funkis'

import FormTextInput from '../../components/forms/components/FormTextInput';

import { FormattedMessage, injectIntl } from 'react-intl';
import FormCheckbox from '../../components/forms/components/FormCheckbox';
import LoadButton from '../../components/forms/components/LoadButton';

// TODO: Replace, this is not nice.
const noPref = 'Ingen';
const workDates = ["1/1", "2/2", "3/3", "4/4"];
const shirtSizes = ["S", "M", "L", "XL"];
const availableAllergies = {
  none: 'Ingen',
  gluten: 'Gluten',
  laktos: 'Laktos',
  both: 'Gluten & Laktos',
  other: 'Annat',
};


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
  gdpr: false,
  liuCard: '',
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.name' />
  ),
  liuid: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.liuid' />
  ).matches(/[A-ö]{5}\d{3}/, 'Du måste ange ett giltlig LiuID'),
  mail: Yup.string().email(
    <FormattedMessage id='Funkis.recruitment.errors.req.mail' />
  ).required(
    <FormattedMessage id='Funkis.recruitment.errors.req.mail' />
  ),
  phonenumber: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.phonenumber' />
  ),
  address: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.address' />
  ),
  postcode: Yup.number().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.postcode' />
  ),
  city: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.city' />
  ),
  shirtSize: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.address' />
  ),
  funkisOne: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.address' /> 
  ),
  otherAllergy: Yup.string().when('allergies',
  {
    is: availableAllergies.other,
    then: Yup.string().required(
      <FormattedMessage id='Funkis.recruitment.errors.req.otherAllergy' />
    )
  }),
  gdpr: Yup.bool().oneOf([true], 
      <FormattedMessage id='Funkis.recruitment.errors.req.gdpr' />
    ),
  liuCard: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.liuCard' />
  ),
})

const FunkisComponent = ({
  loading,
  sendFunkisApplication,
  history,
  funkisPositions,
  getFunkisType,
  success,
}) => {


  useEffect(() => {
    getFunkisType();
  }, [getFunkisType])

  const onSubmit = (values) => {
    sendFunkisApplication(values);
  }
  return ( // TODO: Add errormessages for inputs
    <>
      {loading &&
      <GridInner className='h-center v-center' style={{height: '100%'}}>
          <ScaleLoader
            loading={true}
            color={'red'}
          />
      </GridInner>
      }
      {!loading && success && 
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' style={{textAlign: 'center'}}>
              <p>
                Din ansökan är nu skickad!
              </p>
              <p>
                Du kommer att få ett mail om du blir tilldelad en plats!
              </p>
            </GridCell>
      </GridInner>}
      {!loading && !success && <Formik
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
         handleSubmit,
       }) => (
         <Form 
          className='funkis-form'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
         >
        {console.log(success)}
        <GridInner base-outer-grid base-outer-grid--first>
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
        <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.liuCard' />}
            name='liuCard'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.liuCard}
            error={errors.liuCard}
            value={values.liuCard}
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
            options={Object.values(funkisPositions)}
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
            options={[noPref, ...Object.values(funkisPositions).filter((val) => values.funkisOne !== val)]}
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
            options={[noPref, ...Object.values(funkisPositions).filter((val) => (values.funkisOne !== val && values.funkisTwo !== val))]}
          />
        </GridCell>

        {[values.funkisOne, values.funkisTwo, values.funkisThree].includes(funkisPositions.nattvakt)  && <GridCell desktop='6' tablet='4' phone='4'>
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
            options={Object.values(availableAllergies)}
          />
        </GridCell>

        {values.allergies === availableAllergies.other  && <GridCell desktop='6' tablet='4' phone='4'>
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
          <FormCheckbox 
            label='Jag godkänner att mina personuppgifter sparas enligt LinTeks blabla'
            name='gdpr'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.gdpr}
            error={errors.gdpr}
            value={values.gdpr}
          />
        </GridCell>
        {console.log(errors)}
        <GridCell desktop='12' tablet='8' phone='4'>
          <LoadButton loading={isSubmitting || loading} type='submit' raised disabled= { isSubmitting
          }>
            <FormattedMessage id='Funkis.recruitment.submit'/>
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
  loading: state.funkis.loading,
  funkisPositions: state.funkis.positions,
  success: state.funkis.success,
});

const mapDispatchToProps = dispatch => ({
  sendFunkisApplication: (values) => dispatch(sendFunkisApplication(values)),
  getFunkisType: () => dispatch(getFunkisTypes()),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisComponent))