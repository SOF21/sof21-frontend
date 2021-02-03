import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { GridCell, Grid, GridInner } from '@rmwc/grid';

import { Button } from '@rmwc/button';

import { Formik, Form, setNestedObjectValues } from 'formik/dist/index';
import FormTextInput from '../../../../components/forms/components/FormTextInput'

import { FormattedMessage, injectIntl } from 'react-intl';

import {
  checkInFunkis,
} from '../../../../actions/funkis';

const focusUsernameInputField = input => {
  if (input) {
    setTimeout(() => input.focus(), 100);
  }
};

const FunkisCheckInComponent = (
  {
    checkInFunkis,
  }
) => {

  const history = useHistory()

  const parseLiUCardCode = hexCode => {
    const decimalCode = parseInt(hexCode, 16)
    return decimalCode.length !== 10 ? "0" + decimalCode : decimalCode
  }

  const handleSubmit = (values, bag) => {
    bag.setSubmitting(true)
    checkInFunkis(parseLiUCardCode(values.blipp))
      .then(res => {
        bag.setSubmitting(false)
      })
      .catch(err => {
        this.props.openDialog('Ajaj', 'Denna person verkar inte ha lagt till sin kod rätt, skriv in LiU-id istället')
        bag.setSubmitting(false)
      })
    bag.resetForm()
  }

  const handleClick = (e) => {
    e.preventDefault()
    history.push('/account/admin/funkischeckin')
  }

  return (
    <>
      <Grid>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Formik
              initialValues={{ blipp: '' }}
              onSubmit={handleSubmit}
              render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => {
                return (
                  <Form style={{ width: '100%' }}>
                    <GridInner>
                      {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}

                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='blipp'
                          label={'Blippa LiU-kort eller skriv in LiU-id'}
                          value={values.blipp}
                          error={errors.blipp}
                          touched={touched.blipp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputRef={focusUsernameInputField}
                          style={{ width: '100%' }}
                        />
                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'>
                        <Button
                          raised
                          type='submit'
                          disabled={!isValid || isSubmitting}
                          style={{marginRight: '10px'}}
                        >
                          Checka in
                        </Button>
                        <Button raised onClick={handleClick}>
                          Tillbaka
                        </Button>
                      </GridCell>
                    </GridInner>
                  </Form>
                );
              }}
            />

          </GridCell >
        </GridInner>
      </Grid>
    </>
  )
}


const mapDispatchToProps = (dispatch) => ({
  checkInFunkis: (checkedIn) => dispatch(checkInFunkis(checkedIn))
})

export default injectIntl(connect(null, mapDispatchToProps)(FunkisCheckInComponent))