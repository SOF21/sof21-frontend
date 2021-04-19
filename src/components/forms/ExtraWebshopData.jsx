/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl'

import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import FormTextInput from '../../components/forms/components/FormTextInput';
import { Formik, Form } from 'formik/dist/index';
import * as Yup from 'yup';

import { getCurrentUser } from '../../api/userCalls'
import { addExtraWebshopData } from '../../api/ticketPickupCalls'

const extraWebshopDataComponent = (props) => {

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const [dialogOpen, setOpen] = useState(false)
  const [id, setId] = useState(undefined)

  const handleSubmit = (values) => {
    getCurrentUser().then((response) => {
      setId(response.data.id)
      addExtraWebshopData({
        id: response.data.id,
        ...values
      })
    })
    console.log(values)
  }

  return (
    <>
      <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
        <Button raised onClick={() => setOpen(true)}>
          Lägg till information för att kunna handla i webshopen!
        </Button>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <Formik
          initialValues={{ adress: '', allergies: '', phone: '' }}
          validationSchema={Yup.object().shape({
            adress: Yup.string().required('Du måste ange en address'),
            phone: Yup.string().matches(phoneRegExp, 'Mobilnummret är inte korrekt').required('Du måste ange ett mobilnummer'),
          })}
          onSubmit={handleSubmit}
          render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => (
            <Form style={{ width: '100%' }} >
              <Dialog
                open={dialogOpen}
                onClose={() => setOpen(false)}
                className='unclickable-scrim-dialog'
              >
                <DialogTitle>
                  Lägg till information för att kunna handla i webshopen!
                </DialogTitle>
                <DialogContent>
                  <GridInner>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      Nedan kan du fylla i information som krävs för att kunna köpa sakerna i webshopen. Denna information behövs då varorna kommer att levereras hem till dig.
                    </GridCell>
                    {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormTextInput
                        style={{ width: '100%' }}
                        name='phone'
                        label={"Mobilnummer"}

                        value={values.phone}
                        error={errors.phone}
                        touched={touched.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormTextInput
                        style={{ width: '100%' }}
                        name='adress'
                        label={"Adress på formatet: [GATA] [POSTNUMMER] [STAD]"}

                        value={values.adress}
                        error={errors.adress}
                        touched={touched.adress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormTextInput
                        style={{ width: '100%' }}
                        name='allergies'
                        label={"Allergier"}

                        value={values.allergies}
                        error={errors.allergies}
                        touched={touched.allergies}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </GridCell>
                  </GridInner>
                </DialogContent>
                <DialogActions>
                  <DialogButton action="close" type='button' isDefaultAction >
                    Avbryt
                  </DialogButton>
                  <DialogButton action='close' type='submit' disabled={!isValid} >
                    Skicka
                  </DialogButton>
                </DialogActions>
              </Dialog>
            </Form>
          )}
        />
      </GridCell>
    </>
  )
}

export default injectIntl(extraWebshopDataComponent)