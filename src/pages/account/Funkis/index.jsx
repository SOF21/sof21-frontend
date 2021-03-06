import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

import { FormattedMessage, injectIntl, useIntl } from 'react-intl';
import * as Yup from 'yup';
import { Formik, Form} from 'formik';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { GridCell, GridInner } from '@rmwc/grid';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';
import { Chip, ChipSet   } from 'rmwc';

import { sendFunkisApplication, getFunkisTypes, getFunkisAppStatus } from '../../../actions/funkis'

import FormTextInput from '../../../components/forms/components/FormTextInput';
import FormCheckbox from '../../../components/forms/components/FormCheckbox';
import LoadButton from '../../../components/forms/components/LoadButton';
import { info } from '../../../constants';

// TODO: Replace, this is not nice.
const workDates = ["14/5", "2/2", "3/3", "4/4"];
const shirtSizes = ["S", "M", "L", "XL"];
const availableAllergies = {
  none: 'Ingen',
  gluten: 'Gluten',
  laktos: 'Laktos',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
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
  otherFoodPreference: '',
  gdpr: false,
  liuCard: '',
  requestedPartner: '',
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
  postcode: Yup.number()
  .typeError(<FormattedMessage id='Funkis.recruitment.errors.malformed.postcode' />)
  .required(
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
  otherFoodPreference: Yup.string().when('allergies',
  {
    is: availableAllergies.other,
    then: Yup.string().required(
      <FormattedMessage id='Funkis.recruitment.errors.req.otherFoodPreference' />
    )
  }),
  gdpr: Yup.bool().oneOf([true], 
      <FormattedMessage id='Funkis.recruitment.errors.req.gdpr' />
    ),
  liuCard: Yup.number()
  .typeError(
    <FormattedMessage id='Funkis.recruitment.errors.malformed.liuCardType' />
  )
  .test('len', <FormattedMessage id='Funkis.recruitment.errors.malformed.liuCardLen' />, val => val && val.toString().length === 10)
  .required(
    <FormattedMessage id='Funkis.recruitment.errors.req.liuCard' />
  ),
  extra: Yup.bool(),
  extraDesc: Yup.string().when('extra', {
    is: true,
    then: Yup.string().required(
      <FormattedMessage id='Funkis.recruitment.errors.req.extraDesc' />
    )
  }),
  requestedPartner: Yup.string().matches(/[A-ö]{5}\d{3}/, 'Du måste ange ett giltlig LiuID'),
})

