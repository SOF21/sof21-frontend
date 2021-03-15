import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup';
import FormTextInput from '../../../../components/forms/components/FormTextInput';
import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import FormSelect from '../../../../components/forms/components/FormSelect';
import { Formik, Form } from 'formik';
import api from '../../../../api/axiosInstance';

const createTimeslot = (timeslot) => {
  return api.post('/funkis_timeslots', { item: { start_time: new Date(), end_time: new Date(), funkis_category_id: 4} })
}

export const FunkisTimeslotCreate = ({match}) => {

  const history = useHistory()
 
  const createOrchestra = (values, bag) => {
    bag.setSubmitting(true);
    createTimeslot(values)
      .then((response) => {
        console.log("Done!")
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