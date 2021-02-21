import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
//import { useHistory } from 'react-router-dom'
import { GridCell, Grid, GridInner } from '@rmwc/grid';

import { Button } from '@rmwc/button';

import { Formik, Form, setNestedObjectValues } from 'formik/dist/index';
import FormTextInput from '../../../../components/forms/components/FormTextInput'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import { injectIntl } from 'react-intl';

import {
  checkInFunkis,
} from '../../../../actions/funkis';

const focusInput = input => {
  if (input) {
    setTimeout(() => input.focus(), 100);
  }
};

const FunkisCheckInComponent = ({checkInFunkis, checkedInFunkis, error}) => {

  const history = null //useHistory()
  const [open, setOpen] = useState(false);
  const [usedLiuId, setLiuId] = useState(true)

  const parseLiUCardCode = hexCode => {
    const decimalCode = parseInt(hexCode, 16)
    return decimalCode.length !== 10 ? "0" + decimalCode : decimalCode
  }

  const checkIfLiuId = id => {
    const initials = id.substring(0, 5)
    const numbers = id.substring(5)
    return !/[^a-z]/i.test(initials) && /\d/.test(numbers)
  }

  const handleSubmit = (values, bag) => {
    bag.setSubmitting(true)
    const code = values.blipp
    const liuCardOrLiuId = checkIfLiuId(code) ? "liu_id" : "liu_card_number"
    setLiuId(checkIfLiuId(code))
    checkInFunkis(liuCardOrLiuId, checkIfLiuId(code) ? code : parseLiUCardCode(code))
    values.blipp = ''
    bag.setSubmitting(false)
  }

  const handleClick = (e) => {
    e.preventDefault()
    history.push('/account/admin/funkischeckin')
  }

  useEffect(() => {
    if (error !== null && ((error instanceof Object) 
        && Object.keys(error).length) !== 0) setOpen(true)
  }, [error])

  return (
    <>
      <Grid>
        <GridInner>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
          >
            <DialogTitle>Fel {usedLiuId ? 'LiU-id' : 'LiU-kort kod'}!</DialogTitle>
            <DialogContent> Testa att {usedLiuId ? 'blippa LiU-kortet' : 'skriva in LiU-id'} istället </DialogContent>
            <DialogActions>
              <DialogButton action="accept" isDefaultAction>OK</DialogButton>
            </DialogActions>
          </Dialog>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Formik
              initialValues={{ blipp: '' }}
              onSubmit={handleSubmit}
              render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => {
                return (
                  <Form style={{ width: '100%' }}>
                    <GridInner>
                      {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                      <GridCell span='12' style={{textAlign: 'center'}}>
                        <p style={{margin: '0px'}}> Du kan checka in med genom att blippa ditt LiU-kort eller genom att skriva in ditt LiU-id</p>
                      </GridCell>
                      <GridCell span='12' style={{textAlign: 'center'}}>
                        {'id' in checkedInFunkis ? <p style={{margin: '0px', color: checkedInFunkis.checked_in? 'green' : 'red' }}>
                          <b>{checkedInFunkis.name} har checkat {checkedInFunkis.checked_in ? 'in' : 'ut'}</b>
                        </p> : null }
                      </GridCell>
                      <GridCell desktop='12' tablet='8' phone='4'>
                        <FormTextInput
                          name='blipp'
                          label={'Blippa LiU-kort eller skriv in LiU-id'}
                          value={values.blipp}
                          error={errors.blipp}
                          touched={touched.blipp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputRef={focusInput}
                          style={{ width: '100%' }}
                        />
                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'>
                        <Button
                          raised
                          type='submit'
                          disabled={!isValid || isSubmitting}
                          style={{ marginRight: '10px' }}
                        >
                          Checka in/ut
                        </Button>
                        <Button raised onClick={handleClick}>
                          Tillbaka
                        </Button>
                      </GridCell>
                      <GridCell desktop='6' tablet='4' phone='2'/>
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

const mapStateToProps = (state) => ({
  checkedInFunkis: state.funkis.checkedInFunkis,
  error: state.funkis.error
})

const mapDispatchToProps = (dispatch) => ({
  checkInFunkis: (liuCardOrLiuCode, code) => dispatch(checkInFunkis(liuCardOrLiuCode, code))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisCheckInComponent))