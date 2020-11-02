import React, {useEffect, useState} from 'react';

import { GridCell, Grid } from '@rmwc/grid';
import { Select } from '@rmwc/select'

import FormTextInput from '../../components/forms/components/FormTextInput';

import { FormattedMessage } from 'react-intl';

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
}



const FunkisComponent = () => {

  const [input, setInput] = useState(initialInput)
  const [errors, setErrors] = useState(initialInput)

  const validate = ({name, value}) => {
    // TODO: Add validation and set error message
  }

  const setFieldValue = (e) => {
    const {name, value} = e.target;
    validate({name, value})
    setInput({
      ...input,
      [name]: value,
    });
    console.log(input);
  }

  const {funkisOne, funkisTwo, funkisThree, firstPrefferedDate, secondPrefferedDate, allergies} = input;
  return ( // TODO: Add errormessages for inputs
    <>
      <Grid>
        <GridCell desktop='12' tablet='8' phone='4'>
          <h2><FormattedMessage id='funkis.recruitment.header'/></h2>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4'>
          <h2><FormattedMessage id='funkis.recruitment.info'/></h2>
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.name' />}
            onChange={setFieldValue}
          />
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.liuid' />}
            onChange={setFieldValue}
          />
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.mail' />}
            onChange={setFieldValue}
          />
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.phonenumber' />}
            onChange={setFieldValue}
          />
        </GridCell>
        <GridCell desktop='6' tablet='8' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.addres' />}
            onChange={setFieldValue}
          />
        </GridCell>
        <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.postcode' />}
            onChange={setFieldValue}
          />
        </GridCell>
        <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.city' />}
            onChange={setFieldValue}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.funkisOne' />}
            name='funkisOne'
            onChange={setFieldValue}
            options={funkisPositions}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.funkifunkisTwo' />}
            name='funkisTwo'
            onChange={setFieldValue}
            options={funkisPositions.filter((val) => funkisOne !== val)}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.funkisThree' />}
            name='funkisThree'
            onChange={setFieldValue}
            options={funkisPositions.filter((val) => (funkisOne !== val && funkisTwo !== val))}
          />
        </GridCell>

        {[funkisOne, funkisTwo, funkisThree].includes("Nattvakt")  && <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.requestedPartner' />}
            onChange={setFieldValue}
          />
        </GridCell>}

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.firstPrefferedDate' />}
            name='firstPrefferedDate'
            onChange={setFieldValue}
            options={workDates}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.secondPrefferedDate' />}
            name='secondPrefferedDate'
            onChange={setFieldValue}
            options={workDates.filter((val) => ![firstPrefferedDate].includes(val))}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.thirdPrefferedDate' />}
            name='thirdPrefferedDate'
            onChange={setFieldValue}
            options={workDates.filter((val) => ![firstPrefferedDate, secondPrefferedDate].includes(val))}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.shirtSize' />}
            name='shirtSize'
            onChange={setFieldValue}
            options={shirtSizes}
          />
        </GridCell>

        <GridCell desktop='6' tablet='4' phone='4'>
          <Select 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.allergies' />}
            name='allergies'
            onChange={setFieldValue}
            options={availableAllergies}
          />
        </GridCell>

        {allergies === 'Other'  && <GridCell desktop='6' tablet='4' phone='4'>
          <FormTextInput 
            label={<FormattedMessage id='funkis.recruitment.fieldLabels.otherAllergy' />}
            name='otherAllergy'
            onChange={setFieldValue}
          />
        </GridCell>}

      </Grid>
    </>
  );
}

export default FunkisComponent