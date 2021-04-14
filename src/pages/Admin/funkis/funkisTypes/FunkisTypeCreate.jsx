import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import * as Yup from 'yup';

import FormTextInput from '../../../../components/forms/components/FormTextInput';
import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form } from 'formik';

import { addFunkisType, getFunkisTypes, getFunkisType, updateFunkisType } from '../../../../actions/funkis'

export const FunkisTypeCreate = ({
  addFunkisType,
  getFunkisTypes,
  getFunkisType,
  updateFunkisType,
  funkisType,
  match
}) => {

  const history = useHistory()

  const handleSubmit = (values) => {
    if (match.params.id) {
      updateFunkisType({ ...values, id: funkisType.id })
        .then(() => getFunkisTypes())
        .then(() => history.push('/account/admin/funkistypes/' + funkisType.id))
     } else {
      addFunkisType(values)
        .then(() => getFunkisTypes())
        .then(() => history.push('/account/admin/funkistypes'))
    } 
  }

  useEffect(() => {
    if (match.params.id) {
      getFunkisType(match.params.id)
    }

  }, [match.params.id, getFunkisType])

  return (
    <Formik
      enableReinitialize
      initialValues={ match.params.id ? { name: funkisType.title, amount: funkisType.needed} : { name: '', amount: '' }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Funkistypen behöver ett namn"),
        amount: Yup.number()
          .positive("Du måste ange ett positivt antal")
          .typeError("Du kan bara ange en siffra")
          .required("Du måste ange ett antal, du kan ändra det senare")
      })}
      onSubmit={handleSubmit}
      render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => (
        <Form style={{ width: '100%' }} className='orchestra-creation'>
          <GridInner>
            {match.params.id && <GridCell desktop='12' tablet='8' phone='4'>
              <h4 style={{ margin: '0px' }}> <b>Uppdaterar: {funkisType.title}</b></h4>
              <br />
              <h6 style={{ margin: '0px' }}> Nuvarande antal: {funkisType.current} / {funkisType.needed}</h6>
            </GridCell>}
            {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
            <GridCell desktop='12' tablet='8' phone='4'>
              <FormTextInput
                name='name'
                label={"Namn"}
                value={values.name}
                error={errors.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </GridCell>

            <GridCell desktop='12' tablet='8' phone='4'>
              <FormTextInput
                name='amount'
                label={"Önskat antal"}
                value={values.amount}
                error={errors.amount}
                touched={touched.amount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </GridCell>

            <GridCell desktop='12' tablet='8' phone='4'>
              <Button raised type='submit' disabled={!isValid || isSubmitting}>
                {match.params.id ? 'Uppdatera funkistyp' : 'Skapa funkistyp'}
              </Button>
            </GridCell>
          </GridInner>
        </Form>
      )}
    />
  );
}

const mapStateToProps = (state) => ({
  funkisar: state.funkis.funkisar,
  loading: state.funkis.loading,
  timeslots: state.funkis.timeslots,
  positions: state.funkis.positionTitles,
  idTimeslots: state.funkis.idTimeslots,
  funkisType: state.funkis.currentFunkisType
})

const mapDispatchToProps = (dispatch) => ({
  addFunkisType: (funkisType) => dispatch(addFunkisType(funkisType)),
  getFunkisTypes: () => dispatch(getFunkisTypes()),
  getFunkisType: (id) => dispatch(getFunkisType(id)),
  updateFunkisType: (funkisType) => dispatch(updateFunkisType(funkisType))
})

export default connect(mapStateToProps, mapDispatchToProps)(FunkisTypeCreate)