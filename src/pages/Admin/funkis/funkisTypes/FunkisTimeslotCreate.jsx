import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup';

import FormTextInput from '../../../../components/forms/components/FormTextInput';
import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form, setNestedObjectValues } from 'formik';

import { addFunkisTimeSlot, getFunkisTimeSlots } from '../../../../actions/funkis';
import api from '../../../../api/axiosInstance';
import { getFunkisTimeSlot, updateFunkisTimeslot } from '../../../../api/funkisCalls';

export const FunkisTimeslotCreate = ({
  match,
  addFunkisTimeSlot,
}) => {

  const history = useHistory()
  const [timeslot, setTimeslot] = useState(undefined)
  const [error, setError] = useState(undefined)

  const handleSubmit = (values) => {
    const action = match.params.shiftId
      ? updateFunkisTimeslot(match.params.shiftId, values.start, values.end)
      : addFunkisTimeSlot({ ...values, funkisTypeId: match.params.id })
    action.then(() => history.push('/account/admin/funkistypes/' + match.params.id))
  }

  useEffect(() => {
    if (match.params.shiftId) {
      getFunkisTimeSlot(match.params.shiftId)
        .then((json) => {
          setTimeslot(json.data)
        })
        .catch((err) => setError(err))
    }
  }, [match.params.shiftId])

  return (
    <Formik
      enableReinitialize
      initialValues={timeslot ? { start: timeslot.start_time.split('.')[0], end: timeslot.end_time.split('.')[0] } : { start: '', end: '' }}
      validationSchema={Yup.object().shape({
      })}
      onSubmit={handleSubmit}
      render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => (
        <Form style={{ width: '100%' }} className='orchestra-creation'>
          <GridInner>
            {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
            {error && <GridCell desktop='12' tablet='8' phone='4'> {error}</GridCell>}
            {console.log(values)}
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
  addFunkisTimeSlot: (timeSlot) => dispatch(addFunkisTimeSlot(timeSlot)),
})

export default connect(null, mapDispatchToProps)(FunkisTimeslotCreate)