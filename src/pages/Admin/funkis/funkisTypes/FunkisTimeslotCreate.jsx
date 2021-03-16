import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup';
import FormTextInput from '../../../../components/forms/components/FormTextInput';
import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import FormSelect from '../../../../components/forms/components/FormSelect';
import { Formik, Form } from 'formik';
import api from '../../../../api/axiosInstance';

// TODO: Turn into redux action
const createTimeslot = (timeslot, id) => {
  return api.post('/funkis_timeslots', { item: { start_time: new Date(timeslot.start), end_time: new Date(timeslot.end), funkis_category_id: id} })
}

export const FunkisTimeslotCreate = ({match}) => {

  const history = useHistory()
 
  const createOrchestra = (values, bag) => {
    bag.setSubmitting(true);
    createTimeslot(values, match.params.id)
      .then((response) => {
        bag.setSubmitting(false);
        history.push({
          pathname: '/account/admin/funkistypes/' + match.params.id,
          state: { message: 'Passet skapades' }
        });
      })
      .catch((error) => {
        bag.setErrors({ error: "Registration failed" });

        bag.setSubmitting(false);
      })

  }

  return (
    <Formik
      initialValues={{ start: '', end: '' }}
      validationSchema={Yup.object().shape({
      })}
      onSubmit={createOrchestra}
      render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => (
        <Form style={{ width: '100%' }} className='orchestra-creation'>
          <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' style={{display: 'flex', justifyContent: 'center'}}>
              <h5 style={{margin: '0'}}><b>Formatet är:</b> ÅÅÅÅ-MM-DD HH:MM </h5>
            </GridCell>
            {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
            <GridCell desktop='12' tablet='8' phone='4'>
              <FormTextInput
                name='start'
                label={"Starttid"}
                value={values.start}
                error={errors.start}
                touched={touched.start}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </GridCell>

            <GridCell desktop='12' tablet='8' phone='4'>
              <FormTextInput
                name='end'
                label={"Sluttid"}
                value={values.end}
                error={errors.end}
                touched={touched.end}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </GridCell>

            <GridCell desktop='12' tablet='8' phone='4'>
              <Button raised type='submit' disabled={!isValid || isSubmitting}>
                Skapa pass
              </Button>
            </GridCell>
          </GridInner>
        </Form>
      )}
    />
  );
}

export default FunkisTimeslotCreate