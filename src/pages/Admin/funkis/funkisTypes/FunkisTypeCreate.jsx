import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup';
import FormTextInput from '../../../../components/forms/components/FormTextInput';
import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import FormSelect from '../../../../components/forms/components/FormSelect';
import { Formik, Form } from 'formik';
import api from '../../../../api/axiosInstance';

const createFunkisType = (funkisType) => {
  return api.post('/funkis_category', { item: {title: funkisType.name, amount_needed: funkisType.amount } })
}

export const FunkisTypeCreate = () => {

  const history = useHistory()

  const createOrchestra = (values, bag) => {
    bag.setSubmitting(true);
    createFunkisType(values)
      .then((response) => {
        console.log("Done!")
        bag.setSubmitting(false);
        history.push({
          pathname: '/account/admin/funkistypes/',
          state: { message: 'Funkistypen ' + response.data.name + " skapades" }
        });
      })
      .catch((error) => {
        bag.setErrors({ error: "Registration failed" });

        bag.setSubmitting(false);
      })

  }

  return (
    <Formik
      initialValues={{ name: '', amount: ''}}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Funkistypen behöver ett namn"),
        amount: Yup.number().positive("Du måste ange ett positivt antal").typeError("Du kan bara ange en siffra").required("Du måste ange ett antal, du kan ändra det senare")
      })}
      onSubmit={createOrchestra}
      render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting, setFieldValue, setFieldTouched }) => (
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
                Skapa orkester
                  </Button>
            </GridCell>
          </GridInner>
        </Form>
      )}
    />
  );
}

export default FunkisTypeCreate