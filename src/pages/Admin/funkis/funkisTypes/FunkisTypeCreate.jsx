import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import * as Yup from 'yup';

import FormTextInput from '../../../../components/forms/components/FormTextInput';
import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Formik, Form } from 'formik';

import { addFunkisType, getFunkisTypes } from '../../../../actions/funkis'

export const FunkisTypeCreate = ({ addFunkisType }) => {

  const history = useHistory()

  const handleSubmit = (values) => {
    addFunkisType(values)
      .then(() => getFunkisTypes())
      .then(() => history.push('/account/admin/funkistypes'))
  }

  return (
    <Formik
      initialValues={{ name: '', amount: '' }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Funkistypen behöver ett namn"),
        amount: Yup.number().positive("Du måste ange ett positivt antal").typeError("Du kan bara ange en siffra").required("Du måste ange ett antal, du kan ändra det senare")
      })}
      onSubmit={handleSubmit}
      render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => (
        <Form style={{ width: '100%' }} className='orchestra-creation'>
          <GridInner>
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
                Skapa funkistyp
              </Button>
            </GridCell>
          </GridInner>
        </Form>
      )}
    />
  );
}

const mapDispatchToProps = (dispatch) => ({
  addFunkisType: (funkisType) => dispatch(addFunkisType(funkisType)),
  getFunkisTypes: () => dispatch(getFunkisTypes()),
})

export default connect(null, mapDispatchToProps)(FunkisTypeCreate)