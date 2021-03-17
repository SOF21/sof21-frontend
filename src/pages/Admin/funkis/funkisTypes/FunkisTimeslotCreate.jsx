import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup';

import FormTextInput from '../../../../components/forms/components/FormTextInput';
import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form } from 'formik';

import { addFunkisTimeSlot } from '../../../../actions/funkis';

export const FunkisTimeslotCreate = ({
  match,
  addFunkisTimeSlot
}) => {

  const history = useHistory()

  const handleSubmit = (values) => {
    addFunkisTimeSlot({ ...values, funkisTypeId: match.params.id })
      .then(() => history.push('/account/admin/funkistypes/' + match.params.id))
  }
  return (
    <Formik
      initialValues={{ start: '', end: '' }}
      validationSchema={Yup.object().shape({
      })}
      onSubmit={handleSubmit}
      render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => (
        <Form style={{ width: '100%' }} className='orchestra-creation'>
          <GridInner>
            {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
            <GridCell desktop='6' tablet='4' phone='4'>
              <FormTextInput
                name='start'
                label={"Starttid"}
                type="datetime-local"
                value={values.start}
                error={errors.start}
                touched={touched.start}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </GridCell>

            <GridCell desktop='6' tablet='4' phone='4'>
              <FormTextInput
                name='end'
                label={"Sluttid"}
                type="datetime-local"
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

const mapDispatchToProps = (dispatch) => ({
  addFunkisTimeSlot: (timeSlot) => dispatch(addFunkisTimeSlot(timeSlot))
})

export default connect(null, mapDispatchToProps)(FunkisTimeslotCreate)