const FunkisComponent = ({
  loading,
  sendFunkisApplication,
  funkisPositions,
  getFunkisTypes,
  success,
  error,
  getFunkisAppStatus,
  hasPrevApp,
  userId,
  lang,
}) => {

  const intl = useIntl();

  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    getFunkisAppStatus();
    getFunkisTypes();
  }, [getFunkisTypes, getFunkisAppStatus])

  const openApp = new Date("Mar 15, 2021").getTime();
  const closeApp = new Date("Apr 5, 01:00:00 2021").getTime();
  const currentTime = new Date().getTime();
  
  const [code, setCode] = useState('');
  const [isOpen, setOpen] = useState(currentTime >= openApp && currentTime < closeApp);

  const handlePasscode = (e) => {
    e.preventDefault();
    if (code === info.adminPassword) {
      setOpen(true);
    }
  }

  const onSubmit = (values) => {
    sendFunkisApplication({...values, userId});
  }

  const handleAllergyChip = (e, setFieldValue) =>{
    const { target: { chipId } } = e;
    console.log(chipId)
    if(allergies.includes(chipId)) {
      setAllergies(allergies.filter(a => a !== chipId))
    }
    else {
      setAllergies([...allergies, chipId])
    }
   
    setFieldValue('allergies', allergies.reduce((str, a) => `${a} ${str}`, ''))
  }

  return (
    <>
      {!loading && !isOpen && lang === 'sv' &&
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
            <Button/>
          </GridCell>
        </GridInner>}
        {!loading && lang !== 'sv' && !error &&
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' style={{ textAlign: 'center' }}>
            <h5>
              <FormattedMessage id='Funkis.errors.english' />
            </h5>
          </GridCell>
        </GridInner>}
      {!loading && error && <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' style={{textAlign: 'center'}}>
          <p>
            <FormattedMessage id='Funkis.errors.p1' />
          </p>
          <p>
            <FormattedMessage id='Funkis.errors.p2' />
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
      {!loading && (success || hasPrevApp) && !error &&
      <GridInner>
        <GridCell desktop='12' tablet='8' phone='4' style={{textAlign: 'center'}}>
          <h5>
            <FormattedMessage id='Funkis.recruitment.success.p1' />
          </h5>
          <h5>
            <FormattedMessage id='Funkis.recruitment.success.p2' />
          </h5>
        </GridCell>
      </GridInner>}
      {!loading && !success && !hasPrevApp && !error && isOpen && lang === 'sv' && <Formik
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
         setFieldValue,
       }) => (
         <Form 
          className='funkis-form'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
         >
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
            options={Object.fromEntries(Object.entries(funkisPositions).filter(([k, v]) => k !== values.funkisOne))}
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
            options={Object.fromEntries(Object.entries(funkisPositions).filter(([k, v]) => k !== values.funkisOne && k !== values.funkisTwo))}
          />
        </GridCell>

        { [funkisPositions[values.funkisOne], funkisPositions[values.funkisTwo], funkisPositions[values.funkisThree]].includes('Barfunkis')  && <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.requestedPartner' />}
            name='requestedPartner'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.requestedPartner}
            error={errors.requestedPartner}
            value={values.requestedPartner}
          />
          <span>
            Detta val kan inte garanteras.
          </span>
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

        <GridCell desktop='12' tablet='8' phone='4'>
          <span><FormattedMessage id='Funkis.recruitment.fieldLabels.foodPreference' /></span>
          <ChipSet choice>
            {console.log(allergies)}
            <Chip 
              checkmark
              selected={allergies.includes(availableAllergies.gluten)}
              onInteraction={(e) => handleAllergyChip(e, setFieldValue)}
              text={availableAllergies.gluten}
              id={availableAllergies.gluten}
            />
            <Chip 
              checkmark
              selected={allergies.includes(availableAllergies.laktos)}
              onInteraction={(e) => handleAllergyChip(e, setFieldValue)}
              text={availableAllergies.laktos}
              id={availableAllergies.laktos}
            />
            <Chip 
              checkmark
              selected={allergies.includes(availableAllergies.vegetarian)}
              onInteraction={(e) => handleAllergyChip(e, setFieldValue)}
              text={availableAllergies.vegetarian}
              id={availableAllergies.vegetarian}
            />
            <Chip 
              checkmark
              selected={allergies.includes(availableAllergies.vegan)}
              onInteraction={(e) => handleAllergyChip(e, setFieldValue)}
              text={availableAllergies.vegan}
              id={availableAllergies.vegan}
            />
            <Chip 
              checkmark
              selected={allergies.includes(availableAllergies.other)}
              onInteraction={(e) => handleAllergyChip(e, setFieldValue)}
              text={availableAllergies.other}
              id={availableAllergies.other}
            />
          </ChipSet>
        </GridCell>

        {allergies.includes(availableAllergies.other) && <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.otherFoodPreference' />}
            name='otherFoodPreference'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.otherFoodPreference}
            error={errors.otherFoodPreference}
            value={values.otherFoodPreference}
          />
        </GridCell>
        }

        <GridCell desktop='12' tablet='8' phone='4'>
          <FormCheckbox 
            label='Finns det något du önskar att personerna som kommer jobba närmast dig under festivalen vet om vad gäller eventuella sjukdomar/allergener? Exempel kan vara diabetes, vanligt förekommande medvetslösheter eller liknande'
            name='extra'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.extra}
            error={errors.extra}
            value={values.extra}
          />
        </GridCell>

        {values.extra && <GridCell desktop='12' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='Funkis.recruitment.fieldLabels.extraDesc' />}
            name='extraDesc'
            textarea
            fullwidth
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.extraDesc}
            error={errors.extraDesc}
            value={values.extraDesc}
          />
        </GridCell>}

        <GridCell desktop='12' tablet='8' phone='4'>
          <FormCheckbox 
            label={intl.formatMessage({ id: 'Funkis.recruitment.fieldLabels.gdpr' })}
            name='gdpr'
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.gdpr}
            error={errors.gdpr}
            value={values.gdpr}
          />
        </GridCell>
        {console.log(values)}
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
  funkisPositions: state.funkis.positionTitles,
  success: state.funkis.success,
  error: state.funkis.error,
  hasPrevApp: state.funkis.hasPrevApp,
  userId: state.funkis.userId,
  lang: state.locale.lang,
});

const mapDispatchToProps = dispatch => ({
  sendFunkisApplication: (values) => dispatch(sendFunkisApplication(values)),
  getFunkisTypes: () => dispatch(getFunkisTypes()),
  getFunkisAppStatus: () => dispatch(getFunkisAppStatus()),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisComponent))